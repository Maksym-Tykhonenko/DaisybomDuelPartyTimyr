import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../daisybomConstants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'danger' && styles.dangerButton,
    variant === 'secondary' && styles.secondaryButton,
    style,
  ];

  const buttonTextStyle = [
    styles.buttonText,
    variant === 'primary' && styles.primaryButtonText,
    variant === 'danger' && styles.dangerButtonText,
    variant === 'secondary' && styles.secondaryButtonText,
    textStyle,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.7}>
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  dangerButton: {
    backgroundColor: Colors.error,
  },
  secondaryButton: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.background,
    textTransform: 'uppercase',
  },
  primaryButtonText: {
    color: Colors.background,
  },
  dangerButtonText: {
    color: Colors.text,
  },
  secondaryButtonText: {
    color: Colors.primary,
  },
});

