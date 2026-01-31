import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Animated, { FadeInDown, FadeInUp, FadeInLeft } from 'react-native-reanimated';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, fontSizes } from '../utils/theme';
import { Card } from '../components/Card';
import { Progress } from '../components/Progress';
import { CircularProgress } from '../components/CircularProgress';
import { ActivityModal } from '../components/ActivityModal';
import { MainTabScreenProps } from '../types/navigation';

export function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { todayStats, streak, activities, addWater, removeWater, darkMode } = useApp();
  const theme = darkMode ? colors.dark : colors.light;
  const [activityModalVisible, setActivityModalVisible] = useState(false);

  const stats = [
    {
      id: 1,
      label: 'Calories',
      value: todayStats.calories,
      goal: 2200,
      unit: 'kcal',
      icon: 'activity',
      progress: (todayStats.calories / 2200) * 100,
    },
    {
      id: 2,
      label: 'Steps',
      value: todayStats.steps,
      goal: 10000,
      unit: 'steps',
      icon: 'target',
      progress: (todayStats.steps / 10000) * 100,
    },
    {
      id: 3,
      label: 'Active',
      value: todayStats.active,
      goal: 60,
      unit: 'min',
      icon: 'clock',
      progress: (todayStats.active / 60) * 100,
    },
    {
      id: 4,
      label: 'Water',
      value: todayStats.water,
      goal: 8,
      unit: 'cups',
      icon: 'droplet',
      progress: (todayStats.water / 8) * 100,
    },
  ];

  const todayActivities = activities.filter((a) => a.date === '2026-01-31');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View
          entering={FadeInUp.duration(500)}
          style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}
        >
          <View>
            <Text style={[styles.headerTitle, { color: theme.text }]}>FitTrack</Text>
            <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
              Saturday, January 31
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: '#09090b' }]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="user" size={20} color="#ffffff" />
          </TouchableOpacity>
        </Animated.View>

        {/* Streak Banner */}
        {streak > 0 && (
          <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.section}>
            <View style={[styles.streakBanner, { backgroundColor: theme.primary }]}>
              <View style={styles.streakIconContainer}>
                <Icon name="zap" size={28} color="#ffffff" />
              </View>
              <View style={styles.streakContent}>
                <Text style={styles.streakTitle}>{streak} Day Streak!</Text>
                <Text style={styles.streakSubtitle}>Keep up the great work</Text>
              </View>
              <Icon name="award" size={24} color="rgba(255,255,255,0.8)" />
            </View>
          </Animated.View>
        )}

        {/* Daily Progress - Circular */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.section}>
          <Card>
            <View style={styles.dailyProgressHeader}>
              <Icon name="trending-up" size={20} color={theme.primary} />
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Daily Progress</Text>
            </View>
            <View style={styles.circularProgressContainer}>
              <CircularProgress value={(todayStats.calories / 2200) * 100} size={160} strokeWidth={14} />
            </View>
            <View style={styles.dailyProgressStats}>
              <Text style={[styles.dailyProgressValue, { color: theme.text }]}>
                {todayStats.calories}{' '}
                <Text style={[styles.dailyProgressGoal, { color: theme.textSecondary }]}>
                  / 2200
                </Text>
              </Text>
              <Text style={[styles.dailyProgressLabel, { color: theme.textSecondary }]}>
                kcal burned today
              </Text>
            </View>
          </Card>
        </Animated.View>

        {/* Stats Grid */}
        <View style={styles.section}>
          {stats.map((stat, index) => {
            const isWater = stat.label === 'Water';
            return (
              <Animated.View
                key={stat.id}
                entering={FadeInLeft.delay(400 + index * 100).duration(500)}
                style={styles.statCard}
              >
                <Card>
                  <View style={styles.statHeader}>
                    <View style={[styles.statIconContainer, { backgroundColor: `${theme.primary}20` }]}>
                      <Icon name={stat.icon} size={24} color={theme.primary} />
                    </View>
                    <View style={styles.statContent}>
                      <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                        {stat.label}
                      </Text>
                      <Text style={[styles.statValue, { color: theme.text }]}>
                        {stat.value}{' '}
                        <Text style={[styles.statGoal, { color: theme.textSecondary }]}>
                          / {stat.goal}
                        </Text>
                      </Text>
                      {isWater && (
                        <Text style={[styles.waterMl, { color: theme.textSecondary }]}>
                          {stat.value * 250}ml / {stat.goal * 250}ml
                        </Text>
                      )}
                    </View>
                    {isWater && (
                      <View style={styles.waterButtons}>
                        <TouchableOpacity
                          onPress={removeWater}
                          disabled={todayStats.water === 0}
                          style={[
                            styles.waterButton,
                            { backgroundColor: `${theme.destructive}20` },
                          ]}
                        >
                          <Icon name="minus" size={16} color={theme.destructive} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={addWater}
                          style={[styles.waterButton, { backgroundColor: `${theme.primary}20` }]}
                        >
                          <Icon name="plus" size={16} color={theme.primary} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <View style={styles.progressContainer}>
                    <Progress value={stat.progress} height={6} />
                  </View>
                </Card>
              </Animated.View>
            );
          })}
        </View>

        {/* Today's Activities */}
        <View style={styles.section}>
          <View style={styles.todayHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Today</Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.text }]}
              onPress={() => setActivityModalVisible(true)}
            >
              <Icon name="plus" size={20} color={theme.background} />
            </TouchableOpacity>
          </View>

          {todayActivities.map((activity, index) => (
            <Animated.View
              key={activity.id}
              entering={FadeInDown.delay(700 + index * 100).duration(500)}
              style={styles.activityCard}
            >
              <Card>
                <View style={styles.activityContent}>
                  <View>
                    <Text style={[styles.activityName, { color: theme.text }]}>
                      {activity.name}
                    </Text>
                    <Text style={[styles.activityTime, { color: theme.textSecondary }]}>
                      {activity.time}
                    </Text>
                  </View>
                  <View style={styles.activityStats}>
                    <Text style={[styles.activityCalories, { color: theme.text }]}>
                      {activity.calories} cal
                    </Text>
                    <Text style={[styles.activityDuration, { color: theme.textSecondary }]}>
                      {activity.duration}
                    </Text>
                  </View>
                </View>
              </Card>
            </Animated.View>
          ))}
        </View>

        {/* Weekly Summary */}
        <Animated.View
          entering={FadeInDown.delay(900).duration(500)}
          style={[styles.section, { marginBottom: spacing.xxl }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text, marginBottom: spacing.md }]}>
            This Week
          </Text>
          <Card>
            <View style={styles.weeklyGrid}>
              <View style={styles.weeklyItem}>
                <Text style={[styles.weeklyValue, { color: theme.text }]}>12</Text>
                <Text style={[styles.weeklyLabel, { color: theme.textSecondary }]}>
                  Workouts
                </Text>
              </View>
              <View style={styles.weeklyItem}>
                <Text style={[styles.weeklyValue, { color: theme.text }]}>8.5h</Text>
                <Text style={[styles.weeklyLabel, { color: theme.textSecondary }]}>Active</Text>
              </View>
              <View style={styles.weeklyItem}>
                <Text style={[styles.weeklyValue, { color: theme.text }]}>4.2k</Text>
                <Text style={[styles.weeklyLabel, { color: theme.textSecondary }]}>
                  Calories
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>
      </ScrollView>

      {/* Activity Modal */}
      <ActivityModal
        visible={activityModalVisible}
        onClose={() => setActivityModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomLeftRadius: borderRadius.xxl,
    borderBottomRightRadius: borderRadius.xxl,
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    marginTop: 2,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  streakBanner: {
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  streakTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: '#ffffff',
  },
  streakSubtitle: {
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  dailyProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
  },
  circularProgressContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dailyProgressStats: {
    alignItems: 'center',
  },
  dailyProgressValue: {
    fontSize: fontSizes.xxl,
    fontWeight: '600',
  },
  dailyProgressGoal: {
    fontSize: fontSizes.md,
  },
  dailyProgressLabel: {
    fontSize: fontSizes.sm,
    marginTop: 4,
  },
  statCard: {
    marginBottom: spacing.md,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: fontSizes.sm,
    marginBottom: 4,
  },
  statValue: {
    fontSize: fontSizes.xxl,
    fontWeight: '600',
  },
  statGoal: {
    fontSize: fontSizes.sm,
  },
  waterMl: {
    fontSize: fontSizes.xs,
    marginTop: 4,
  },
  waterButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  waterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    marginTop: spacing.xs,
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityCard: {
    marginBottom: spacing.md,
  },
  activityContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityName: {
    fontSize: fontSizes.md,
    fontWeight: '500',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: fontSizes.sm,
  },
  activityStats: {
    alignItems: 'flex-end',
  },
  activityCalories: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDuration: {
    fontSize: fontSizes.sm,
  },
  weeklyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weeklyItem: {
    alignItems: 'center',
  },
  weeklyValue: {
    fontSize: fontSizes.xxxl,
    fontWeight: '600',
    marginBottom: 4,
  },
  weeklyLabel: {
    fontSize: fontSizes.sm,
  },
});
