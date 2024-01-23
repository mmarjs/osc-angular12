import { Component, OnInit } from '@angular/core';
import { UserTypeTitle, UserTypeTitles } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class DashboardIndexComponent implements OnInit {
  userType: UserTypeTitle;
  userTypes = UserTypeTitles;

  constructor(public store: UserFacade) {
    this.store.userType$.subscribe(userType => (this.userType = userType));
  }

  ngOnInit() { }
}
