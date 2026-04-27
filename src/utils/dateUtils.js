import { UNKNOWN_DATE } from '../config/appConstants';

export { UNKNOWN_DATE };

export const getReleaseDateOrUnknown = (value) => {
  return value ? String(value) : UNKNOWN_DATE;
};

export const compareReleaseDates = (a, b, direction = 'asc') => {
  const aDate = getReleaseDateOrUnknown(a);
  const bDate = getReleaseDateOrUnknown(b);

  if (aDate === UNKNOWN_DATE && bDate === UNKNOWN_DATE) {
    return 0;
  }
  if (aDate === UNKNOWN_DATE) {
    return 1;
  }
  if (bDate === UNKNOWN_DATE) {
    return -1;
  }

  const compare = aDate.localeCompare(bDate);
  return direction === 'desc' ? -compare : compare;
};
