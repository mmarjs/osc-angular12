import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionPolicyComponent } from './protection-policy.component';

describe('ProtectionPolicyComponent', () => {
  let component: ProtectionPolicyComponent;
  let fixture: ComponentFixture<ProtectionPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectionPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
