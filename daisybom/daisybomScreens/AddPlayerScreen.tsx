import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { DaisyCard } from '../daisybomComponents/DaisyCard';
import { Card } from '../daisybomComponents/Card';
import { Input } from '../daisybomComponents/Input';
import { Button } from '../daisybomComponents/Button';
import { Player } from '../daisybomTypes';
import { Storage } from '../daisybomUtils/storage';
import { DAISY_MESSAGES } from '../daisybomConstants/gameData';
import { pickImage } from '../daisybomUtils/imagePicker';

interface AddPlayerScreenProps {
  navigation: any;
  route: any;
}

export const AddPlayerScreen: React.FC<AddPlayerScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const playerNumber = route?.params?.playerNumber || 1;
  const [name, setName] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
    loadPlayer();
  }, [playerNumber]);

  const loadPlayer = async () => {
    const player =
      playerNumber === 1
        ? await Storage.getPlayer1()
        : await Storage.getPlayer2();
    if (player) {
      setCurrentPlayer(player);
      setName(player.name);
      setAvatarUri(player.avatar || null);
    }
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setAvatarUri(uri);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      return;
    }

    const player: Player = {
      id: `player${playerNumber}`,
      name: name.trim(),
      avatar: avatarUri || undefined,
    };

    if (playerNumber === 1) {
      await Storage.savePlayer1(player);
    } else {
      await Storage.savePlayer2(player);
    }

    if (playerNumber === 1) {
      navigation.replace('AddPlayer', { playerNumber: 2 });
    } else {
      navigation.navigate('MainTabs', { screen: 'HomeTab' });
    }
  };

  const handleNext = () => {
    if (playerNumber === 1) {
      navigation.navigate('AddPlayer', { playerNumber: 2 });
    } else {
      navigation.navigate('MainTabs', { screen: 'HomeTab' });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          {currentPlayer ? `PLAYER ${playerNumber}` : 'ADD PLAYER'}
        </Text>

        <DaisyCard message={DAISY_MESSAGES.addPlayer} />

        <Card>
          <Text style={styles.label}>Player {playerNumber}</Text>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handlePickImage}
            activeOpacity={0.7}
          >
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {name.charAt(0).toUpperCase() || '+'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <Input
            placeholder="Write your name"
            value={name}
            onChangeText={setName}
            autoFocus
          />
          {currentPlayer ? (
            <Button title="NEXT" onPress={handleNext} />
          ) : (
            <Button
              title={playerNumber === 1 ? 'NEXT' : 'SAVE'}
              onPress={handleSave}
            />
          )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.border,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.background,
  },
});

