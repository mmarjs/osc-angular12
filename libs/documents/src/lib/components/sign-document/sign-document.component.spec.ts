import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslatePipe } from '@ngx-translate/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DocumentProvider } from '@ocean/api/services';
import { render, screen } from '@testing-library/angular';
import { MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { SignDocumentComponent } from './sign-document.component';

describe('SignDocumentComponent', () => {
  const deps = {
    imports: [RouterTestingModule, MatDialogModule],
    declarations: [MockPipe(TranslatePipe, (v) => v)],
    providers: [
      MockProvider(DocumentProvider, {
        getSignLink: jest
          .fn((id) => of({ signLink: `https://dpcument.sign/${id}` })),
      }),
      MockProvider(ActivatedRoute, {
        params: of({
          documentId: '123',
        }),
      }),
    ],
  };

  it('should create', async () => {
    await render(SignDocumentComponent, {
      ...deps,
    });

    const documentProviderMock = TestBed.inject(DocumentProvider);

    expect(documentProviderMock.getSignLink).toHaveBeenCalledWith(
      '123',
      'https://www.oceanservicecenter.com/assets/pages/success.html',
       expect.any(Date)
    );

  });
});
