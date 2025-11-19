import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../daisybomConstants/colors';

interface DaisyCardProps {
  message: string;
}

export const DaisyCard: React.FC<DaisyCardProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarPlaceholder}>
          <Image source={require('../assets/img/woman/1.png')} style={{width: 56, height: 56, borderRadius: 28}} resizeMode='stretch' />
        </View>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 18,
    marginVertical: 12,
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 14,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  message: {
    flex: 1,
    color: Colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
});

