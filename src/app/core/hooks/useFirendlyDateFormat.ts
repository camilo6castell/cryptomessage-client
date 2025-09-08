export const useFirendlyDateFormat = (dateString: string): string => {
  const date = new Date(dateString);

  const day = new Intl.DateTimeFormat('es-ES', { day: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
    date,
  );
  const time = new Intl.DateTimeFormat('es-ES', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);

  return `El ${day} de ${month} a las ${time}`;
};
