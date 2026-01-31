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

interface MealModalProps {
  visible: boolean;
  onClose: () => void;
}

export function MealModal({ visible, onClose }: MealModalProps) {
  const { addMeal, darkMode } = useApp();
  const theme = darkMode ? colors.dark : colors.light;

  const [formData, setFormData] = useState({
    name: '',
    type: 'Breakfast',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  });

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const handleSubmit = () => {
    if (!formData.name || !formData.calories) {
      return;
    }

    addMeal({
      name: formData.name,
      type: formData.type,
      time: formData.time,
      calories: parseInt(formData.calories),
      protein: parseInt(formData.protein) || 0,
      carbs: parseInt(formData.carbs) || 0,
      fats: parseInt(formData.fats) || 0,
    });

    setFormData({
      name: '',
      type: 'Breakfast',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    });

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={[styles.modal, { backgroundColor: theme.card }]}>
          <View style={[styles.header, { borderBottomColor: theme.border }]}>
            <Text style={[styles.title, { color: theme.text }]}>Add Meal</Text>
            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: theme.muted }]}
              onPress={onClose}
            >
              <Icon name="x" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <View style={styles.field}>
              <Text style={[styles.label, { color: theme.text }]}>Meal Name</Text>
              <View style={styles.inputContainer}>
                <Icon name="coffee" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { backgroundColor: theme.muted, borderColor: theme.border, color: theme.text }]}
                  placeholder="e.g., Grilled Chicken Salad"
                  placeholderTextColor={theme.textSecondary}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: theme.text }]}>Meal Type</Text>
              <View style={styles.typeContainer}>
                {mealTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeChip,
                      {
                        backgroundColor: formData.type === type ? theme.primary : theme.muted,
                        borderColor: formData.type === type ? theme.primary : theme.border,
                      },
                    ]}
                    onPress={() => setFormData({ ...formData, type })}
                  >
                    <Text style={[styles.typeText, { color: formData.type === type ? '#ffffff' : theme.text }]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={[styles.label, { color: theme.text }]}>Calories</Text>
              <View style={styles.inputContainer}>
                <Icon name="zap" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { backgroundColor: theme.muted, borderColor: theme.border, color: theme.text }]}
                  placeholder="450"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  value={formData.calories}
                  onChangeText={(text) => setFormData({ ...formData, calories: text })}
                />
              </View>
            </View>

            <View style={styles.macrosRow}>
              <View style={styles.macroField}>
                <Text style={[styles.label, { color: theme.text }]}>Protein (g)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.muted, borderColor: theme.border, color: theme.text }]}
                  placeholder="30"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  value={formData.protein}
                  onChangeText={(text) => setFormData({ ...formData, protein: text })}
                />
              </View>

              <View style={styles.macroField}>
                <Text style={[styles.label, { color: theme.text }]}>Carbs (g)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.muted, borderColor: theme.border, color: theme.text }]}
                  placeholder="45"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  value={formData.carbs}
                  onChangeText={(text) => setFormData({ ...formData, carbs: text })}
                />
              </View>

              <View style={styles.macroField}>
                <Text style={[styles.label, { color: theme.text }]}>Fats (g)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme.muted, borderColor: theme.border, color: theme.text }]}
                  placeholder="15"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  value={formData.fats}
                  onChangeText={(text) => setFormData({ ...formData, fats: text })}
                />
              </View>
            </View>

            <Button title="Add Meal" onPress={handleSubmit} fullWidth style={styles.submitButton} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modal: { borderTopLeftRadius: borderRadius.xxl, borderTopRightRadius: borderRadius.xxl, maxHeight: '80%' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1 },
  title: { fontSize: fontSizes.xl, fontWeight: '600' },
  closeButton: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  form: { padding: spacing.lg },
  field: { marginBottom: spacing.lg },
  label: { fontSize: fontSizes.sm, fontWeight: '500', marginBottom: spacing.xs },
  inputContainer: { position: 'relative' },
  inputIcon: { position: 'absolute', left: spacing.md, top: spacing.md, zIndex: 1 },
  input: { paddingLeft: spacing.xl + spacing.md, paddingRight: spacing.md, paddingVertical: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, fontSize: fontSizes.md },
  typeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  typeChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.lg, borderWidth: 1 },
  typeText: { fontSize: fontSizes.sm, fontWeight: '500' },
  macrosRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  macroField: { flex: 1 },
  submitButton: { marginTop: spacing.md, marginBottom: spacing.xl },
});
