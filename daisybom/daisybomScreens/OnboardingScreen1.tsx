import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { Button } from '../daisybomComponents/Button';

interface OnboardingScreen1Props {
  navigation: any;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.circleContainer}>
        <View style={styles.yellowCircle}>
          <View style={styles.imageContainer}>
            {/* TODO: Replace with Image component when path is provided
            <Image 
              source={require('YOUR_PATH_TO_DAISY_WAVING_IMAGE')} 
              style={styles.daisyImage}
              resizeMode="contain"
            /> */}
           <Image source={require('../assets/img/woman/1.png')} style={styles.daisyImage} resizeMode='stretch' />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Hi, I'm Daisy!</Text>
        <Text style={styles.body}>
          In this app, we just play together — answer questions, get to know
          each other, and see something new about each other. Ready to create a
          good mood?
        </Text>
        <Button title="CONTINUE" onPress={handleContinue} />
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
    width: 250,
    height: 300,
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

