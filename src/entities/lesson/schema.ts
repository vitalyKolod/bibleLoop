import { z } from 'zod';
const text = z.string().trim().min(1);
const common = {
  id: text,
  title: text.optional(),
  explanation: text.optional(),
  reference: text.optional(),
  hint: text.optional(),
};
const item = z.object({ id: text, label: text });
const items = z
  .array(item)
  .min(2)
  .refine(
    (values) => new Set(values.map((v) => v.id)).size === values.length,
    'Item IDs must be unique',
  );
const story = z.object({
  ...common,
  type: z.literal('story'),
  body: text,
  character: z.enum(['abraham', 'moses', 'david', 'jesus', 'paul']).optional(),
});
const info = z.object({ ...common, type: z.literal('info'), body: text });
const multiple = z
  .object({
    ...common,
    type: z.literal('multiple_choice'),
    prompt: text,
    options: items,
    correctOptionId: text,
  })
  .refine((s) => s.options.some((o) => o.id === s.correctOptionId), 'Correct option must exist');
const words = z
  .object({
    ...common,
    type: z.literal('word_bank'),
    prompt: text,
    words: items,
    correctWordIds: z.array(text).min(1),
  })
  .refine(
    (s) =>
      new Set(s.correctWordIds).size === s.correctWordIds.length &&
      s.correctWordIds.every((id) => s.words.some((w) => w.id === id)),
    'Correct words must exist and be unique',
  );
const input = z.object({
  ...common,
  type: z.literal('text_input'),
  prompt: text,
  correctAnswers: z.array(text).min(1),
});
const order = z
  .object({
    ...common,
    type: z.literal('order_items'),
    prompt: text,
    items,
    correctOrder: z.array(text).min(2),
  })
  .refine(
    (s) =>
      s.correctOrder.length === s.items.length &&
      new Set(s.correctOrder).size === s.items.length &&
      s.correctOrder.every((id) => s.items.some((i) => i.id === id)),
    'Order must be a permutation of items',
  );
const match = z
  .object({
    ...common,
    type: z.literal('match_pairs'),
    prompt: text,
    pairs: z.array(z.object({ id: text, left: text, right: text })).min(2),
  })
  .refine(
    (s) => new Set(s.pairs.map((p) => p.id)).size === s.pairs.length,
    'Pair IDs must be unique',
  );
export const lessonStepSchema = z.discriminatedUnion('type', [
  story,
  info,
  multiple,
  words,
  input,
  order,
  match,
]);
export const lessonSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: text,
    courseId: text,
    title: text,
    description: text,
    estimatedMinutes: z.number().int().positive(),
    xpReward: z.number().int().nonnegative(),
    steps: z.array(lessonStepSchema).min(1),
  })
  .refine(
    (l) => new Set(l.steps.map((s) => s.id)).size === l.steps.length,
    'Step IDs must be unique',
  );
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonStep = z.infer<typeof lessonStepSchema>;
export type ExerciseStep = Exclude<LessonStep, { type: 'story' | 'info' }>;
export function parseLesson(content: unknown): Lesson {
  const result = lessonSchema.safeParse(content);
  if (!result.success)
    throw new Error(
      `Invalid lesson content: ${result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`,
    );
  return result.data;
}
