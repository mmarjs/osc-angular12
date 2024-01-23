export interface Properties {
  id: number;
  cellsElement: HTMLElement;
  hostElement: HTMLElement;
  images: any;
  cellWidth: number;
  loop: boolean;
  autoplayInterval: number;
  overflowCellsLimit: number;
  visibleWidth: number;
  margin: number;
  minSwipeDistance: number;
  transitionDuration: number;
  transitionTimingFunction: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  videoProperties: any;
  eventHandler?: any;
  freeScroll: boolean;
  lightDOM: boolean;
}

export interface Images {
  [index: number]: Image;
}

export interface Image {
  fileTitle?: string;
  path?: string;
  fileURL: string;
  format: string;
  originalFilename: string;
  width?: number;
  height?: number;
}