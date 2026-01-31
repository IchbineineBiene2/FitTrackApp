import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Activity {
  id: number;
  name: string;
  type: string;
  time: string;
  calories: number;
  duration: string;
  date: string;
}

export interface Meal {
  id: number;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  type: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  streak: number;
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  deleteActivity: (id: number) => void;
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  deleteMeal: (id: number) => void;
  achievements: Achievement[];
  unlockAchievement: (id: number) => void;
  todayStats: {
    calories: number;
    steps: number;
    active: number;
    water: number;
  };
  updateTodayStats: (stats: Partial<AppContextType['todayStats']>) => void;
  addWater: () => void;
  removeWater: () => void;
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColorState] = useState('teal');
  const [streak, setStreak] = useState(5);
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, name: 'Morning Run', type: 'Running', time: '7:30 AM', calories: 320, duration: '30 min', date: '2026-01-31' },
    { id: 2, name: 'Strength Training', type: 'Strength', time: '6:00 PM', calories: 450, duration: '45 min', date: '2026-01-31' },
    { id: 3, name: 'Yoga Session', type: 'Yoga', time: '8:00 AM', calories: 180, duration: '40 min', date: '2026-01-30' },
    { id: 4, name: 'Cycling', type: 'Cycling', time: '5:30 PM', calories: 380, duration: '50 min', date: '2026-01-29' },
  ]);

  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, name: 'Oatmeal with Berries', time: '8:00 AM', calories: 320, protein: 12, carbs: 54, fats: 8, type: 'Breakfast' },
    { id: 2, name: 'Grilled Chicken Salad', time: '12:30 PM', calories: 450, protein: 38, carbs: 24, fats: 18, type: 'Lunch' },
    { id: 3, name: 'Protein Shake', time: '3:00 PM', calories: 200, protein: 25, carbs: 15, fats: 5, type: 'Snack' },
    { id: 4, name: 'Salmon with Vegetables', time: '7:00 PM', calories: 580, protein: 42, carbs: 32, fats: 28, type: 'Dinner' },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 1, title: 'First Step', description: 'Complete your first workout', icon: 'target', unlocked: true, date: '2026-01-20' },
    { id: 2, title: '5 Day Streak', description: 'Workout 5 days in a row', icon: 'zap', unlocked: true, date: '2026-01-31' },
    { id: 3, title: '10K Steps', description: 'Walk 10,000 steps in a day', icon: 'footprints', unlocked: true, date: '2026-01-28' },
    { id: 4, title: 'Early Bird', description: 'Complete a morning workout', icon: 'sunrise', unlocked: true, date: '2026-01-25' },
    { id: 5, title: 'Hydration Hero', description: 'Drink 8 cups of water', icon: 'droplets', unlocked: false },
    { id: 6, title: 'Week Warrior', description: 'Complete 7 workouts in a week', icon: 'dumbbell', unlocked: false },
    { id: 7, title: 'Calorie Crusher', description: 'Burn 1000+ calories in a day', icon: 'flame', unlocked: false },
    { id: 8, title: 'Consistency King', description: '30 day workout streak', icon: 'crown', unlocked: false },
  ]);

  const [todayStats, setTodayStats] = useState({
    calories: 1847,
    steps: 8432,
    active: 45,
    water: 6,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Load dark mode preference
  useEffect(() => {
    AsyncStorage.getItem('darkMode').then((value) => {
      if (value !== null) {
        setDarkMode(value === 'true');
      }
    });
    AsyncStorage.getItem('accentColor').then((value) => {
      if (value !== null) {
        setAccentColorState(value);
      }
    });
  }, []);

  const toggleDarkMode = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    await AsyncStorage.setItem('darkMode', String(newDarkMode));
  };

  const setAccentColor = async (color: string) => {
    setAccentColorState(color);
    await AsyncStorage.setItem('accentColor', color);
  };

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newActivity = {
      ...activity,
      id: Math.max(...activities.map((a) => a.id), 0) + 1,
    };
    setActivities([newActivity, ...activities]);

    // Update today's stats
    if (activity.date === '2026-01-31') {
      setTodayStats((prev) => ({
        ...prev,
        calories: prev.calories + activity.calories,
        active: prev.active + parseInt(activity.duration),
      }));
    }
  };

  const deleteActivity = (id: number) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal = {
      ...meal,
      id: Math.max(...meals.map((m) => m.id), 0) + 1,
    };
    setMeals([newMeal, ...meals]);
  };

  const deleteMeal = (id: number) => {
    setMeals(meals.filter((m) => m.id !== id));
  };

  const unlockAchievement = (id: number) => {
    setAchievements(
      achievements.map((a) =>
        a.id === id ? { ...a, unlocked: true, date: new Date().toISOString().split('T')[0] } : a
      )
    );
  };

  const updateTodayStats = (stats: Partial<AppContextType['todayStats']>) => {
    setTodayStats((prev) => ({ ...prev, ...stats }));
  };

  const addWater = () => {
    setTodayStats((prev) => ({ ...prev, water: prev.water + 1 }));
  };

  const removeWater = () => {
    setTodayStats((prev) => ({ ...prev, water: Math.max(prev.water - 1, 0) }));
  };

  const login = (email: string, password: string) => {
    if (email && password) {
      setUser({ name: email.split('@')[0], email });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    if (name && email && password) {
      setUser({ name, email });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        accentColor,
        setAccentColor,
        streak,
        activities,
        addActivity,
        deleteActivity,
        meals,
        addMeal,
        deleteMeal,
        achievements,
        unlockAchievement,
        todayStats,
        updateTodayStats,
        addWater,
        removeWater,
        isAuthenticated,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
