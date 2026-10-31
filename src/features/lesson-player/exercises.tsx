import { useState } from 'react';
import { TextInput, View } from 'react-native';
import type { Answer } from '../../entities/lesson/evaluate';
import type { LessonStep } from '../../entities/lesson/schema';
import { AppText, ExerciseOption, SecondaryButton, styles } from '../../shared/ui';
import { colors, radius, spacing } from '../../shared/theme';
import { Character } from '../../widgets/mascot';
type StepOf<T extends LessonStep['type']> = Extract<LessonStep, { type: T }>;
type ExerciseProps<T extends LessonStep['type']> = {
  step: StepOf<T>;
  answer: Answer;
  onChange: (answer: Answer) => void;
  disabled: boolean;
  feedback?: boolean | null;
};
export function StoryStepView({ step }: { step: StepOf<'story'> }) {
  return (
    <View style={{ gap: spacing.xxl }}>
      {step.character && <Character character={step.character} state="idle" />}
      <AppText style={{ fontSize: 20, lineHeight: 32 }}>{step.body}</AppText>
    </View>
  );
}
export function InfoStepView({ step }: { step: StepOf<'info'> }) {
  return (
    <View style={{ gap: spacing.xxl }}>
      <AppText style={styles.eyebrow}>ЗАМЕТКА НА ПОЛЯХ</AppText>
      <AppText style={{ fontSize: 20, lineHeight: 32 }}>{step.body}</AppText>
    </View>
  );
}
export function MultipleChoiceExercise({
  step,
  answer,
  onChange,
  disabled,
  feedback,
}: ExerciseProps<'multiple_choice'>) {
  return (
    <View style={{ gap: spacing.md }}>
      {step.options.map((o) => (
        <ExerciseOption
          key={o.id}
          label={o.label}
          state={
            answer === o.id
              ? feedback === true
                ? 'correct'
                : feedback === false
                  ? 'incorrect'
                  : 'selected'
              : 'default'
          }
          disabled={disabled}
          onPress={() => onChange(o.id)}
        />
      ))}
    </View>
  );
}
export function WordBankExercise({ step, answer, onChange, disabled }: ExerciseProps<'word_bank'>) {
  const selected = Array.isArray(answer) ? answer : [];
  const toggle = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((v) => v !== id) : [...selected, id]);
  return (
    <View style={{ gap: spacing.md }}>
      <AppText style={styles.muted}>
        Выберите слова по порядку. Нажмите ещё раз, чтобы убрать.
      </AppText>
      {selected.length > 0 && (
        <AppText style={{ color: colors.primaryGold }}>
          {selected.map((id) => step.words.find((w) => w.id === id)?.label).join(' ')}
        </AppText>
      )}
      {step.words.map((w) => (
        <ExerciseOption
          key={w.id}
          label={w.label}
          disabled={disabled}
          state={selected.includes(w.id) ? 'selected' : 'default'}
          onPress={() => toggle(w.id)}
        />
      ))}
    </View>
  );
}
export function TextInputExercise({
  step,
  answer,
  onChange,
  disabled,
}: ExerciseProps<'text_input'>) {
  return (
    <View style={{ gap: spacing.md }}>
      <TextInput
        accessibilityLabel={step.prompt}
        value={typeof answer === 'string' ? answer : ''}
        onChangeText={onChange}
        editable={!disabled}
        autoCapitalize="sentences"
        autoCorrect={false}
        placeholder="Ваш ответ"
        placeholderTextColor={colors.textMuted}
        style={{
          minHeight: 56,
          borderRadius: radius.lg,
          borderColor: colors.border,
          borderWidth: 1,
          color: colors.textPrimary,
          backgroundColor: colors.surface,
          fontSize: 18,
          padding: spacing.lg,
        }}
      />
      {step.hint && <AppText style={styles.muted}>{step.hint}</AppText>}
    </View>
  );
}
export function OrderItemsExercise({
  step,
  answer,
  onChange,
  disabled,
}: ExerciseProps<'order_items'>) {
  const selected = Array.isArray(answer) ? answer : [];
  const ordered = [
    ...selected,
    ...step.items.map((i) => i.id).filter((id) => !selected.includes(id)),
  ];
  return (
    <View style={{ gap: spacing.md }}>
      <AppText style={styles.muted}>Нажимайте события в нужном порядке.</AppText>
      {ordered.map((id) => {
        const item = step.items.find((i) => i.id === id);
        const index = selected.indexOf(id);
        return (
          <ExerciseOption
            key={id}
            label={`${index >= 0 ? `${index + 1}. ` : ''}${item?.label}`}
            disabled={disabled}
            state={index >= 0 ? 'selected' : 'default'}
            onPress={() =>
              onChange(index >= 0 ? selected.filter((v) => v !== id) : [...selected, id])
            }
          />
        );
      })}
      <SecondaryButton
        label="СБРОСИТЬ ПОРЯДОК"
        disabled={disabled || selected.length === 0}
        onPress={() => onChange([])}
      />
    </View>
  );
}
export function MatchPairsExercise({
  step,
  answer,
  onChange,
  disabled,
}: ExerciseProps<'match_pairs'>) {
  const [active, setActive] = useState<string | null>(null);
  const values = typeof answer === 'object' && !Array.isArray(answer) ? answer : {};
  const right = [...step.pairs].reverse();
  function selectRight(id: string) {
    if (!active) return;
    const next = Object.fromEntries(
      Object.entries(values).filter(([left, value]) => left !== active && value !== id),
    );
    onChange({ ...next, [active]: id });
    setActive(null);
  }
  return (
    <View style={{ gap: spacing.md }}>
      <AppText style={styles.muted}>
        Выберите понятие слева, затем значение справа. Пары можно изменить.
      </AppText>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        <View style={{ flex: 1, gap: spacing.sm }}>
          {step.pairs.map((p) => (
            <ExerciseOption
              key={p.id}
              label={p.left}
              state={active === p.id || values[p.id] ? 'selected' : 'default'}
              disabled={disabled}
              onPress={() => setActive(p.id)}
            />
          ))}
        </View>
        <View style={{ flex: 1, gap: spacing.sm }}>
          {right.map((p) => (
            <ExerciseOption
              key={p.id}
              label={p.right}
              state={Object.values(values).includes(p.id) ? 'selected' : 'default'}
              disabled={disabled || !active}
              onPress={() => selectRight(p.id)}
            />
          ))}
        </View>
      </View>
      {step.pairs
        .filter((p) => values[p.id])
        .map((p) => (
          <AppText key={p.id} style={{ fontSize: 12, color: colors.primaryGold }}>
            {p.left} → {step.pairs.find((r) => r.id === values[p.id])?.right}
          </AppText>
        ))}
    </View>
  );
}
