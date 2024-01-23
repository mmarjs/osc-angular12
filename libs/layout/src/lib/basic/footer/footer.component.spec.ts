import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { LinkDirectiveMock } from '@ocean/shared';
import { MockPipe } from 'ng-mocks';
import { BasicImports } from '../basic.imports';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  const year = '2019';
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...BasicImports],
      declarations: [
        LinkDirectiveMock,
        FooterComponent,
        MockPipe(TranslatePipe, (v) => v),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime((new Date(`${year}-01-01`)).getTime());
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have year in copyright equal to year that defined by today day in component', () => {
    const { debugElement } = fixture;
    const copyright = debugElement.query(By.css('[date-testid="copyright"]'));

    expect(copyright?.nativeElement.textContent).toMatch(year);
  });
});
