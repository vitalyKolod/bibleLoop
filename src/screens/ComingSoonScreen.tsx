import { AppScreen, EmptyState } from '../shared/ui';
import { Mascot } from '../widgets/mascot';
export function ComingSoonScreen({ title, description }: { title: string; description: string }) {
  return (
    <AppScreen>
      <Mascot state="thinking" />
      <EmptyState title={title} description={description} />
    </AppScreen>
  );
}
