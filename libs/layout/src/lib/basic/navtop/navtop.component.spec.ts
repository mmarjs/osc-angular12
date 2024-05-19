import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiStateTestModule, UserFacade } from '@ocean/api/state';
import { LinkActiveDirective, LinkDirectiveMock } from '@ocean/shared';
import { MockDirective, MockPipe, MockProvider } from 'ng-mocks';
import { NavtopComponent } from './navtop.component';
import { render, screen } from '@testing-library/angular';
import { UserTypeTitles } from '@ocean/api/shared';
import { of } from 'rxjs';

describe('NavtopComponent', () => {
  const deps = {
    imports: [RouterTestingModule, ApiStateTestModule.forParent()],
    declarations: [
      MockDirective(LinkActiveDirective),
      LinkDirectiveMock,
      NavtopComponent,
      MockPipe(TranslatePipe, (v) => v),
    ],
    providers: [provideMockStore()],
  };

  it('should render link for guest', async () => {
    await render(NavtopComponent, { ...deps });

    expect(screen.queryAllByRole('link')).toMatchInlineSnapshot(`
      [
        <a
          href="/faq"
          mat-button=""
          routerlink="/faq"
          routerlinkactive="active"
        >
           COMMON.MENU.FAQ 
        </a>,
      ]
    `);
  });

  it('should render link for user', async () => {
    await render(NavtopComponent, {
      ...deps,
      providers: [MockProvider(UserFacade, { loggedIn$: of(true) })],
    });

    expect(screen.queryAllByRole('link')).toMatchInlineSnapshot(`
      [
        <a
          href="/auctions"
          mat-button=""
          routerlink="/auctions"
          routerlinkactive="active"
        >
           COMMON.MENU.AUCTIONS 
        </a>,
        <a
          href="/mybids"
          mat-button=""
          routerlink="/mybids"
          routerlinkactive="active"
        >
           COMMON.MENU.MY_BIDS 
        </a>,
        <a
          href="/documents"
          mat-button=""
          routerlink="/documents"
          routerlinkactive="active"
        >
           COMMON.MENU.DOCUMENTS 
        </a>,
        <a
          href="/dashboard"
          mat-button=""
          routerlink="/dashboard"
          routerlinkactive="active"
        >
           COMMON.MENU.DASHBOARD 
        </a>,
      ]
    `);
  });

  it('should render link for BoatOwner', async () => {
    await render(NavtopComponent, {
      ...deps,
      providers: [
        MockProvider(UserFacade, {
          loggedIn$: of(true),
          userType$: of(UserTypeTitles.BOAT_OWNER),
        }),
      ],
    });

    expect(screen.queryAllByRole('link')).toMatchInlineSnapshot(`
      [
        <a
          href="/drafts"
          mat-button=""
          routerlink="/drafts"
          routerlinkactive="active"
        >
           COMMON.MENU.DRAFTS 
        </a>,
        <a
          href="/documents"
          mat-button=""
          routerlink="/documents"
          routerlinkactive="active"
        >
           COMMON.MENU.DOCUMENTS 
        </a>,
        <a
          href="/dashboard"
          mat-button=""
          routerlink="/dashboard"
          routerlinkactive="active"
        >
           COMMON.MENU.DASHBOARD 
        </a>,
      ]
    `);
  });
});
