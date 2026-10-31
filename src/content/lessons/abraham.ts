import { parseLesson } from '../../entities/lesson/schema';
export const abrahamLesson = parseLesson({
  schemaVersion: 1,
  id: 'abraham-covenant-01',
  courseId: 'great-story',
  title: 'Авраам и Завет',
  description:
    'От первого шага в неизвестность до обещания, которое меняет историю. Узнайте, что связывает путь Авраама и большую историю Библии.',
  estimatedMinutes: 6,
  xpReward: 50,
  steps: [
    {
      id: 'call',
      type: 'story',
      title: 'Путь начинается с доверия',
      body: 'Бог призывает Аврама оставить привычную землю и отправиться в землю, которую Он покажет. Аврам идёт, ещё не зная всего пути.',
      character: 'abraham',
      reference: 'Бытие 12:1–4',
    },
    {
      id: 'geography',
      type: 'info',
      title: 'Три точки на карте',
      body: 'Ур находился в Месопотамии. Семья Аврама переселилась в Харран, севернее. Оттуда Аврам отправился в Ханаан — землю у восточного берега Средиземного моря.',
      reference: 'Бытие 11:31; 12:5',
    },
    {
      id: 'destination',
      type: 'multiple_choice',
      prompt: 'Куда отправился Аврам из Харрана?',
      options: [
        { id: 'egypt', label: 'В Египет' },
        { id: 'canaan', label: 'В Ханаан' },
        { id: 'babylon', label: 'В Вавилон' },
      ],
      correctOptionId: 'canaan',
      explanation: 'Аврам отправился в Ханаан, следуя Божьему призыву.',
      reference: 'Бытие 12:5',
    },
    {
      id: 'promise',
      type: 'story',
      title: 'Обещание больше одной жизни',
      body: 'Бог обещает Авраму многочисленных потомков и землю. Через него благословение должно прийти к другим народам. Это обещание становится важной нитью библейской истории.',
      character: 'abraham',
      reference: 'Бытие 12:2–3; 15:5–6',
    },
    {
      id: 'covenant',
      type: 'word_bank',
      prompt: 'Бог заключил с Авраамом ______.',
      words: [
        { id: 'law', label: 'закон' },
        { id: 'covenant', label: 'завет' },
        { id: 'city', label: 'город' },
      ],
      correctWordIds: ['covenant'],
      explanation: 'Завет — особая связь, основанная на обещании и обязательствах.',
      reference: 'Бытие 17:1–8',
    },
    {
      id: 'sequence',
      type: 'order_items',
      prompt: 'Восстановите последовательность событий.',
      items: [
        { id: 'name', label: 'Аврам получает имя Авраам' },
        { id: 'call', label: 'Бог призывает Аврама' },
        { id: 'covenant', label: 'Бог заключает завет' },
        { id: 'go', label: 'Аврам отправляется в Ханаан' },
      ],
      correctOrder: ['call', 'go', 'covenant', 'name'],
      explanation: 'Призыв и путь описаны в Бытии 12, завет — в Бытии 15, новое имя — в Бытии 17.',
      reference: 'Бытие 12; 15; 17',
    },
    {
      id: 'connections',
      type: 'match_pairs',
      prompt: 'Соедините понятия и их значения.',
      pairs: [
        { id: 'abraham', left: 'Авраам', right: 'Отец многих народов' },
        { id: 'canaan', left: 'Ханаан', right: 'Земля обещания' },
        { id: 'covenant', left: 'Завет', right: 'Особое обещание и обязательства' },
      ],
      explanation: 'Имя, место и завет помогают понять смысл этой истории.',
      reference: 'Бытие 17:5–8',
    },
    {
      id: 'new-name',
      type: 'text_input',
      prompt: 'Какое новое имя Бог дал Авраму?',
      correctAnswers: ['Авраам'],
      hint: 'Это имя означает «отец множества народов».',
      explanation: 'Аврам получает имя Авраам. Эти имена различаются по смыслу.',
      reference: 'Бытие 17:5',
    },
    {
      id: 'summary',
      type: 'info',
      title: 'Одна история. Большое обещание.',
      body: 'Авраам отвечает на призыв, отправляется в Ханаан и вступает в завет с Богом. Обещание потомков и благословения связывает его историю с дальнейшим повествованием Библии.',
      reference: 'Бытие 12:1–3; 17:5',
    },
  ],
});
export const lessons = { [abrahamLesson.id]: abrahamLesson };
export function getLesson(id: string) {
  return lessons[id];
}
