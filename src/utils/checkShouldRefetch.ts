import AsyncStorage from "@react-native-async-storage/async-storage";

export const shouldRefetch = async (key: string, intervalMs: number): Promise<boolean> => {
  try {
    const lastFetch = await AsyncStorage.getItem(key);
    const now = Date.now();

    if (!lastFetch) return true;

    const timeDiff = now - parseInt(lastFetch, 10);
    return timeDiff > intervalMs;
  } catch (err) {
    console.warn('Error checking refetch logic:', err);
    return true; // fallback to refetch if something goes wrong
  }
};

export const saveRefetchTime = async (key: string) => {
  await AsyncStorage.setItem(key, Date.now().toString());
};