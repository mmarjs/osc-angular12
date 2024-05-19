import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import {
  HOW_IT_WORKS_SECTION_ID,
  scrollToHowItWorksSection,
} from '@ocean/layout/helpers/scroll-to-how-it-works-section';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-page-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly state = this.router.getCurrentNavigation()?.extras?.state;
  private readonly scrollToHowItWorksSection =
    scrollToHowItWorksSection.bind(this);

  fragment?: string;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.route.fragment.pipe(untilDestroyed(this)).subscribe((fragment) => {
      this.fragment = fragment;
      this.updateScroll();
    });

    if (this.state?.hasOwnProperty(HOW_IT_WORKS_SECTION_ID)) {
      this.scrollToHowItWorksSection();
    }
  }

  ngAfterViewInit() {
    this.updateScroll();
  }

  ngOnDestroy() {}

  updateScroll() {
    try {
      if (this.fragment) {
        document
          .querySelector('#' + this.fragment)
          .scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {}
  }
}
