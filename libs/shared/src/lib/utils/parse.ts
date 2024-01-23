export const paramToNumber = (param: unknown): number | null => {
  if (typeof param !== 'string' && typeof param !== 'number') {
    // we do not care about anthying else then string or number that can be converted to string
    return null;
  }

  if (typeof param === 'number') {
    return param;
  }

  // check if string is a number value
  const parsed = parseInt(param, 10);
  if (isNaN(parsed)) {
    return null;
  }

  return parsed;
};
