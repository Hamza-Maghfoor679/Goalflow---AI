import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { styles } from '../../components/styles/mainScreenStyles/GoalsStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import {
  useGetProgressQuery,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '../../api/tasks';
import Toast from 'react-native-toast-message';
import LaunchModal from '../../components/ui/LaunchModal';
import { useGenerateTaskswithAiQuery } from '../../api/HomeApi';
import LoadingModal from '../../components/ui/LoadingModal';
import GoalCard from '../../components/ui/goalScreenComponents/GoalCard';
import PhaseControls from '../../components/ui/goalScreenComponents/PhaseControls';
import TasksList from '../../components/ui/goalScreenComponents/TasksList';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface PhaseItem {
  label: string;
  value: number;
}

const GoalsScreen: React.FC = () => {
  // Memoize selector to prevent unnecessary re-renders
  const initialId = useSelector((state: RootState) => state.goals.goalIds[0]);
  
  const [phase, setPhase] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [generatePhase, setGeneratePhase] = useState<number>(0);
  const [phaseOpen, setPhaseOpen] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);

  // Memoize phase items initialization
  const initialPhaseItems = useMemo(
    () => Array.from({ length: 4 }, (_, i) => ({
      label: `Phase ${i + 1}`,
      value: i + 1,
    })),
    []
  );
  
  const [phaseItems, setPhaseItems] = useState<PhaseItem[]>(initialPhaseItems);

  const {
    data: tasksData,
    isLoading: isTasksLoading,
    refetch: tasksRefetch,
  } = useGetTasksQuery({
    goalId: initialId,
    phase,
    dayIndex: day - 1,
  });

  const [updateTask] = useUpdateTaskMutation();
  
  const {
    data: aiData,
    isLoading: aiGeneratingTasksLoading,
    error,
    isSuccess
  } = useGenerateTaskswithAiQuery(
    { goalId: initialId, phase: generatePhase },
    { skip: generatePhase === 0 },
  );

  useEffect(()=>{
    tasksRefetch()
  },[isSuccess])
  const { data: goalProgressData, refetch: progressRefetch } =
    useGetProgressQuery({ goalId: initialId });

  // Memoize derived data to prevent recalculation on every render
  const derivedData = useMemo(() => {
    const category = tasksData?.category
      ? tasksData.category.charAt(0).toUpperCase() + tasksData.category.slice(1)
      : 'General';

    const { tipOfThePhase, totalPhases, availablePhases, startDate, endDate } =
      tasksData ?? {};
    
    const safeAvailablePhases = availablePhases ?? [];
    const { progressPercent, totalTasks, completedTasks } = goalProgressData ?? {};

    return {
      category,
      tipOfThePhase,
      totalPhases,
      availablePhases,
      safeAvailablePhases,
      startDate,
      endDate,
      progressPercent,
      totalTasks,
      completedTasks,
    };
  }, [tasksData, goalProgressData]);

  // Update phase items when available phases change
  useEffect(() => {
    const { availablePhases, safeAvailablePhases } = derivedData;
    
    if (availablePhases && Array.isArray(availablePhases)) {
      const items = availablePhases.map((phaseNum: number) => ({
        label: `Phase ${phaseNum}`,
        value: phaseNum,
      }));

      const maxPhase = Math.max(...safeAvailablePhases);
      const nextPhase = maxPhase + 1;

      items.push({
        label: `➕ Add Phase ${nextPhase}`,
        value: nextPhase,
      });

      setPhaseItems(items);

      if (!availablePhases.includes(phase)) {
        setPhase(availablePhases[0]);
      }
    }
  }, [derivedData.availablePhases, derivedData.safeAvailablePhases, phase]);

  // Map tasks from API data with dependency array
  useEffect(() => {
    if (tasksData?.tasks) {
      const mappedTasks: Task[] = tasksData.tasks.map((task: any) => ({
        ...task,
        title: task.title.replace(/^✅|^⬜/, '').trim(),
        completed: task.completed ?? false,
      }));
      setTasks(mappedTasks);
    }
  }, [tasksData?.tasks]);

  // Handle successful AI phase generation
  useEffect(() => {
    if (aiData && generatePhase > 0) {
      console.log('AI phase generation successful, refetching tasks...');

      setPhase(generatePhase);
      setDay(1);
      tasksRefetch();
      progressRefetch();
      setGeneratePhase(0);

      Toast.show({
        type: 'success',
        text1: '🎉 New phase generated successfully!',
        text2: `Phase ${generatePhase} is ready with new tasks`,
      });
    }
  }, [aiData, generatePhase, tasksRefetch, progressRefetch]);

  // Reset day when phase changes
  useEffect(() => {
    setDay(1);
  }, [phase]);

  // Handle errors
  useEffect(() => {
    if (error) {
      setErrorVisible(true);
      tasksRefetch();
    }
    console.log('error', error);
  }, [error, tasksRefetch]);

  // Memoize event handlers to prevent child component re-renders
  const updateTaskById = useCallback(async (id: string) => {
    try {
      await updateTask({
        goalId: initialId,
        phaseNo: phase,
        taskId: id,
      }).unwrap();

      setTasks((prev: Task[]) =>
        prev?.map((task: Task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      );

      Toast.show({
        type: 'success',
        text1: '✅ You have completed a task! 🔥',
      });

      progressRefetch();
      tasksRefetch();
    } catch (err) {
      console.error('❌ Failed to update task', err);
    }
  }, [updateTask, initialId, phase, progressRefetch, tasksRefetch]);

  const handlePhaseChange = useCallback((callbackOrValue: ((phase: number) => number) | number) => {
    const selectedValue =
      typeof callbackOrValue === 'function'
        ? callbackOrValue(phase)
        : callbackOrValue;

    const maxPhase = Math.max(...derivedData.safeAvailablePhases);
    const nextPhase = maxPhase + 1;

    if (selectedValue === nextPhase) {
      setGeneratePhase(nextPhase);
      return;
    }

    setPhase(selectedValue);
  }, [phase, derivedData.safeAvailablePhases]);

  const handleCloseErrorModal = useCallback(() => {
    setErrorVisible(false);
    setGeneratePhase(0);
  }, []);

  const handleAddGoal = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const errorMessage = () => {
    if (!error) return '';
    
    if ('data' in error && error.data) {
      const errorData = error.data as any;
      return errorData?.error ;
    }
    
    const errorObj = error as any;
    return errorObj?.message || 'An error occurred';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Your Smart Goal Plan</Text>

      <GoalCard
        category={derivedData.category}
        totalPhases={derivedData.totalPhases}
        phase={phase}
        progressPercent={derivedData.progressPercent}
        completedTasks={derivedData.completedTasks}
        totalTasks={derivedData.totalTasks}
        startDate={derivedData.startDate}
        endDate={derivedData.endDate}
      />

      <PhaseControls
        phase={phase}
        day={day}
        phaseItems={phaseItems}
        phaseOpen={phaseOpen}
        dayOpen={dayOpen}
        setPhaseOpen={setPhaseOpen}
        setDayOpen={setDayOpen}
        setPhaseItems={setPhaseItems}
        setDay={setDay}
        onPhaseChange={handlePhaseChange}
        onAddGoal={handleAddGoal}
      />

      <TasksList
        isLoading={isTasksLoading}
        tasks={tasks}
        onTaskUpdate={updateTaskById}
        tipOfThePhase={derivedData.tipOfThePhase}
      />

      <LaunchModal
        visible={isVisible}
        onClose={handleModalClose}
        LaunchText="This Feature will be added soon. Stay Tuned..."
      />
      
      <LoadingModal
        visible={aiGeneratingTasksLoading}
        loadingText={`Generating tasks for Phase ${generatePhase}... \n     This may take a while`}
      />
      
      <LaunchModal
        visible={errorVisible}
        onClose={handleCloseErrorModal}
        LaunchText={errorMessage()}
      />
    </View>
  );
};

export default GoalsScreen;