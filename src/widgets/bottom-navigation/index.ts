import { colors, spacing } from '../../shared/theme';
export const tabOptions = {
  headerShown: false,
  tabBarLabelPosition: 'below-icon' as const,
  tabBarActiveTintColor: colors.primaryGold,
  tabBarInactiveTintColor: colors.textSecondary,
  tabBarStyle: {
    backgroundColor: colors.backgroundElevated,
    borderTopColor: colors.border,
    width: '100%' as const,
    maxWidth: 430,
    alignSelf: 'center' as const,
    minHeight: 64,
    paddingTop: spacing.sm,
  },
  tabBarLabelStyle: { fontSize: 11 },
  sceneStyle: { backgroundColor: colors.background },
};
