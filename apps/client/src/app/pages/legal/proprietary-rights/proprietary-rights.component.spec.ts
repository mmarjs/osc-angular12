import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprietaryRightsComponent } from './proprietary-rights.component';

describe('ProprietaryRightsComponent', () => {
  let component: ProprietaryRightsComponent;
  let fixture: ComponentFixture<ProprietaryRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProprietaryRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprietaryRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
