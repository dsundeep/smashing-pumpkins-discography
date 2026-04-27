import { describe, expect, it } from 'vitest';
import { UNKNOWN_DATE } from '../config/appConstants';
import { compareReleaseDates, getReleaseDateOrUnknown } from './dateUtils';

describe('dateUtils', () => {
  it('returns unknown date fallback', () => {
    expect(getReleaseDateOrUnknown(undefined)).toBe(UNKNOWN_DATE);
    expect(getReleaseDateOrUnknown('1995-01-01')).toBe('1995-01-01');
  });

  it('sorts release dates with unknown values at the end', () => {
    expect(compareReleaseDates(undefined, undefined, 'asc')).toBe(0);
    expect(compareReleaseDates(undefined, '2000-01-01', 'asc')).toBe(1);
    expect(compareReleaseDates('2000-01-01', undefined, 'asc')).toBe(-1);
    expect(compareReleaseDates('1990-01-01', '2000-01-01', 'asc')).toBeLessThan(0);
    expect(compareReleaseDates('1990-01-01', '2000-01-01', 'desc')).toBeGreaterThan(0);
  });
});
