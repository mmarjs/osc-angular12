import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { ApiStateTestModule } from '@ocean/api/state';
import { MockPipe } from 'ng-mocks';
import { WhoWeAreComponent } from './who-we-are.component';

describe('WhoWeAreComponent', () => {
  let component: WhoWeAreComponent;
  let fixture: ComponentFixture<WhoWeAreComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ApiStateTestModule.forParent()],
      declarations: [WhoWeAreComponent, MockPipe(TranslatePipe, (v) => v)],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoWeAreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
