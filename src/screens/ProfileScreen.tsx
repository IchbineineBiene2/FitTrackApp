import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useApp } from '../context/AppContext';
import { colors, spacing, fontSizes, borderRadius } from '../utils/theme';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export function ProfileScreen() {
  const { darkMode, user, logout, toggleDarkMode } = useApp();
  const theme = darkMode ? colors.dark : colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>Profile</Text>

          <Card style={styles.card}>
            <View style={styles.profileHeader}>
              <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                <Icon name="user" size={32} color="#ffffff" />
              </View>
              <Text style={[styles.name, { color: theme.text }]}>{user?.name || 'User'}</Text>
              <Text style={[styles.email, { color: theme.textSecondary }]}>
                {user?.email || 'user@example.com'}
              </Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={toggleDarkMode}
            >
              <Icon name="moon" size={20} color={theme.text} />
              <Text style={[styles.settingText, { color: theme.text }]}>Dark Mode</Text>
              <Icon
                name={darkMode ? 'toggle-right' : 'toggle-left'}
                size={24}
                color={darkMode ? theme.primary : theme.textSecondary}
              />
            </TouchableOpacity>
          </Card>

          <Button
            title="Sign Out"
            variant="outline"
            onPress={logout}
            fullWidth
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  name: {
    fontSize: fontSizes.xl,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: fontSizes.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  settingText: {
    flex: 1,
    fontSize: fontSizes.md,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: spacing.lg,
  },
});
