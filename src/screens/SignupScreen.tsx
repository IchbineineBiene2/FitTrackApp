import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useApp } from '../context/AppContext';
import { AuthStackScreenProps } from '../types/navigation';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors, spacing, borderRadius, fontSizes } from '../utils/theme';

export function SignupScreen({ navigation }: AuthStackScreenProps<'Signup'>) {
  const { signup, darkMode } = useApp();
  const theme = darkMode ? colors.dark : colors.light;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const success = signup(name, email, password);
      setLoading(false);

      if (success) {
        // Navigation will happen automatically
      }
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <Animated.View entering={FadeInUp.duration(600)} style={styles.header}>
            <LinearGradient
              colors={[theme.primary, theme.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoContainer}
            >
              <Icon name="zap" size={36} color="#ffffff" />
            </LinearGradient>
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Start your fitness journey today
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.formContainer}
          >
            <View style={[styles.form, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.inputContainer}>
                <Input
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
                <Icon name="user" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              </View>

              <View style={styles.inputContainer}>
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Icon name="mail" size={20} color={theme.textSecondary} style={styles.inputIcon} />
              </View>

              <View style={styles.inputContainer}>
                <Input
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Icon name="lock" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <Button
                title="Sign Up"
                onPress={handleSignup}
                loading={loading}
                fullWidth
                style={styles.signupButton}
              />

              <View style={styles.loginContainer}>
                <Text style={[styles.loginText, { color: theme.textSecondary }]}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.loginLink, { color: theme.primary }]}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSizes.md,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  form: {
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    borderWidth: 1,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  inputIcon: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md + 2,
  },
  eyeIcon: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md + 2,
  },
  signupButton: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: fontSizes.sm,
  },
  loginLink: {
    fontSize: fontSizes.sm,
    fontWeight: '600',
  },
});
