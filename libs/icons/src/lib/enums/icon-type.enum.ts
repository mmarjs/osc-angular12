export enum IconType {
  EDIT = 'edit',
  REMOVE = 'remove',
  ADD = 'add',
  CHEVRON_LEFT = 'chevron_left',
  CHEVRON_RIGHT = 'chevron_right',
  DELETE = 'delete_outline',
  DETAILS = 'launch',
  NOTE = 'comment',
  CHECK = 'check',
  CLOSE = 'close',
  NOTIFICATION = 'fa-bell'
}

type T = typeof IconType;

export type iconType = keyof T | T[keyof T];
