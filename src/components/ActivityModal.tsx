import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, fontSizes } from '../utils/theme';
import { Button } from './Button';

interface ActivityModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ActivityModal({ visible, onClose }: ActivityModalProps) {
  const { addActivity, darkMode } = useApp();
  const theme = darkMode ? colors.dark : colors.light;

  const [formData, setFormData] = useState({
    name: '',
    type: 'Running',
    duration: '',
    calories: '',
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  });

  const activityTypes = [
    'Running',
    'Cycling',
    'Swimming',
    'Strength',
    'Yoga',
    'Walking',
    'HIIT',
    'Dancing',
    'Boxing',
    'Pilates',
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.duration || !formData.calories) {
      return;
    }

    addActivity({
      name: formData.name,
      type: formData.type,
      time: formData.time,
      calories: parseInt(formData.calories),
      duration: `${formData.duration} min`,
      date: new Date().toISOString().split('T')[0],
    });

    // Reset form
    setFormData({
      name: '',
      type: 'Running',
      duration: '',
      calories: '',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    });

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.modal, { backgroundColor: theme.card }]}>
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>Add Activity</Text>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: theme.muted }]}
              onPress={onClose}
            >
              <Icon name="x" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            {/* Activity Name */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: theme.text }]}>Activity Name</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="activity"
                  size={20}
                  color={theme.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: theme.muted, borderColor: theme.border, color: theme.text },
                  ]}
                  placeholder="e.g., Morning Run"
                  placeholderTextColor={theme.textSecondary}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>
            </View>

            {/* Activity Type */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: theme.text }]}>Type</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.typeContainer}>
                  {activityTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeChip,
                        {
                          backgroundColor:
                            formData.type === type ? theme.primary : theme.muted,
                          borderColor: formData.type === type ? theme.primary : theme.border,
                        },
                      ]}
                      onPress={() => setFormData({ ...formData, type })}
                    >
                      <Text
                        style={[
                          styles.typeText,
                          {
                            color: formData.type === type ? '#ffffff' : theme.text,
                          },
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Duration */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: theme.text }]}>Duration (minutes)</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="clock"
                  size={20}
                  color={theme.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: theme.muted, borderColor: theme.border, color: theme.text },
                  ]}
                  placeholder="30"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  value={formData.duration}
                  onChangeText={(text) => setFormData({ ...formData, duration: text })}
                />
              </View>
            </View>

            {/* Calories */}
            <View style={styles.field}>
              <Text style={[styles.label, { color: theme.text }]}>Calories Burned</Text>
              <View style={styles.inputContainer}>
                <Icon
                  name="zap"
                  size={20}
                  color={theme.textSecondary}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: theme.muted, borderColor: theme.border, color: theme.text },
                  ]}
                  placeholder="320"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  value={formData.calories}
                  onChangeText={(text) => setFormData({ ...formData, calories: text })}
                />
              </View>
            </View>

            {/* Submit Button */}
            <Button
              title="Add Activity"
              onPress={handleSubmit}
              fullWidth
              style={styles.submitButton}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: '600',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: spacing.lg,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  inputContainer: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md,
    zIndex: 1,
  },
  input: {
    paddingLeft: spacing.xl + spacing.md,
    paddingRight: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    fontSize: fontSizes.md,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  typeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  typeText: {
    fontSize: fontSizes.sm,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
