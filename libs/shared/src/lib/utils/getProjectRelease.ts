export const getProjectRelease = (): string => {
  return process?.env?.NG_APP_BUILD_NUMBER ?? 'unknown';
};
