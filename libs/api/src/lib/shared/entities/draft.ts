export interface Draft<T> {
  id: string;
  name: string;
  content: T;
  link: DraftLink;
}

export interface DraftDTO<T> {
  content: T;
  name: string;
  link: DraftLink;
}

export interface DraftLinkMeta {
  id: string | number;
}

export interface DraftLink {
  path: string;
  meta: DraftLinkMeta;
}
