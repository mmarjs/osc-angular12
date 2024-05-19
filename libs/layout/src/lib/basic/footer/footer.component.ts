import { Component, Inject } from '@angular/core';
import { getProjectRelease } from '@ocean/shared/utils/getProjectRelease';
import { DOCUMENT } from '@angular/common';
import { scrollToHowItWorksSection } from '@ocean/layout/helpers/scroll-to-how-it-works-section';
import { Router } from '@angular/router';

@Component({
  selector: 'layout-basic-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly today = new Date();
  readonly version = getProjectRelease().split('@')?.[1] ?? '0.0.0';
  readonly scrollToHowItWorksSection = scrollToHowItWorksSection.bind(this);

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    // used in scrollToHowItWorksSection binding
    private readonly router: Router
  ) {}
}
