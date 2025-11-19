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

interface OnboardingScreen2Props {
  navigation: any;
}

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const handleNext = () => {
    navigation.navigate('Onboarding3');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.circleContainer}>
        <View style={styles.yellowCircle}>
          <View style={styles.vsContainer}>
            <Image source={require('../assets/img/woman/2.png')} style={{width: 200, height: 300}} resizeMode='stretch' />

          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>How it all works</Text>
        <Text style={styles.body}>
          Take turns answering short questions about sports, animals, and the
          world around you — it's a fun way to learn more about each other. At
          the end, a surprise wish awaits!
        </Text>
        <Button title="NEXT" onPress={handleNext} />
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
  vsContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vsText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: Colors.background,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
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

