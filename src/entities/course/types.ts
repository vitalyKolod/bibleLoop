export type CourseModule = {
  id: string;
  title: string;
  subtitle: string;
  lessonId?: string;
  status: 'available' | 'locked';
};
export type Course = { id: string; title: string; modules: CourseModule[] };
