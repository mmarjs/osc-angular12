import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  BroadcastChannelType,
  CustomBroadcastChannel,
  PATHS,
  ROUTES,
} from '@ocean/shared';
import { AuctionsFacade } from '@ocean/client/state/auctions';
import { UserFacade } from '@ocean/api/state';
import { firstValueFrom } from 'rxjs';
import { UserTypeTitles } from '@ocean/api/shared';
import { IconType } from '@ocean/icons';

interface ViewerData {
  link: string;
  jobId?: number;
}

export const BOLD_SIGN_ORIGIN_URL = 'https://app.boldsign.com';
export const SIGNED_DOCUMENT_ACTION = 'onDocumentSigned';
export const DECLINED_DOCUMENT_ACTION = 'onDocumentDeclined';

@Component({
  selector: 'ocean-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
})
export class DocumentViewerComponent {
  readonly iconType = IconType;

  action?: string;
  link?: SafeUrl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: ViewerData,
    private readonly sanitizer: DomSanitizer,
    private readonly dialogRef: MatDialogRef<DocumentViewerComponent>,
    private readonly router: Router,
    private readonly auctionsFacade: AuctionsFacade,
    private readonly userFacade: UserFacade,
    private readonly broadcast: CustomBroadcastChannel
  ) {
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.link);
  }

  @HostListener('window:message', ['$event'])
  private listener({ origin, data }: MessageEvent) {
    if (origin !== BOLD_SIGN_ORIGIN_URL) {
      return;
    }

    this.action = data?.action;
  }

  async onPageLoad() {
    if (this.action === SIGNED_DOCUMENT_ACTION) {
      this.broadcast.send(
        BroadcastChannelType.USER_TYPE,
        (await firstValueFrom(this.userFacade.userType$)) as UserTypeTitles,
        5000
      );
    } else if (this.action === DECLINED_DOCUMENT_ACTION) {
      this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${location.origin}/${PATHS['DOCUMENT_DECLINED']}`
      );
      this.action = undefined;
    }
  }

  closeDocument() {
    this.dialogRef.close();

    if (this.data?.jobId) {
      this.auctionsFacade.getDocuments(this.data.jobId);
    }

    void this.router.navigate([ROUTES.link('DASHBOARD')]);
  }
}
