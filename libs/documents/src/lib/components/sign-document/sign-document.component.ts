import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DocumentProvider } from '@ocean/api/services';
import { DocumentViewerComponent } from 'libs/dialogs/src/lib/document-viewer/document-viewer.component';
import { filter, map, switchMap } from 'rxjs/operators';
import { environment } from 'apps/client/src/environments/environment.main';

@Component({
  selector: 'ocean-sign-document',
  templateUrl: './sign-document.component.html',
  styleUrls: ['./sign-document.component.scss'],
})
export class SignDocumentComponent {
  public signLink$ = this.route.params.pipe(
    map((params) => params.documentId),
    filter((id) => !!id),
    switchMap((documentId) => {
      const url = environment.webURL + "/assets/pages/success.html"
      // TODO: remove it when backend will be ready
      const date = new Date();
      date.setHours(date.getHours() + 1);
      return this.documentsProvider.getSignLink(documentId, url, date);
    }),
    map((link) => link.signLink)
  );

  constructor(
    private route: ActivatedRoute,
    private documentsProvider: DocumentProvider,
    private matDialog: MatDialog
  ) {}

  viewDocument(link: string) {
    this.matDialog.open(DocumentViewerComponent, {
      height: '900px',
      width: '100%',
      disableClose: true,
      data: {
        link: link
      }
    })
  }

}
