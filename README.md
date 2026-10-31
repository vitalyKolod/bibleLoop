# BibleLoop

Мобильное приложение, которое помогает понимать большую историю Библии через короткие интерактивные уроки. Рабочее имя можно заменить в `src/shared/config/branding.json`. Техническое npm имя — `apple-top`.

## Что работает

Главная → карта обучения → обзор «Авраам и Завет» → 9 шагов → результат → Главная. Реализованы story, info, multiple_choice, word_bank, text_input, order_items и match_pairs. Остальные модули закрыты, три дополнительные вкладки содержат состояния «скоро». Арт — намеренные placeholders; никаких скачанных изображений или финальных персонажей.

XP, streak, завершённые уроки и текущий шаг сохраняются на устройстве. Повторное прохождение не начисляет XP. Точность считается по первым попыткам; неверный ответ можно исправить или пропустить после объяснения. Повторение только ошибок пока недоступно.

## Работа с другого компьютера

Единый репозиторий проекта: https://github.com/vitalyKolod/bibleLoop (приватный, нужен доступ к аккаунту).

При первом запуске на другом компьютере скачайте существующий проект:

```sh
git clone https://github.com/vitalyKolod/bibleLoop.git
cd bibleLoop
npm ci
```

Открывайте именно эту папку для дальнейшей разработки. Перед продолжением работы на другом компьютере получите сохранённые изменения:

```sh
git pull --ff-only
npm ci
```

Перед переключением компьютера сохраните изменения и отправьте их в GitHub:

```sh
git add .
git commit -m "Describe changes"
git push
```

GitHub обновляется после `git push`; локальные несохранённые изменения и история чата автоматически между компьютерами не переносятся. При конфликте `git pull` сначала сохраните текущую работу отдельным коммитом и согласуйте изменения.

## Установка и запуск

Нужен Node.js 22.13+ и npm. Зависимости уже установлены. На другом компьютере:

```sh
npm install
```

Web:

```sh
npm run web
```

Откройте адрес из терминала. На большом экране мобильная область ограничена 430px.

Expo Go на iPhone / Android:

```sh
npm run start
```

Установите Expo Go с официальной страницы https://expo.dev/go. Телефон и компьютер должны быть в одной Wi-Fi сети. На iPhone сканируйте QR камерой, на Android — через Expo Go. Версия Expo Go должна поддерживать SDK 57. Если доступная версия Expo Go отстаёт, используйте совместимый simulator build с официальной страницы или development build; не обновляйте отдельные native пакеты произвольно.

iOS Simulator на Mac (нужны Xcode и установленный simulator):

```sh
npm run ios
```

Android (запустите эмулятор в Android Studio или подключите устройство):

```sh
npm run android
```

Эти команды запускают Metro и открывают приложение в Expo Go; production signing не настроен. Bundle identifiers `com.example.*` являются временными.

## Проверки

```sh
npm run check
npx expo-doctor
npx expo export --platform web
```

`check` последовательно запускает strict TypeScript, ESLint, Jest и Prettier. Отдельно доступны `typecheck`, `lint`, `test`, `format` и `format:check`.

## Технологии

Expo SDK 57, React Native 0.86, React 19.2, TypeScript strict, Expo Router, Zustand + AsyncStorage, Zod, Reanimated + Worklets, LinearGradient, Haptics, expo-image, Safe Area, SVG, Lucide. Jest Expo и React Native Testing Library для тестов. Никаких серверов, авторизации или платёжных SDK.

## Контент

Первый урок: `src/content/lessons/abraham.ts`. Курс: `src/content/courses/great-story.ts`.

Чтобы добавить урок:

1. Создайте данные с `schemaVersion: 1` и уникальными ID урока и шагов. Оберните в `parseLesson`.
2. Зарегистрируйте урок в каталоге `lessons`, добавьте модуль курса с `lessonId` и статусом `available`.
3. Используйте существующие типы шагов: UI менять не нужно. Добавьте тест на валидацию нового урока.
4. Для нового типа упражнения следуйте `docs/LESSON_ENGINE.md`.

`reference` — библиографическая ссылка, а не загрузка полного текста перевода. В уроке используются короткие авторские пересказы.

## Структура и ограничения

`app/` — только маршруты. `src/entities/` — чистые модели и функции, `src/features/` — поведение, `src/widgets/` — составные блоки, `src/screens/` — экраны, `src/shared/` — токены и UI. Провайдеры в `src/providers/`: папку `src/app/` не создавайте, она перехватит маршруты Expo Router.

Архитектура, дизайн и решения: `docs/`. Сохранения локальные, без синхронизации между устройствами. При удалении данных приложения прогресс исчезнет. Реальный iPhone/Android следует проверить перед релизом: web и Jest не заменяют native QA.
