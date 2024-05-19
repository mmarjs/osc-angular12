import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from './icon.component';
import { MockPipe } from 'ng-mocks';
import { TranslatePipe } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTooltipModule],
      declarations: [
        IconComponent,
        MockPipe(TranslatePipe, (value: string) => value),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
