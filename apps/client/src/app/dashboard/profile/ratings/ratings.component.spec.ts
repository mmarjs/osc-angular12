// tslint:disable: nx-enforce-module-boundaries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { PanelWrapperComponent } from '@ocean/layout';
import { MockComponent, MockPipe } from 'ng-mocks';
import { BarRating } from 'ngx-bar-rating';
import { ProfileRatingsComponent } from './ratings.component';

describe('ProfileRatingsComponent', () => {
  let component: ProfileRatingsComponent;
  let fixture: ComponentFixture<ProfileRatingsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(PanelWrapperComponent),
        MockComponent(BarRating),
        MockPipe(TranslatePipe, (value: string) => value),
        ProfileRatingsComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
