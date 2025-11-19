import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { DaisyCard } from '../daisybomComponents/DaisyCard';
import { Button } from '../daisybomComponents/Button';
import { Category } from '../daisybomTypes';
import { DAISY_MESSAGES } from '../daisybomConstants/gameData';
import { Storage } from '../daisybomUtils/storage';

interface ChooseCategoryScreenProps {
  navigation: any;
}

export const ChooseCategoryScreen: React.FC<ChooseCategoryScreenProps> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    checkVibration();
  }, []);

  const checkVibration = async () => {
    const settings = await Storage.getSettings();
    if (settings?.vibrationEnabled) {
      Vibration.vibrate(100);
    }
  };

  const handleCategorySelect = (category: Category) => {
    navigation.navigate('Round', {
      category,
      round: 1,
      results: [],
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>CHOOSE A CATEGORY</Text>

        <DaisyCard message={DAISY_MESSAGES.chooseCategory} />

        <Button
          title="SPORT"
          onPress={() => handleCategorySelect('sport')}
          style={styles.categoryButton}
        />
        <Button
          title="ANIMALS"
          onPress={() => handleCategorySelect('animals')}
          style={styles.categoryButton}
        />
        <Button
          title="DANCE"
          onPress={() => handleCategorySelect('dance')}
          style={styles.categoryButton}
        />

        
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
    paddingBottom: 100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.text,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  categoryButton: {
    marginVertical: 12,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navButton: {
    padding: 8,
  },
  navIcon: {
    fontSize: 24,
    color: Colors.primary,
  },
});

