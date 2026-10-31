# Решения

- Expo SDK 57 / React Native 0.86: актуальный стабильный template и совместимые native пакеты через `expo install`.
- Expo Router: тонкие file routes в `app/`; providers вынесены из `src/app/`, чтобы не конфликтовать с routing root.
- npm и один repository: простой запуск для начинающего, без monorepo overhead.
- Zustand + AsyncStorage: небольшой локальный progress store. Чистые transitions вне store позволяют позже подключить sync.
- Local content first: один полноценный lesson, закрытые будущие модули. Никаких fake completion данных.
- Zod v1 contract: runtime validation, безопасные ссылки на ответы и готовность к внешнему авторингу.
- Reanimated + Worklets: умеренная обратная связь, без сложной character engine. Expo preset настраивает Babel plugin.
- Test renderer 1.2: совместим с React 19.2 из SDK 57; latest renderer 1.3 требует React 19.3. Lucide в Jest использует официальный CJS export.
- Branding JSON: один источник для Expo config и UI; TS config loader может импортировать JSON без отдельной transpilation вложенных TS файлов.
- Replay без новых XP, accuracy по первым попыткам: предотвращает фарм и не скрывает трудные вопросы.
- No backend/auth/payments/analytics/Rive: вне текущего scope. Redux, Nest, DI и repository interfaces пока не решают существующей задачи.

## Dependency health

Выполнен `npm audit fix` без force. В дереве SDK 57 остаются 64 advisory findings (15 moderate, 49 high, 0 critical), включая транзитивные зависимости Expo/Metro и Jest. Предлагаемые автоматические force fixes меняют major версии SDK, а часть советов предлагает откат до Expo 44; они не применены. `expo-doctor` подтверждает совместимость, но не является security audit. Перед публикацией нужно повторить audit и перейти на поддерживаемые исправленные версии SDK и инструментов, проверив приложение.
