import { Component, Input } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  MediaResponse,
  MediaTransform,
  transformMedia,
} from '@ocean/api/client';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-carousel-view',
  templateUrl: './carousel-view.component.html',
  styleUrls: ['./carousel-view.component.scss'],
})
export class CarouselViewComponent {
  readonly mediaTransform = MediaTransform;
  readonly iconType = IconType;

  @Input()
  readonly media: MediaResponse[] = [];

  download(url: string, name: string) {
    const link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.click();
    link.target = '_blank';
    document.removeChild(link);
  }

  getThumbnailUrl(media: MediaResponse) {
    return transformMedia(media, MediaTransform.CAROUSEL_THUMB);
  }

  getMainUrl(media: MediaResponse) {
    return transformMedia(media, MediaTransform.CAROUSEL_MAIN);
  }
}
