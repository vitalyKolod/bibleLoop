import type { Course } from '../../entities/course/types';
export const greatStory: Course = {
  id: 'great-story',
  title: 'Большая история Библии',
  modules: [
    { id: 'creation', title: 'Сотворение', subtitle: 'Начало большой истории', status: 'locked' },
    {
      id: 'abraham',
      title: 'Авраам',
      subtitle: 'Призыв, путь и обещание',
      lessonId: 'abraham-covenant-01',
      status: 'available',
    },
    { id: 'exodus', title: 'Исход', subtitle: 'Дорога к свободе', status: 'locked' },
    { id: 'david', title: 'Давид', subtitle: 'Сердце царя', status: 'locked' },
    { id: 'jesus', title: 'Иисус', subtitle: 'Надежда для мира', status: 'locked' },
    { id: 'acts', title: 'Деяния', subtitle: 'История продолжается', status: 'locked' },
  ],
};
