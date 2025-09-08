import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../components/styles/mainScreenStyles/GoalsStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { useGetProgressQuery, useGetTasksQuery, useUpdateTaskMutation } from '../../api/tasks';
import Toast from 'react-native-toast-message';
import LaunchModal from '../../components/ui/LaunchModal';
import LoadingModal from '../../components/ui/LoadingModal';
import GoalCard from '../../components/ui/goalScreenComponents/GoalCard';
import PhaseControls from '../../components/ui/goalScreenComponents/PhaseControls';
import TasksList from '../../components/ui/goalScreenComponents/TasksList';
import { useUserDetailsQuery } from '../../api/userApi';
import { useLazyGenerateTaskswithAiQuery } from '../../api/ai';

const GoalsScreen: React.FC = () => {
  const { Uid } = useSelector((state: RootState) => state.auth);

  // --- RTK Query Hooks ---
  const { data: userDetails, isLoading: isUserDetailsLoading } = useUserDetailsQuery(undefined, { skip: !Uid });
  const initialId = userDetails?.firestoreData?.goals?.[0] || '';

  const [phase, setPhase] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [phaseOpen, setPhaseOpen] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);
  const [isFeatureModalVisible, setIsFeatureModalVisible] = useState<boolean>(false);
  // Add state to control error modal visibility
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isFetching: isTasksFetching,
    refetch: tasksRefetch,
  } = useGetTasksQuery(
    { goalId: initialId, phase, dayIndex: day - 1 },
    { skip: !initialId || isUserDetailsLoading }
  );

  const { data: goalProgressData, refetch: progressRefetch } = useGetProgressQuery(
    { goalId: initialId },
    { skip: !initialId || isUserDetailsLoading }
  );

  const [triggerGenerate, { isLoading: aiLoading, isError: isAiError, isSuccess: isAiSuccess, error: aiError }] =
    useLazyGenerateTaskswithAiQuery();
  const [updateTask] = useUpdateTaskMutation();

  // --- Derived State and Memoization ---

  const availablePhases = tasksData?.availablePhases ?? [];
  const category = tasksData?.category ? tasksData.category.charAt(0).toUpperCase() + tasksData.category.slice(1) : 'General';

  const phaseItems = useMemo(() => {
    if (!availablePhases.length) return [];
    const items = availablePhases.map((num: number) => ({
      label: `Phase ${num}`,
      value: num,
    }));

    if (!aiLoading) {
      const nextPhase = Math.max(...availablePhases) + 1;
      items.push({ label: `➕ Add Phase ${nextPhase}`, value: nextPhase });
    }
    return items;
  }, [availablePhases, aiLoading]);

 const tasks = useMemo(() => {
  return tasksData?.tasks?.map((t: any) => {
    const cleanTitle = t.title.replace(/^✅|^⬜/, '').trim();
    const icon = t.completed ? '✅' : '⬜';

    return {
      ...t,
      title: `${icon} ${cleanTitle}`,
      completed: t.completed ?? false,
    };
  }) || [];
}, [tasksData?.tasks]);
    console.log('Mapped Tasks:', tasks);


  // --- Effects and Callbacks ---

  useEffect(() => {
    if (initialId && availablePhases.length === 0 && !aiLoading && !isTasksFetching) {
      triggerGenerate({ goalId: initialId, phase: 1 });
    }
  }, [initialId, availablePhases, aiLoading, isTasksFetching, triggerGenerate]);

  useEffect(() => {
    if (isAiSuccess) {
      tasksRefetch();
      progressRefetch();
      Toast.show({
        type: 'success',
        text1: '🎉 Phase generated successfully!',
      });
    }
  }, [isAiSuccess, tasksRefetch, progressRefetch]);

  // Show error modal when AI error occurs
  useEffect(() => {
    if (isAiError) {
      setShowErrorModal(true);
    }
  }, [isAiError]);

  useEffect(() => {
    setDay(1);
  }, [phase]);

  const updateTaskById = useCallback(async (id: string) => {
    try {
      await updateTask({ goalId: initialId, phaseNo: phase, taskId: id }).unwrap();
      Toast.show({ type: 'success', text1: '✅ Task updated!' });
      progressRefetch();
      tasksRefetch()
    } catch (err) {
      Toast.show({ type: 'error', text1: '❌ Failed to update task' });
    }
  }, [updateTask, initialId, phase, progressRefetch]);

  const handlePhaseChange = useCallback((callbackOrValue: any) => {
    if (aiLoading) return;

    const selected = typeof callbackOrValue === 'function' ? callbackOrValue(phase) : callbackOrValue;
    const nextPhase = Math.max(...availablePhases, 1) + 1;

    if (selected === nextPhase) {
      triggerGenerate({ goalId: initialId, phase: nextPhase });
    } else if (availablePhases.includes(selected)) {
      setPhase(selected);
    }
  }, [phase, availablePhases, initialId, triggerGenerate, aiLoading]);

  // Handle error modal close
  const handleErrorModalClose = useCallback(() => {
    setShowErrorModal(false);
  }, []);

  const isLoading = isUserDetailsLoading || isTasksLoading || isTasksFetching;

  // --- Rendered Component ---
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Your Smart Goal Plan</Text>

      <GoalCard
        category={category}
        totalPhases={tasksData?.totalPhases}
        phase={phase}
        progressPercent={goalProgressData?.progressPercent}
        completedTasks={goalProgressData?.completedTasks}
        totalTasks={goalProgressData?.totalTasks}
        startDate={tasksData?.startDate}
        endDate={tasksData?.endDate}
      />

      <PhaseControls
        phase={phase}
        day={day}
        phaseItems={phaseItems}
        phaseOpen={phaseOpen}
        setPhaseItems={phaseItems}
        dayOpen={dayOpen}
        setPhaseOpen={setPhaseOpen}
        setDayOpen={setDayOpen}
        setDay={setDay}
        onPhaseChange={handlePhaseChange}
        onAddGoal={() => setIsFeatureModalVisible(true)}
        aiLoading={aiLoading}
      />

      <TasksList
        isLoading={isLoading}
        tasks={tasks}
        onTaskUpdate={updateTaskById}
        tipOfThePhase={tasksData?.tipOfThePhase}
      />

      {/* Modals */}
      <LaunchModal
        visible={isFeatureModalVisible}
        onClose={() => setIsFeatureModalVisible(false)}
        LaunchText="This Feature will be added soon. Stay Tuned..."
      />
      <LoadingModal
        visible={aiLoading}
        loadingText="Generating AI tasks..."
        text2="This might take a while..."
      />
      <LaunchModal
        visible={showErrorModal}
        onClose={handleErrorModalClose}
        LaunchText={
          (aiError && typeof aiError === 'object' && 'data' in aiError && (aiError as any).data?.error)
            || 'An error occurred while generating tasks.'
        }
      />
    </View>
  );
};

export default GoalsScreen;