import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { Card } from '../daisybomComponents/Card';
import { Button } from '../daisybomComponents/Button';
import { Player } from '../daisybomTypes';
import { Storage } from '../daisybomUtils/storage';

interface ResultsScreenProps {
  navigation: any;
  route: any;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { scores, results } = route.params;
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const p1 = await Storage.getPlayer1();
    const p2 = await Storage.getPlayer2();
    setPlayer1(p1);
    setPlayer2(p2);
  };

  const getWinner = () => {
    if (scores.player1 > scores.player2) return 1;
    if (scores.player2 > scores.player1) return 2;
    return 0; // Tie
  };

  const handleShare = async () => {
    if (!player1 || !player2) return;

    const winner = getWinner();
    let winnerText = '';
    if (winner === 1) {
      winnerText = `${player1.name} won with ${scores.player1} points!`;
    } else if (winner === 2) {
      winnerText = `${player2.name} won with ${scores.player2} points!`;
    } else {
      winnerText = `It's a tie! Both players scored ${scores.player1} points!`;
    }

    const shareMessage = `🎮 Daisybom: Duel Party Results 🎮\n\n${winnerText}\n\n${player1.name}: ${scores.player1} points\n${player2.name}: ${scores.player2} points\n\nPlay Daisybom: Duel Party and have fun!`;

    try {
      await Share.share({
        message: shareMessage,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleWishList = () => {
    navigation.navigate('WishList', { winner: getWinner() });
  };

  if (!player1 || !player2) {
    return null;
  }

  const winner = getWinner();
  const winnerPlayer = winner === 1 ? player1 : winner === 2 ? player2 : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>RESULTS</Text>

        <Card style={styles.scoreboard}>
          <View style={styles.scoreItem}>
            {player2.avatar ? (
              <Image source={{ uri: player2.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {player2.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text style={styles.playerInfo}>
              Player 2 {player2.name}
            </Text>
            <Text style={[styles.score, scores.player2 >= scores.player1 && styles.winnerScore]}>
              {scores.player2}
            </Text>
          </View>
          <View style={styles.scoreItem}>
            {player1.avatar ? (
              <Image source={{ uri: player1.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {player1.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text style={styles.playerInfo}>
              Player 1 {player1.name}
            </Text>
            <Text style={[styles.score, scores.player1 >= scores.player2 && styles.winnerScore]}>
              {scores.player1}
            </Text>
          </View>
        </Card>

        {winner !== 0 && winnerPlayer && (
          <Card style={styles.winnerCard}>
            <Text style={styles.winnerText}>
              Player {winner} is better! He can make a wish or choose from the offered.
            </Text>
            <TouchableOpacity style={styles.daisyButton}>
              <Text style={styles.daisyButtonText}>D</Text>
            </TouchableOpacity>
          </Card>
        )}

        {winner === 0 && (
          <Card style={styles.winnerCard}>
            <Text style={styles.winnerText}>
              It's a tie! Both players did great!
            </Text>
          </Card>
        )}

        <Button title="WISHLIST" onPress={handleWishList} variant="secondary" />
        <Button title="SHARE" onPress={handleShare} />

        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })}
          >
            <Text style={styles.navIcon}>Home</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  scoreboard: {
    marginVertical: 16,
    padding: 20,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.background,
  },
  playerInfo: {
    flex: 1,
    fontSize: 18,
    color: Colors.text,
    fontWeight: '600',
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  winnerScore: {
    color: Colors.success,
    fontSize: 32,
  },
  winnerCard: {
    marginVertical: 16,
    position: 'relative',
    padding: 20,
    paddingRight: 60,
  },
  winnerText: {
    fontSize: 17,
    color: Colors.text,
    lineHeight: 26,
  },
  daisyButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daisyButtonText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 18,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: Colors.cardBackground,
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

