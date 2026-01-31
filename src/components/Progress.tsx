import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors, borderRadius } from '../utils/theme';

interface ProgressProps {
  value: number; // 0-100
  height?: number;
}

export function Progress({ value, height = 6 }: ProgressProps) {
  const { darkMode } = useApp();
  const theme = darkMode ? colors.dark : colors.light;

  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor: theme.muted,
        },
      ]}
    >
      <View
        style={[
          styles.progress,
          {
            width: `${clampedValue}%`,
            backgroundColor: theme.primary,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
});
