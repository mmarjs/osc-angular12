import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestMatModule, TestModule, TestStoreEnvModule } from '@ocean/testing/helpers/test.module';
import { MockComponent } from 'ng-mocks';
import { MyAuctionsTableComponent } from './my-auctions-table/my-auctions-table.component';
import { MyAuctionsComponent } from './my-auctions.component';

describe('MyAuctionsComponent', () => {
  let component: MyAuctionsComponent;
  let fixture: ComponentFixture<MyAuctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[TestStoreEnvModule,TestModule,TestMatModule],
      declarations: [MyAuctionsComponent, MockComponent(MyAuctionsTableComponent)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAuctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
