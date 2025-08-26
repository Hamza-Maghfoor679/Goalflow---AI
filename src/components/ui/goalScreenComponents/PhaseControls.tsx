import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../../../components/styles/mainScreenStyles/GoalsStyle';

interface PhaseControlsProps {
  phase: number;
  day: number;
  phaseItems: Array<{ label: string; value: number }>;
  phaseOpen: boolean;
  dayOpen: boolean;
  setPhaseOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPhaseItems: React.Dispatch<
    React.SetStateAction<Array<{ label: string; value: number }>>
  >;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  onPhaseChange: (value: any) => void;
  onAddGoal: () => void;
}

const PhaseControls: React.FC<PhaseControlsProps> = ({
  phase,
  day,
  phaseItems,
  phaseOpen,
  dayOpen,
  setPhaseOpen,
  setDayOpen,
  setPhaseItems,
  setDay,
  onPhaseChange,
  onAddGoal,
}) => {
  const dayItems = Array.from({ length: 7 }, (_, i) => ({
    label: `Day ${i + 1}`,
    value: i + 1,
  }));

  return (
    <>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <DropDownPicker
          open={phaseOpen}
          value={phase}
          items={phaseItems}
          setOpen={setPhaseOpen}
          setValue={onPhaseChange}
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
          setItems={() => {}}
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
          <TouchableOpacity onPress={onAddGoal}>
            <Ionicons name="add-circle" size={30} />
          </TouchableOpacity>
          <Text style={styles.addGoalText}>Add Goal</Text>
        </View>
      </View>
    </>
  );
};

export default PhaseControls;