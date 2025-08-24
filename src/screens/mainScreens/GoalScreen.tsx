import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from '../../components/styles/mainScreenStyles/GoalsStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import {
  useGetProgressQuery,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '../../api/tasks';
import { getProgressColor } from '../../utils/progress';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LaunchModal from '../../components/ui/LaunchModal';
import { useGenerateTaskswithAiQuery } from '../../api/HomeApi';
import LoadingModal from '../../components/ui/LoadingModal';

const GoalsScreen: React.FC = () => {
  const goalIds = useSelector((state: RootState) => state.goals.goalIds);
  const initialId = goalIds[0];

  const [phase, setPhase] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [errorVisible, setErrorVisible] = useState<boolean>(false); // Fixed typo

  const [tasks, setTasks] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [generatePhase, setGeneratePhase] = useState<number>(0);

  const [phaseOpen, setPhaseOpen] = useState(false);
  const [dayOpen, setDayOpen] = useState(false);

  const [phaseItems, setPhaseItems] = useState(
    Array.from({ length: 4 }, (_, i) => ({
      label: `Phase ${i + 1}`,
      value: i + 1,
    })),
  );

  const [dayItems, setDayItems] = useState(
    Array.from({ length: 7 }, (_, i) => ({
      label: `Day ${i + 1}`,
      value: i + 1,
    })),
  );

  const {
    data: tasksData,
    isLoading: isTasksLoading,
    refetch: tasksRefetch,
  } = useGetTasksQuery({
    goalId: initialId,
    phase,
    dayIndex: day - 1,
  });

  const {
    data: goalProgressData,
    isLoading: isProgressLoading,
    refetch: progressRefetch,
  } = useGetProgressQuery({ goalId: initialId });

  const progressPercent = goalProgressData?.progressPercent ?? 0;
  const totalTasks = goalProgressData?.totalTasks ?? 0;
  const completedTasks = goalProgressData?.completedTasks ?? 0;
  const category = tasksData?.category
    ? tasksData.category.charAt(0).toUpperCase() + tasksData.category.slice(1)
    : 'General';
  const tipOfThePhase = tasksData?.tipOfThePhase;
  const totalPhases = tasksData?.totalPhases ?? 4;
  const availablePhases = tasksData?.availablePhases ?? [];
  console.log('availablePhases', availablePhases);

  useEffect(() => {
    if (availablePhases && Array.isArray(availablePhases)) {
      const items = availablePhases.map((phaseNum: number) => ({
        label: `Phase ${phaseNum}`,
        value: phaseNum,
      }));

      const maxPhase = Math.max(...availablePhases);
      const nextPhase = maxPhase + 1;
      // Don't automatically set generatePhase here

      items.push({
        label: `➕ Add Phase ${nextPhase}`,
        value: nextPhase,
      });

      setPhaseItems(items);

      // Reset phase if current phase is not in the list
      if (!availablePhases.includes(phase)) {
        setPhase(availablePhases[0]);
      }
    }
  }, [availablePhases]);

  const [updateTask] = useUpdateTaskMutation();
  const {
    data,
    isLoading: aiGeneratingTasksLoading,
    error,
  } = useGenerateTaskswithAiQuery(
    { goalId: initialId, phase: generatePhase },
    { skip: generatePhase === 0 }, // Only call API when generatePhase is set
  );

  useEffect(() => {
    if (tasksData?.tasks) {
      const mappedTasks = tasksData.tasks.map((task: any) => ({
        ...task,
        title: task.title.replace(/^✅|^⬜/, '').trim(),
        completed: task.completed ?? false,
      }));
      setTasks(mappedTasks);
    }
  }, [tasksData?.tasks]);

  useEffect(() => {
    // Reset day when phase changes (optional)
    setDay(1);
  }, [phase]);

  // Handle successful data generation
  useEffect(() => {
    if (data && generatePhase > 0) {
      tasksRefetch();
      progressRefetch();
      setGeneratePhase(0); // Reset after successful generation
    }
  }, [data, generatePhase]);

  // Handle error from API - only show error for new generation attempts
  useEffect(() => {
    if (error && generatePhase > 0) {
      setErrorVisible(true);
    }
  }, [error, generatePhase]);

  const updateTaskById = async (id: string) => {
    try {
      await updateTask({
        goalId: initialId,
        phaseNo: phase,
        taskId: id,
      }).unwrap();

      setTasks(prev =>
        prev?.map((task: { id: string; completed: boolean }) =>
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
  };

  const handleCloseErrorModal = () => {
    setErrorVisible(false);
    setGeneratePhase(0);
  };

  const handleAddGoal = () => {
    setIsVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Your Smart Goal Plan</Text>

      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>Goal: {category}</Text>
        <Text style={styles.goalDescription}>
          Based on your time frame and personality: We have divided your Goal
          into {totalPhases} phases
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              {
                width: `${progressPercent}%`,
                backgroundColor: getProgressColor(progressPercent),
              },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          Phase {phase} of {totalPhases}
        </Text>
        <Text style={styles.progressText}>
          Tasks Completed {completedTasks} of {totalTasks}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <DropDownPicker
          open={phaseOpen}
          value={phase}
          items={phaseItems}
          setOpen={setPhaseOpen}
          setValue={callbackOrValue => {
            const selectedValue =
              typeof callbackOrValue === 'function'
                ? callbackOrValue(phase)
                : callbackOrValue;

            const maxPhase = Math.max(...availablePhases);
            const nextPhase = maxPhase + 1;

            if (selectedValue === nextPhase) {
              setGeneratePhase(nextPhase);
              return;
            }

            setPhase(selectedValue);
          }}
          setItems={setPhaseItems}
          containerStyle={{ flex: 1, height: 40 }}
          style={{ height: 35 }}
          dropDownContainerStyle={{ height: 'auto' }}
          textStyle={{ fontSize: 14 }}
          labelStyle={{ lineHeight: 18 }}
          placeholder="Select Phase"
          zIndex={3000}
        />

        <DropDownPicker
          open={dayOpen}
          value={day}
          items={dayItems}
          setOpen={setDayOpen}
          setValue={setDay}
          setItems={setDayItems}
          containerStyle={{ flex: 1, height: 40 }}
          style={{ height: 35 }}
          dropDownContainerStyle={{ height: 'auto' }}
          textStyle={{ fontSize: 14 }}
          labelStyle={{ lineHeight: 18 }}
          placeholder="Select Day"
          zIndex={2000}
        />
      </View>

      <View style={styles.todayTasksContainer}>
        <Text style={styles.sectionTitle}>📅 Today's Tasks</Text>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleAddGoal}>
            <Ionicons name="add-circle" size={30} />
          </TouchableOpacity>
          <Text style={styles.addGoalText}>Add Goal</Text>
        </View>
      </View>

      {isTasksLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginVertical: 20 }}
        />
      ) : tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const cleanTitle = item.title.replace(/^✅|^⬜/, '').trim();
            return (
              <TouchableOpacity
                style={[
                  styles.taskCard,
                  item.completed && styles.completedTask,
                ]}
                onPress={() => updateTaskById(item.id.toString())}
              >
                <Text style={styles.taskText}>
                  {item.completed ? '✅' : '⬜'} {cleanTitle}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <Text
          style={[styles.tipText, { marginVertical: 20, textAlign: 'center' }]}
        >
          🎉 No tasks available today!
        </Text>
      )}

      <Text style={styles.tipTitle}>💡 AI Tip For This Phase</Text>
      <Text style={styles.tipText}>
        {tipOfThePhase || 'Its Better to stick to one goal at one time.'}
      </Text>

      <LaunchModal
        visible={isVisible}
        onClose={() => setIsVisible(false)}
        LaunchText="This Feature will be added soon. Stay Tuned..."
      />
      <LoadingModal
        visible={aiGeneratingTasksLoading}
        loadingText={`Generating tasks for Phase ${generatePhase}`}
      />
      <LaunchModal
        visible={errorVisible}
        onClose={handleCloseErrorModal}
        LaunchText={`You have exceeded the phases according to time period`}
      />
    </View>
  );
};

export default GoalsScreen;
