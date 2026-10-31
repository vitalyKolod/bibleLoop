import { router } from 'expo-router';
import { AppScreen, EmptyState, PrimaryButton } from '../src/shared/ui';
export default function NotFound() {
  return (
    <AppScreen>
      <EmptyState title="Страница не найдена" description="Вернитесь к вашему пути обучения." />
      <PrimaryButton label="НА ГЛАВНУЮ" onPress={() => router.replace('/')} />
    </AppScreen>
  );
}
