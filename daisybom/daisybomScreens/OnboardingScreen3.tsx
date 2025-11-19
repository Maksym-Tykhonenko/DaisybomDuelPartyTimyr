import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { Button } from '../daisybomComponents/Button';

interface OnboardingScreen3Props {
  navigation: any;
}

export const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const handleStart = () => {
    navigation.navigate('Onboarding4');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.circleContainer}>
        <View style={styles.yellowCircle}>
          <View style={styles.imageContainer}>
            {/* TODO: Replace with Image component when path is provided
            <Image 
              source={require('YOUR_PATH_TO_DAISY_THUMBS_UP_IMAGE')} 
              style={styles.daisyImage}
              resizeMode="contain"
            /> */}
            <Image source={require('../assets/img/woman/3.png')} style={{width: 250, height: 300}} resizeMode='stretch' />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Let's get started</Text>
        <Text style={styles.body}>
          Choose your avatars, enter your names — and I'll guide you to a cool
          pastime Take your time, listen to each other, and just enjoy the
          moment. Let's go together — it's time to start
        </Text>
        <Button title="START" onPress={handleStart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  yellowCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 100,
  },
  daisyImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 28,
    margin: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 18,
    textAlign: 'center',
  },
  body: {
    fontSize: 17,
    color: Colors.text,
    lineHeight: 26,
    marginBottom: 28,
    textAlign: 'center',
  },
});

