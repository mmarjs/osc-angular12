import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBidsWidgetComponent } from './my-bids-widget.component';
import { TestModule, TestStoreEnvModule } from '@ocean/testing/helpers/test.module';

describe('MyBidsWidgetComponent', () => {
  let component: MyBidsWidgetComponent;
  let fixture: ComponentFixture<MyBidsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestStoreEnvModule, TestModule ],
      declarations: [ MyBidsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBidsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
