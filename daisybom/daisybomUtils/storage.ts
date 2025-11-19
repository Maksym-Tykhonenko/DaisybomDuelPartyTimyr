import AsyncStorage from '@react-native-async-storage/async-storage';
import { Player, Settings } from '../daisybomTypes';

const KEYS = {
  PLAYER1: '@player1',
  PLAYER2: '@player2',
  SETTINGS: '@settings',
  ONBOARDING_COMPLETED: '@onboarding_completed',
};

export const Storage = {
  async getPlayer1(): Promise<Player | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.PLAYER1);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async savePlayer1(player: Player): Promise<void> {
    await AsyncStorage.setItem(KEYS.PLAYER1, JSON.stringify(player));
  },

  async getPlayer2(): Promise<Player | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.PLAYER2);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async savePlayer2(player: Player): Promise<void> {
    await AsyncStorage.setItem(KEYS.PLAYER2, JSON.stringify(player));
  },

  async getSettings(): Promise<Settings | null> {
    try {
      const data = await AsyncStorage.getItem(KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  async saveSettings(settings: Settings): Promise<void> {
    await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },

  async getOnboardingCompleted(): Promise<boolean> {
    try {
      const data = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETED);
      return data === 'true';
    } catch {
      return false;
    }
  },

  async setOnboardingCompleted(completed: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETED, String(completed));
  },
};

