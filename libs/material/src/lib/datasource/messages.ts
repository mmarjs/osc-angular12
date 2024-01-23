/**
 * Config Texts
 */

export function emptyMsg(): string {
  return 'No data available';
}

export function waitMsg(): string {
  return 'Please wait...';
}

export function delayMsg(): string {
  return 'The data is still loading...';
}

export function timeoutMsg(): string {
  return 'Loading has timed out, please try again.';
}

/**
 * Debug Messages
 */

export function setPageSize(): string {
  return `PageSize setted:`;
}

export function srcAdded(name: string): string {
  return `Stream '${name}' added`;
}

export function srcEmpty(name: string): string {
  return `Stream '${name}' empty`;
}

export function srcInvalid(): string {
  return `Empty stream provided!`;
}

export function srcEmitted(): string {
  return `Stream emitted:`;
}

export function isAutoStarting(): string {
  return `DataSource starting automatically`;
}

export function notAutoStarting(length: any): string {
  return (
    `DataSource not auto starting with ${length.optional}` +
    ` optional and ${length.required} required streams`
  );
}

export function resolvedArgs(): string {
  return 'Resolved request';
}

export function queryResponse(): string {
  return 'Query response:';
}

export function queryTimeout(): string {
  return 'Query timeout count:';
}

export function responseSuccess(length): string {
  return `Response succeed with ${length} item${length === 1 ? '' : 's'}`;
}

export function responseError(): string {
  return 'Response failed';
}

/**
 * Error Messages
 */

export function addWhenRunning(item: any): string {
  return `Adding "${item}" after the DataSource is already running.`;
}

export function rmWhenRunning(item: string): string {
  return `Trying to remove "${item}" after the DataSource is already running.`;
}

export function nonNumericPageSize(): string {
  return 'Non numeric pageSize passed';
}

export function missingDataSourceInput(): string {
  return 'mat-datasource must receive a dataSource input';
}
