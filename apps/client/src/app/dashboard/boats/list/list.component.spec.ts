import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { BoatProvider } from '@ocean/api/services';
import { API_ENVIRONMENT } from '@ocean/api/shared';
import { LinkDirectiveMock, } from '@ocean/shared';
import { mockEnvironment, StoreTesting } from '@ocean/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { BoatsListComponent } from './list.component';
import { BoatsListTableComponent } from './table';
import { MediaService } from '@ocean/api/client';
import { of } from 'rxjs';

describe('BoatsListComponent', () => {
  let component: BoatsListComponent;
  let fixture: ComponentFixture<BoatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...StoreTesting],
      declarations: [
        LinkDirectiveMock,
        MockComponent(BoatsListTableComponent),
        BoatsListComponent,
        MockPipe(TranslatePipe, (value: string) => value),
      ],
      providers: [
        {provide: API_ENVIRONMENT, useValue: mockEnvironment},
        MockProvider(BoatProvider),
        MockProvider(MediaService, {
          getFilesByTags: of
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
