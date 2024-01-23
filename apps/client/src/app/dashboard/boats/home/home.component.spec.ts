// tslint:disable: nx-enforce-module-boundaries
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { OneColumnComponent, PanelSimpleComponent } from '@ocean/layout';
import { MockComponent, MockPipe } from 'ng-mocks';
import { BoatsListComponent } from '../list';
import { BoatsHomeComponent } from './home.component';

describe('BoatsHomeComponent', () => {
  let component: BoatsHomeComponent;
  let fixture: ComponentFixture<BoatsHomeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        MockComponent(OneColumnComponent),
        MockComponent(PanelSimpleComponent),
        MockComponent(BoatsListComponent),
        BoatsHomeComponent,
        MockPipe(TranslatePipe, (value: string) => value),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
