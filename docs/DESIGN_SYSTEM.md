# Design system

Midnight navy + warm gold. Основные цвета централизованы в `src/shared/theme/index.ts`.

| Токен                           | Значение          |
| ------------------------------- | ----------------- |
| background                      | #071420           |
| backgroundElevated              | #0E2232           |
| surface / surfaceElevated       | #10293A / #17384D |
| border                          | #2A506A           |
| primaryGold / primaryGoldStrong | #F4C665 / #FFD77A |
| secondaryBlue                   | #58A6D8           |
| textPrimary / textSecondary     | #F7F4EC / #A9BDCA |
| textMuted                       | #728B9C           |
| success / error                 | #70D69B / #FF6674 |
| warning                         | #F2AD4C           |

Spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Radius: 8, 12, 16, 20, 24, 28, full. Typography: системный шрифт, 12/16/22/30/38; основной текст 16 с line-height 24. Заголовки off-white, второстепенный текст slate, золото — действие/акцент. Зелёный только в success feedback.

UI kit: AppScreen, AppText, Primary/Secondary/IconButton, Card, LessonCard, ProgressBar, ExerciseOption, FeedbackCard, XP/StreakBadge, SectionHeader, LoadingState, EmptyState. Состояния disabled/pressed/selected и correct/incorrect визуально различаются. Ошибка объясняет, не обвиняет.

Mobile-first: Safe Area, flex, scroll для длинного контента, закреплённая action area в player и KeyboardAvoidingView на iOS. Web центрируется до 430px. Основная верстка без абсолютных координат. Touch targets минимум 48px, exercise options и CTA минимум 56px. Font scaling не отключён.

Motion: короткое уменьшение кнопки, плавный progress, появление feedback, мягкий shake при ошибке и появление результата. Haptics no-op на web. Арт API: ModuleArtwork, Mascot(state), Character(character,state); текущие геометрические placeholders заменяются внутри widgets без изменения экранов. Assets зарезервированы по категориям, несуществующих imports нет.
