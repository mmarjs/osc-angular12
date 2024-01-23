import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ROUTES } from '@ocean/shared';
import { UserTypeTitle } from '@ocean/api/shared';
import { UserFacade } from '@ocean/api/state';
import { AuctionsFacade } from '@ocean/client/state/auctions';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs';

@Component({
  selector: 'ocean-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
})
export class DocumentViewerComponent implements OnInit, OnDestroy {
  constructor(
    private dialogRef: MatDialogRef<DocumentViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userFacade: UserFacade,
    private auctionsFacade: AuctionsFacade,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  link: SafeUrl | undefined;
  userType!: UserTypeTitle | undefined;

  ngOnInit() {
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.link);
    this.userFacade.userType$
      .pipe(
        filter((userType) => !!userType),
        untilDestroyed(this)
      )
      .subscribe((userType) => {
        this.userType = userType;
      });
  }

  closeDocument() {
    this.dialogRef.close();
    if (this.data?.jobId) {
      this.auctionsFacade.getDocuments(this.data.jobId);
    }
    this.router.navigate([ROUTES.link('DASHBOARD')]);
  }

  ngOnDestroy(): void {
    return;
  }
}
