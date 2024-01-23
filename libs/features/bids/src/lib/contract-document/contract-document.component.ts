import { Component, OnDestroy, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Document, DocumentProvider, DocumentStatus, UserStatus } from '@ocean/api/services';
import { PaymentEvent } from '@ocean/api/shared';
import { AuctionsFacade, BidsFacade } from '@ocean/client/state';
import { DocumentViewerComponent } from 'libs/dialogs/src/lib/document-viewer/document-viewer.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap,tap } from 'rxjs/operators';
import { environment } from 'apps/client/src/environments/environment.main';

@Component({
  selector: 'ocean-contract-document',
  templateUrl: './contract-document.component.html',
  styleUrls: ['./contract-document.component.scss']
})
export class ContractDocumentComponent implements OnInit, OnDestroy {

  document!: Document;
  link!: string;
  bidId!: string;
  jobId!: number;
  linkSubscription!: Subscription;
  documentStatus = DocumentStatus;
  userStatus = UserStatus;
  bid$ = this.bidsFacade.bid$;
  paymentStatus = PaymentEvent;
  isLoading:boolean = false;

  constructor(
    private documentsProvider: DocumentProvider,
    private matDialog: MatDialog,
    private auctionsFacade: AuctionsFacade,
    private route: ActivatedRoute,
    private router: Router,
    private bidsFacade: BidsFacade
  ) { }


  ngOnInit(): void {
    this.linkSubscription = this.auctionsFacade.selectedDocument$.pipe(
      tap(()=>this.isLoading = true),
      filter((document:Document)=>!!document),
      mergeMap((document: Document) => {
        this.document = document;
        const url = environment.webURL + "/assets/pages/success.html";
        const date = new Date();
        date.setHours(date.getHours() + 1);
        return this.documentsProvider.getSignLink(document?.id, url, date);
      }),
      map((link) => {
        if(link.signLink) this.isLoading = false;
        return this.link = link.signLink
      })
    ).subscribe();

    this.route.params.pipe(
      map((params) => {
        this.jobId = params.id;
        this.bidId = params.bidId
      }),
      untilDestroyed(this)
    ).subscribe();

  }

  viewDocument() {
    this.matDialog.open(DocumentViewerComponent, {
      height: '900px',
      width: '100%',
      disableClose: true,
      data: {
        link: this.link,
        jobId: this.jobId
      }
    })
  }

  gotoDepositPage() {
    this.router.navigate(['../../deposit', this.bidId], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.linkSubscription.unsubscribe();
  }

}
