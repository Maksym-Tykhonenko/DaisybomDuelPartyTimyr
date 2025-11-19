import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { DaisyCard } from '../daisybomComponents/DaisyCard';
import { Card } from '../daisybomComponents/Card';
import { Button } from '../daisybomComponents/Button';
import { DAISY_MESSAGES } from '../daisybomConstants/gameData';

interface AboutScreenProps {
  navigation: any;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleShare = async () => {
    const shareMessage = `🎮 Daisybom: Duel Party 🎮\n\nAn offline game for two, created to amuse and bring people closer together.\n\nChoose a category - sports, animals or dancing - and complete funny tasks live.\n\nStand on one leg, jump like a frog or dance to imaginary music - everything is simple, friendly and fun.\n\nAfter each duel - a surprise wish that you can choose or come up with yourself.\n\nDownload and play now!`;

    try {
      await Share.share({
        message: shareMessage,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>ABOUT</Text>

        <DaisyCard message={DAISY_MESSAGES.about} />

        <Card>
          <Text style={styles.appName}>Daisybom: Duel Party</Text>
          <Text style={styles.description}>
            Daisybom: Duel Party is an offline game for two, created to amuse
            and bring people closer together.
          </Text>
          <Text style={styles.description}>
            Choose a category - sports, animals or dancing - and complete funny
            tasks live.
          </Text>
          <Text style={styles.description}>
            Stand on one leg, jump like a frog or dance to imaginary music -
            everything is simple, friendly and fun.
          </Text>
          <Text style={styles.description}>
            After each duel - a surprise wish that you can choose or come up
            with yourself.
          </Text>
        </Card>

        <Button title="SHARE APP" onPress={handleShare} />
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: 12,
  },
});

