# Lesson Engine v1

`entities/lesson/schema.ts` экспортирует discriminated union и Zod schema. Контракт урока: `schemaVersion: 1`, `id`, `courseId`, `title`, `description`, `estimatedMinutes`, `xpReward`, `steps`. У шагов уникальные `id`, `type`, опциональные title/explanation/reference/hint.

| Тип             | Payload                          | Проверка                     |
| --------------- | -------------------------------- | ---------------------------- |
| story           | body, character?                 | продолжение без ответа       |
| info            | body                             | продолжение без ответа       |
| multiple_choice | prompt, options, correctOptionId | ID выбранной опции           |
| word_bank       | prompt, words, correctWordIds    | точная последовательность ID |
| text_input      | prompt, correctAnswers           | нормализованный текст        |
| order_items     | prompt, items, correctOrder      | полная перестановка ID       |
| match_pairs     | prompt, pairs {id,left,right}    | map left ID → right ID       |

`parseLesson` валидирует контент сразу и сообщает пути ошибочных полей. Проверяются ссылки на ответы, уникальность ID и корректная перестановка. Ошибки не скрываются даже в production: некорректный урок нельзя проигрывать.

`LessonStepRenderer` исчерпывающе выбирает view по type; story/info не считаются вопросами. Order строится нажатием событий по порядку, без drag-and-drop. В matching сначала выбирается левая карточка, затем правая; ранее выбранную пару можно заменить.

`evaluateAnswer` — чистая функция без navigation. Text normalization: trim, русский lowercase, удаление безвредной пунктуации по краям, схлопывание пробелов. Внутренние буквы и пунктуация сохраняются. «Аврам» не принимается как «Авраам». Fuzzy matching отсутствует, дополнительные допустимые варианты перечисляются в correctAnswers.

Player сохраняет первую попытку каждого вопроса. Retry меняет feedback, но не улучшает статистику первой попытки. Можно продолжить с объяснением. Текущий шаг сохраняется; ввод и feedback не персистятся. Завершение даёт 50 XP только в первый раз. Replay обновляет результат текущего прохождения, но сохраняет факт первого завершения и общие XP. `missedStepIds` — точка расширения для review; кнопка review сейчас disabled.

Новый lesson требует только данных и регистрации в каталоге. Новый type требует: Zod branch → evaluator/readiness → exercise view → renderer case → тесты правильных и ошибочных ответов. Для schemaVersion 2 добавляется отдельный parser/migration; нельзя молча трактовать новый контракт как v1.
