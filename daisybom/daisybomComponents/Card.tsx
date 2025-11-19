import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../daisybomConstants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 20,
    marginVertical: 10,
  },
});

