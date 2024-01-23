import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockComponent, MockPipe } from 'ng-mocks';
import { ButtonComponent } from '../button/button.component';
import { CountWithNavigationComponent } from './count-with-navigation.component';

describe('CountWithNavigationComponent', () => {
  let component: CountWithNavigationComponent;
  let fixture: ComponentFixture<CountWithNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CountWithNavigationComponent, MockPipe(TranslatePipe),

      MockComponent(ButtonComponent),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountWithNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
