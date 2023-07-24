export const getDate = (str: string): string => {
  return new Date(str).toLocaleDateString('ru-Ru');
};
