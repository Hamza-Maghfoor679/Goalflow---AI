// hooks/useTypedNavigation.ts
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

export function useTypedNavigation() {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
}
