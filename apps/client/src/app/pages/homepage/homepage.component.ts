import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-page-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {
  fragment: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment.pipe(untilDestroyed(this)).subscribe(fragment => {
      this.fragment = fragment;
      this.updateScroll();
    });
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
