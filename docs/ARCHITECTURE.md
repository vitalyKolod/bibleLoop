# Архитектура

Один Expo application repository. `app/` содержит маршруты и настройки Stack/Tabs, без доменных правил. Экраны находятся в `src/screens/`, композируют widgets и features. `src/providers/` связывает hydration и Safe Area; `src/app/` намеренно отсутствует, потому что Router предпочитает её папке `app/`.

Направление зависимостей: routes → screens → widgets / features → entities / shared. Content → entities. Shared никогда не импортирует features; entities не импортируют React, React Native, навигацию или хранилище.

- `entities/lesson`: versioned Zod contracts и чистая проверка ответов.
- `entities/progress`: неизменяемые переходы, календарная дата, streak и награды.
- `features/lesson-player`: состояние ответа и feedback, переходы между шагами.
- `features/learning-progress`: небольшой Zustand store, AsyncStorage adapter и hydration. Ответ не записывается в JSX.
- `widgets`: карта пути, заголовок урока, mascot и artwork API.
- `shared`: UI, theme, branding и безопасные haptics.
- `content`: локальные данные курса/урока, валидируемые до использования.

Хранятся только необходимые данные. UI подписывается на небольшие срезы store. Текущий ответ и feedback локальны в player; при выходе текущий шаг сохраняется, ввод на незавершённом шаге вводится заново. Первые попытки учитываются один раз по step ID, XP — один раз по lesson ID. Ошибочные step IDs сохраняются для будущего review.

Будущий API можно подключить на границе загрузки content и persistence, сохранив schema и чистые функции. Backend/admin смогут использовать contracts без React Native зависимостей. Repository/DI framework пока не нужны. Для нового формата сохранений надо поднять persist version и явно добавить migration.

Брендинг централизован в `shared/config/branding.json`; имя папки не используется в продукте. Storage key `learning-progress` не зависит от бренда.

Сохранения валидируются отдельной Zod schema перед merge. Некорректные данные заменяются начальным состоянием с предупреждением. Ошибка записи не вызывает unhandled rejection; UI сообщает, что сохранение недоступно.
