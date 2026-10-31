# BibleLoop artwork

Картинки можно передавать прямо в чат или класть в эти папки:

- `assets/mascot/` — книга BibleLoop: `idle.png`, `thinking.png`, `pointing.png`, `correct.png`, `wrong.png`, `celebrate.png`.
- `assets/characters/abraham/` — Авраам: `idle.png`, `happy.png`, `thinking.png`, `speaking.png`, `praying.png`, `pointing.png`, `walking.png`, `celebrate.png`.
- `assets/characters/abraham/welcome-glow.png` — дополнительный широкий вариант приветствия, сохранён в резерве.
- `assets/illustrations/` — будущие изображения модулей и сюжетные сцены.
- `assets/backgrounds/` — будущие фоны окружения.

Изображения подключаются централизованно в `src/shared/artwork/assets.ts`. Экраны используют `<Mascot state="thinking" />` и `<CharacterArtwork character="abraham" state="speaking" />`.

У книги пока нет отдельных картинок для `happy`, `speaking`, `reading`: `happy` использует приветствие, `speaking` и `reading` — книгу с маленькой Библией и указующим жестом. Эти соответствия заменяются в одном registry по мере появления новых ассетов.

PNG скопированы из вложений без изменений. У всех файлов есть альфа-канал. У большинства поз Авраама мягкий световой ореол является частью изображения; у `idle.png` фон вырезан без ореола. Отдельные изображения модулей пока не предоставлены, поэтому там остаются SVG-заглушки.
