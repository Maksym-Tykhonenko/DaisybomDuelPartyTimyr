import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { Button } from '../daisybomComponents/Button';

interface OnboardingScreen4Props {
  navigation: any;
}

export const OnboardingScreen4: React.FC<OnboardingScreen4Props> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const handleOkay = () => {
    navigation.replace('MainTabs');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.circleContainer}>
        <View style={styles.yellowCircle}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/img/logo.png')} style={styles.logoImage} resizeMode="contain" />

          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.body}>
          Daisybom: Duel Party does not collect any data. All photos, names
          and results are stored only on your device. The app works completely
          offline and does not share information with third parties.
        </Text>
        <Button title="OKAY" onPress={handleOkay} />
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
  logoContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInnerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  smileLine: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  logoSubtext: {
    fontSize: 12,
    color: Colors.text,
    letterSpacing: 2,
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
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

