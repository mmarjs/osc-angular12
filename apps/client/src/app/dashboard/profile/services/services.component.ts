import { Component, OnInit } from '@angular/core';
import { UserTypeTitle, UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: []
})
export class ProfileServicesComponent implements OnInit {
  userType: UserTypeTitle;
  userTypes = UserTypeTitles;

  constructor(public store: UserFacade) {
    this.store.userType$.subscribe(userType => this.userType = userType);
  }

  ngOnInit() {}
}
