import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserStatus } from '@ocean/api/services';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map } from 'rxjs/operators';
import { DocumentsFacadeService } from '../../state/facade';

@Component({
  selector: 'ocean-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  public jobId$ = this.route.params.pipe(map((params) => params.jobId));
  public documents$ = this.documentsFacade.documents$;
  public isLoading$ = this.documentsFacade.isLoading$;
  userStatus = UserStatus;

  constructor(
    private route: ActivatedRoute,
    private documentsFacade: DocumentsFacadeService
  ) {}

  ngOnInit() {
    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      this.documentsFacade.loadDocuments(params?.jobId ?? null);
    });
  }

  formatDocumentStatus(type: UserStatus) {
    return `DOCUMENTS.STATUSES.${type
      .replace(/([A-Z])/g, '_$1')
      .substring(1)
      .toUpperCase()}`;
  }

  ngOnDestroy() {
    return;
  }
}
