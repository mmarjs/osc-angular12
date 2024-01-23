import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { HomepageComponent } from './homepage.component';
import { HowItWorksComponent } from './how-it-works';
import { StatsComponent } from './stats/stats.component';
import { TestimonialsComponent } from './testimonials';
import { TrustedByComponent } from './trusted-by';
import { WhoWeAreComponent } from './who-we-are';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      declarations: [
        MockComponent(HowItWorksComponent),
        MockComponent(TestimonialsComponent),
        MockComponent(TrustedByComponent),
        MockComponent(WhoWeAreComponent),
        MockComponent(StatsComponent),
        HomepageComponent
      ]
      // schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
