export const calculateStreak = (user, newDate) => {
  const lastDate = user.last_study_date;

  // If first time logging
  if (!lastDate) return 1;

  const oneDay = 1000 * 60 * 60 * 24;

  const diff = Math.floor(
    (new Date(newDate) - new Date(lastDate)) / oneDay
  );

  if (diff === 0) {
    return user.current_streak; // same day, no change
  }

  if (diff === 1) {
    return user.current_streak + 1; // consecutive day
  }

  return 1; // missed day → reset
};