import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from '../../../components/styles/mainScreenStyles/GoalsStyle';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksListProps {
  isLoading: boolean;
  tasks: Task[];
  onTaskUpdate: (id: string) => void;
  tipOfThePhase?: string;
}

const TaskItem: React.FC<{
  item: Task;
  onTaskUpdate: (id: string) => void;
}> = ({ item, onTaskUpdate }) => {
  const cleanTitle = item.title.replace(/^✅|^⬜/, '').trim();

  return (
    <TouchableOpacity
      style={[
        styles.taskCard,
        item.completed && styles.completedTask,
      ]}
      onPress={() => onTaskUpdate(item.id)}
    >
      <Text style={styles.taskText}>
        {item.completed ? '✅' : '⬜'} {cleanTitle}
      </Text>
    </TouchableOpacity>
  );
};

const TasksList: React.FC<TasksListProps> = ({
  isLoading,
  tasks,
  onTaskUpdate,
  tipOfThePhase,
}) => {
  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ marginVertical: 20 }}
      />
    );
  }

  return (
    <>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem item={item} onTaskUpdate={onTaskUpdate} />
          )}
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
    </>
  );
};

export default TasksList;