import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../daisybomConstants/colors';
import { DaisyCard } from '../daisybomComponents/DaisyCard';
import { Card } from '../daisybomComponents/Card';
import { Button } from '../daisybomComponents/Button';
import { PlayerCard } from '../daisybomComponents/PlayerCard';
import { Player } from '../daisybomTypes';
import { Storage } from '../daisybomUtils/storage';
import { DAISY_MESSAGES } from '../daisybomConstants/gameData';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadPlayers();
    }, [])
  );

  const loadPlayers = async () => {
    const p1 = await Storage.getPlayer1();
    const p2 = await Storage.getPlayer2();
    setPlayer1(p1);
    setPlayer2(p2);
  };

  const handleEditPlayer = (playerNumber: 1 | 2) => {
    navigation.getParent()?.navigate('EditPlayer', { playerNumber });
  };

  const handlePlay = () => {
    if (!player1 || !player2) {
      navigation.getParent()?.navigate('AddPlayer');
    } else {
      navigation.getParent()?.navigate('ChooseCategory');
    }
  };

  const handleWishList = () => {
    navigation.getParent()?.navigate('WishList');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>HOME</Text>

        <DaisyCard message={DAISY_MESSAGES.home} />

        {player1 && player2 ? (
          <Card style={styles.playersCard}>
            <View style={styles.playersContainer}>
              <PlayerCard
                player={player1}
                onEdit={() => handleEditPlayer(1)}
              />
              <View style={styles.vsContainer}>
                <View style={styles.vsCircle}>
                  <Text style={styles.vsText}>VS</Text>
                </View>
              </View>
              <PlayerCard
                player={player2}
                onEdit={() => handleEditPlayer(2)}
              />
            </View>
          </Card>
        ) : (
          <Card>
            <Text style={styles.noPlayersText}>
              Please add two players to start
            </Text>
            <Button
              title="ADD PLAYERS"
              onPress={() => navigation.getParent()?.navigate('AddPlayer')}
            />
          </Card>
        )}

        <Button title="PLAY" onPress={handlePlay} />
        <Button title="WISH LIST" onPress={handleWishList} variant="secondary" />
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
    textAlign: 'left',
  },
  playersCard: {
    marginVertical: 16,
    padding: 20,
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  vsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  vsCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    color: Colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  noPlayersText: {
    color: Colors.text,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
});

