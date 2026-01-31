import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, fontSizes } from '../utils/theme';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export function AchievementBadge({ title, description, icon, unlocked, date }: AchievementBadgeProps) {
  const { darkMode } = useApp();
  const theme = darkMode ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: unlocked ? theme.card : theme.muted,
          borderColor: unlocked ? theme.primary : theme.border,
          opacity: unlocked ? 1 : 0.6,
        },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: unlocked ? theme.primary : theme.textSecondary }]}>
        <Icon name={icon} size={24} color="#ffffff" />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>{description}</Text>
        {unlocked && date && (
          <Text style={[styles.date, { color: theme.primary }]}>Unlocked {date}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    fontSize: fontSizes.sm,
  },
  date: {
    fontSize: fontSizes.xs,
    marginTop: 4,
    fontWeight: '500',
  },
});
