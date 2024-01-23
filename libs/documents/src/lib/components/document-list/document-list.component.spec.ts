import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe } from '@ngx-translate/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Document, DocumentStatus, UserStatus } from '@ocean/api/services';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { MockPipe } from 'ng-mocks';
import { SignDocumentComponent } from '../sign-document/sign-document.component';
import { DocumentListComponent } from './document-list.component';

const createDocument = (userStatus: UserStatus) => ({
  id: '1',
  title: 'Document 1',
  externalDocumentId: '1',
  userStatus
});

describe('DocumentListComponent', () => {
  const deps = {
    declarations: [MockPipe(TranslatePipe, (v) => v)],
    providers: [
      provideMockStore({
        initialState: {
          documents: { documents: [createDocument(UserStatus.NotCompleted)] },
        },
      }),
    ],
  };

  it('should render data properly', async () => {
    await render(DocumentListComponent, { ...deps, routes: [] });

    expect(screen.queryByText('Document 1')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'DOCUMENTS.SIGN_BTN' })
    ).toBeInTheDocument();
  });

  it.each([UserStatus.NotCompleted])(
    'should render sign button for %s status',
    async (status) => {
      await render(DocumentListComponent, {
        ...deps,
        routes: [],
        providers: [
          ...deps.providers,
          provideMockStore({
            initialState: {
              documents: { documents: [createDocument(status)] },
            },
          }),
        ],
      });

      expect(
        screen.queryByRole('button', { name: 'DOCUMENTS.SIGN_BTN' })
      ).toBeInTheDocument();
    }
  );

  it('should hide sign button for document with Completed status', async () => {
    await render(DocumentListComponent, {
      ...deps,
      providers: [
        ...deps.providers,
        provideMockStore({
          initialState: {
            documents: { documents: [createDocument(UserStatus.Completed)] },
          },
        }),
      ],
      routes: [],
    });

    expect(screen.queryByText('Document 1')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'DOCUMENTS.SIGN_BTN' })
    ).not.toBeInTheDocument();
  });

  it('should sign button redirect', async () => {
    await render(DocumentListComponent, {
      ...deps,
      routes: [
        {
          path: 'documents/sign/:documentId',
          component: SignDocumentComponent,
        },
      ],
    });

    const location = TestBed.inject(Location);

    await userEvent.click(
      screen.getByRole('button', { name: 'DOCUMENTS.SIGN_BTN' })
    );

    expect(location.path()).toBe('/documents/sign/1');
  });
});
