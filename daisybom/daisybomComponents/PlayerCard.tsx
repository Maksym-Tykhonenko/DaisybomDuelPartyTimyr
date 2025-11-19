import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../daisybomConstants/colors';
import { Player } from '../daisybomTypes';
import { Button } from './Button';

interface PlayerCardProps {
  player: Player;
  onEdit: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {player.avatar ? (
          <Image source={{ uri: player.avatar }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {player.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.name}>{player.name}</Text>
      <Button title="EDIT" onPress={onEdit} variant="secondary" style={styles.editButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.background,
  },
  name: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 90,
    borderRadius: 20,
  },
});

