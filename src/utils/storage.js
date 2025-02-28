import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@timers';

export const loadTimers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const saveTimers = async (timers) => {
  try {
    const jsonValue = JSON.stringify(timers);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error(e);
  }
};