import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Image } from '@ocean/carousel';

@Component({
  selector: 'app-auction-carousel',
  templateUrl: './auction-carousel.component.html',
  styleUrls: ['./auction-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionCarouselComponent implements OnInit {
  @ViewChild('carouselUseCase') carouselUseCase: any;
  @ViewChild('carouselThumbsUseCase') carouselThumbsUseCase: any;
  @Input() images: Image[];

  constructor() { }

  ngOnInit(): void {
  }

  handleCarouselUseCaseEvents(event: any) {
    console.log(event, this.carouselUseCase.slideCounter)
    // if (event.name === 'transitionend') {
      this.carouselThumbsUseCase.select(this.carouselUseCase.slideCounter);
    // }
  }
  download(url: string, name: string) {
    var a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    document.removeChild(a);
  }
}
