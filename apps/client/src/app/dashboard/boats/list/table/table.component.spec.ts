// tslint:disable: nx-enforce-module-boundaries
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { BoatDatasource, BoatDialogs } from '@ocean/api/data';
import { BoatDatabase } from '@ocean/api/data/boat/boat.database';
import { API_ENVIRONMENT } from '@ocean/api/shared';
import { PanelWrapperComponent } from '@ocean/layout';
import { MatDataSourceModule } from '@ocean/material';
import { LinkDirectiveMock } from '@ocean/shared';
import { mockEnvironment, StoreTesting } from '@ocean/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { BoatsImports } from '../../boats.imports';
import { BoatsListTableComponent } from './table.component';
import { MediaService } from '@ocean/api/client';

describe('BoatsListTableComponent', () => {
  let component: BoatsListTableComponent;
  let fixture: ComponentFixture<BoatsListTableComponent>;
  let actions$: Observable<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatDataSourceModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
      ],
      declarations: [
        LinkDirectiveMock,
        MockComponent(PanelWrapperComponent),
        BoatsListTableComponent,
        MockPipe(TranslatePipe, (value: string) => value),
      ],
      providers: [
        {provide: API_ENVIRONMENT, useValue: mockEnvironment},
        MockProvider(BoatDatasource, {}),
        MockProvider(BoatDatabase),
        MockProvider(BoatDialogs),
        MockProvider(MediaService, {
          getFilesByTags: of
        }),
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const datasource = TestBed.inject(BoatDatasource);

    fixture = TestBed.createComponent(BoatsListTableComponent);
    component = fixture.componentInstance;
    component.source = datasource;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
