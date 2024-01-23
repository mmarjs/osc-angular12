/**
 * Verification
 */

export interface Verification {
  contacted?: boolean;
  disabledReason?: string;
  dueBy?: number;
  fieldsNeeded?: Array<string>;
}
