import { Component, ViewEncapsulation } from '@angular/core';
import { UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { HOW_IT_WORKS_SECTION_ID } from '@ocean/layout/helpers/scroll-to-how-it-works-section';

@Component({
  selector: 'app-page-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HowItWorksComponent {
  readonly HOW_IT_WORKS_SECTION_ID = HOW_IT_WORKS_SECTION_ID;
  readonly isLogged$ = this.user.loggedIn$;
  readonly userType = UserTypeTitles;

  constructor(public readonly user: UserFacade) {}
}
