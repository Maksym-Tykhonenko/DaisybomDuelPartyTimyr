import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../daisybomConstants/colors';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      {/* Curved top border using SVG */}
      <View style={styles.curveContainer}>
        <Svg
          style={styles.curve}
          width="100%"
          height="25"
          viewBox="0 0 100 25"
          preserveAspectRatio="none"
        >
          {/* Background shape */}
          <Path
            d="M 0 25 Q 50 8 100 25 L 100 25 L 0 25 Z"
            fill={Colors.cardBackground}
          />
          {/* Top border curve */}
          <Path
            d="M 0 25 Q 50 8 100 25"
            fill="none"
            stroke={Colors.border}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Svg>
      </View>

      {/* Tab bar content */}
      <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Icon mapping
          const getIcon = () => {
            if (route.name === 'HomeTab') return <Image source={require('../assets/img/home.png')} style={{width: 30, height: 30}} resizeMode='contain' />;
            if (route.name === 'SettingsTab') return <Image source={require('../assets/img/settings.png')} style={{width: 30, height: 30}} resizeMode='contain' />;
            if (route.name === 'AboutTab') return <Image source={require('../assets/img/info.png')} style={{width: 30, height: 30}} resizeMode='contain' />;
            return '•';
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              {isFocused ? (
                <View style={styles.activeIconContainer}>
                  <Text style={styles.activeIcon}>{getIcon()}</Text>
                </View>
              ) : (
                <Text style={styles.inactiveIcon}>{getIcon()}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Home indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
  },
  curveContainer: {
    height: 25,
    overflow: 'hidden',
  },
  curve: {
    width: '100%',
    height: 25,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 20,
    minHeight: 70,
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  activeIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    fontSize: 26,
  },
  inactiveIcon: {
    fontSize: 30,
    color: Colors.primary,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
});

