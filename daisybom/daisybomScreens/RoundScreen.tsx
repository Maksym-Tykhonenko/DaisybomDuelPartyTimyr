import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Vibration,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { Card } from '../daisybomComponents/Card';
import { Button } from '../daisybomComponents/Button';
import { Category, RoundResult, Player } from '../daisybomTypes';
import { TASKS } from '../daisybomConstants/gameData';
import { Storage } from '../daisybomUtils/storage';

interface RoundScreenProps {
  navigation: any;
  route: any;
}

export const RoundScreen: React.FC<RoundScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { category, round, results: initialResults = [] } = route.params;
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  const [results, setResults] = useState<RoundResult[]>(initialResults);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    loadData();
    checkVibration();
  }, []);

  const loadData = async () => {
    const p1 = await Storage.getPlayer1();
    const p2 = await Storage.getPlayer2();
    const s = await Storage.getSettings();
    setPlayer1(p1);
    setPlayer2(p2);
    setSettings(s);
  };

  const checkVibration = async () => {
    const s = await Storage.getSettings();
    if (s?.vibrationEnabled) {
      Vibration.vibrate(100);
    }
  };

  const getCurrentPlayer = () => {
    const isPlayer1Turn = round % 2 === 1;
    return isPlayer1Turn ? player1 : player2;
  };

  const getCurrentPlayerNumber = () => {
    return round % 2 === 1 ? 1 : 2;
  };

  const getTask = () => {
    const tasks = TASKS[category as Category];
    const taskIndex = (round - 1) % tasks.length;
    return tasks[taskIndex];
  };

  const handleAnswer = async (completed: boolean) => {
    const currentPlayer = getCurrentPlayer();
    if (!currentPlayer || !player1 || !player2) return;

    const s = await Storage.getSettings();
    if (s?.vibrationEnabled) {
      Vibration.vibrate(50);
    }

    const newResult: RoundResult = {
      round,
      playerId: currentPlayer.id,
      completed,
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    const totalRounds = s?.roundCount || 10;
    const isLastRound = round >= totalRounds;

    if (isLastRound) {
      // Calculate scores
      const player1Results = updatedResults.filter(
        (r) => r.playerId === player1.id && r.completed
      );
      const player2Results = updatedResults.filter(
        (r) => r.playerId === player2.id && r.completed
      );

      navigation.navigate('Results', {
        scores: {
          player1: player1Results.length,
          player2: player2Results.length,
        },
        results: updatedResults,
      });
    } else {
      navigation.replace('Round', {
        category,
        round: round + 1,
        results: updatedResults,
      });
    }
  };

  const currentPlayer = getCurrentPlayer();
  const currentPlayerNumber = getCurrentPlayerNumber();
  const task = getTask();

  if (!currentPlayer || !player1 || !player2) {
    return null;
  }

  const progressDots = Array.from({ length: settings?.roundCount || 10 }, (_, i) => i + 1);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>ROUND {round}</Text>
        <View style={styles.progressContainer}>
          {progressDots.map((dot) => (
            <View
              key={dot}
              style={[
                styles.progressDot,
                dot <= round && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        <Card style={styles.playerCard}>
          <View style={styles.playerInfo}>
            {currentPlayer.avatar ? (
              <Image
                source={{ uri: currentPlayer.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {currentPlayer.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View>
              <Text style={styles.playerLabel}>Player {currentPlayerNumber}</Text>
              <Text style={styles.playerName}>{currentPlayer.name}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.taskCard}>
          <Text style={styles.taskLabel}>TASK:</Text>
          <Text style={styles.taskText}>{task}</Text>
        </Card>

        <Button title="DONE" onPress={() => handleAnswer(true)} />
        <Button
          title="NOT DONE"
          onPress={() => handleAnswer(false)}
          variant="danger"
        />

       
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
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 6,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  playerCard: {
    marginVertical: 16,
    padding: 16,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.background,
  },
  playerLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  playerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  taskCard: {
    marginVertical: 16,
    padding: 20,
  },
  taskLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  taskText: {
    fontSize: 18,
    color: Colors.text,
    lineHeight: 28,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navButton: {
    padding: 8,
  },
  navIcon: {
    fontSize: 24,
    color: Colors.primary,
  },
});

