import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';
import { DaisyCard } from '../daisybomComponents/DaisyCard';
import { Card } from '../daisybomComponents/Card';
import { Input } from '../daisybomComponents/Input';
import { Button } from '../daisybomComponents/Button';
import { WISHES, DAISY_MESSAGES } from '../daisybomConstants/gameData';
import { Wish } from '../daisybomTypes';

interface WishListScreenProps {
  navigation: any;
  route: any;
}

export const WishListScreen: React.FC<WishListScreenProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [customWish, setCustomWish] = useState('');

  const handleWishSelect = (wish: Wish) => {
    setSelectedWish(wish);
    setCustomWish('');
  };

  const handleCustomWish = () => {
    if (customWish.trim()) {
      // Handle custom wish
      navigation.navigate('Home');
    }
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
        <Text style={styles.title}>WISH LIST</Text>

        <DaisyCard message={DAISY_MESSAGES.wishlist} />

        <Card>
          <Text style={styles.sectionTitle}>Choose from list:</Text>
          {WISHES.map((wish) => (
            <TouchableOpacity
              key={wish.id}
              style={[
                styles.wishItem,
                selectedWish?.id === wish.id && styles.wishItemSelected,
              ]}
              onPress={() => handleWishSelect(wish)}
            >
              <Text style={styles.wishText}>{wish.text}</Text>
              {wish.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>D</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Or create your own:</Text>
          <Input
            placeholder="Write your wish..."
            value={customWish}
            onChangeText={setCustomWish}
            multiline
            style={styles.customInput}
          />
          <Button
            title="SAVE CUSTOM WISH"
            onPress={handleCustomWish}
            variant="secondary"
          />
        </Card>

        {selectedWish && (
          <Button
            title="CONFIRM WISH"
            onPress={() => navigation.navigate('MainTabs', { screen: 'HomeTab' })}
          />
        )}

        
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
    width: 44,
    height: 44,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 20,
    color: Colors.text,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  wishItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 16,
    marginVertical: 8,
    position: 'relative',
    minHeight: 60,
  },
  wishItemSelected: {
    borderColor: Colors.success,
    backgroundColor: '#1a3a1a',
  },
  wishText: {
    color: Colors.text,
    fontSize: 16,
    lineHeight: 22,
    paddingRight: 40,
  },
  defaultBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 18,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultBadgeText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  customInput: {
    minHeight: 100,
    textAlignVertical: 'top',
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

