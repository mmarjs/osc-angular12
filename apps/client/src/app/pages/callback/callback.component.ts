import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from '@ocean/api/state';
import { ROUTES } from '@ocean/shared';

@Component({
  selector: 'app-page-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  constructor(private router: Router, private session: UserFacade) {}

  ngOnInit() {
    this.session.loggedIn$.subscribe(logged => {
      if (logged) {
        this.router.navigate([ROUTES.link('DASHBOARD')]);
      } else {
        this.router.navigate([ROUTES.link('HOME')]);
      }
    });
  }
}
