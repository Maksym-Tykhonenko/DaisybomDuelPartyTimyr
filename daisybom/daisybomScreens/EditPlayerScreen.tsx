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
import { Card } from '../daisybomComponents/Card';
import { Input } from '../daisybomComponents/Input';
import { Button } from '../daisybomComponents/Button';
import { Player } from '../daisybomTypes';
import { Storage } from '../daisybomUtils/storage';
import { pickImage } from '../daisybomUtils/imagePicker';

interface EditPlayerScreenProps {
  navigation: any;
  route: any;
}

export const EditPlayerScreen: React.FC<EditPlayerScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const { playerNumber } = route.params;
  const [name, setName] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    loadPlayer();
  }, [playerNumber]);

  const loadPlayer = async () => {
    const p =
      playerNumber === 1
        ? await Storage.getPlayer1()
        : await Storage.getPlayer2();
    if (p) {
      setPlayer(p);
      setName(p.name);
      setAvatarUri(p.avatar || null);
    }
  };

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setAvatarUri(uri);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || !player) {
      return;
    }

    const updatedPlayer: Player = {
      ...player,
      name: name.trim(),
      avatar: avatarUri || undefined,
    };

    if (playerNumber === 1) {
      await Storage.savePlayer1(updatedPlayer);
    } else {
      await Storage.savePlayer2(updatedPlayer);
    }

    navigation.goBack();
  };

  const handleExit = () => {
    navigation.goBack();
  };

  if (!player) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>EDIT</Text>

        <Card>
          <Text style={styles.editLabel}>EDIT</Text>
          <Text style={styles.playerLabel}>Player {playerNumber}</Text>
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
                  {name.charAt(0).toUpperCase() || player.name.charAt(0).toUpperCase()}
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
          <Button title="SAVE" onPress={handleSave} />
          <Button title="EXIT" onPress={handleExit} variant="danger" />
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
    textAlign: 'left',
  },
  editLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  playerLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: Colors.border,
  },
  avatarText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: Colors.background,
  },
});

