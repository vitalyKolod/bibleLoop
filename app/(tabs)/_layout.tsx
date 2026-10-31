import { Tabs } from 'expo-router';
import { BookOpen, CircleCheck, House, UserRound } from 'lucide-react-native';
import { tabOptions } from '../../src/widgets/bottom-navigation';
export default function TabsLayout() {
  return (
    <Tabs screenOptions={tabOptions}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Задания',
          tabBarIcon: ({ color, size }) => <CircleCheck color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="bible"
        options={{
          title: 'Библия',
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
