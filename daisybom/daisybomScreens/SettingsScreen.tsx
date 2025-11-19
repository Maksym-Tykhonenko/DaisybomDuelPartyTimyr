import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { DaisyCard } from '../daisybomComponents/DaisyCard';
import { Card } from '../daisybomComponents/Card';
import { Settings } from '../daisybomTypes';
import { Storage } from '../daisybomUtils/storage';
import { DAISY_MESSAGES } from '../daisybomConstants/gameData';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [vibrationEnabled, setVibrationEnabled] = useState(false);
  const [roundCount, setRoundCount] = useState<5 | 10 | 15>(10);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const settings = await Storage.getSettings();
    if (settings) {
      setVibrationEnabled(settings.vibrationEnabled);
      setRoundCount(settings.roundCount);
    }
  };

  const handleVibrationToggle = async (value: boolean) => {
    setVibrationEnabled(value);
    const settings: Settings = {
      vibrationEnabled: value,
      roundCount,
    };
    await Storage.saveSettings(settings);
  };

  const handleRoundCountChange = async (count: 5 | 10 | 15) => {
    setRoundCount(count);
    const settings: Settings = {
      vibrationEnabled,
      roundCount: count,
    };
    await Storage.saveSettings(settings);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>SETTINGS</Text>

        <DaisyCard message={DAISY_MESSAGES.settings} />

        <Card>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Switch
              value={vibrationEnabled}
              onValueChange={handleVibrationToggle}
              trackColor={{ false: Colors.cardBackground, true: Colors.primary }}
              thumbColor={Colors.text}
            />
          </View>
          <Text style={styles.settingDescription}>
            Enable vibration when rounds start and when players answer
          </Text>
        </Card>

        <Card>
          <Text style={styles.settingLabel}>Number of Rounds</Text>
          <View style={styles.roundButtons}>
            <TouchableOpacity
              style={[
                styles.roundButton,
                roundCount === 5 && styles.roundButtonActive,
              ]}
              onPress={() => handleRoundCountChange(5)}
            >
              <Text
                style={[
                  styles.roundButtonText,
                  roundCount === 5 && styles.roundButtonTextActive,
                ]}
              >
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roundButton,
                roundCount === 10 && styles.roundButtonActive,
              ]}
              onPress={() => handleRoundCountChange(10)}
            >
              <Text
                style={[
                  styles.roundButtonText,
                  roundCount === 10 && styles.roundButtonTextActive,
                ]}
              >
                10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roundButton,
                roundCount === 15 && styles.roundButtonActive,
              ]}
              onPress={() => handleRoundCountChange(15)}
            >
              <Text
                style={[
                  styles.roundButtonText,
                  roundCount === 15 && styles.roundButtonTextActive,
                ]}
              >
                15
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  roundButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  roundButton: {
    width: 80,
    height: 50,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
  },
  roundButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  roundButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  roundButtonTextActive: {
    color: Colors.background,
  },
});

