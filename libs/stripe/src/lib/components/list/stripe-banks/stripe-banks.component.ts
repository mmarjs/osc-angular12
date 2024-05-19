import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateStripeBankComponent } from '../../create/create-stripe-bank/create-stripe-bank.component';
import { filter, take } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { firstValueFrom, tap } from 'rxjs';
import { ProceedActionFor, StripeFacadeService } from '../../../store/facade';
import { StripeBankDetailsComponent } from '../../details/stripe-bank-details/stripe-bank-details.component';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-stripe-banks',
  templateUrl: './stripe-banks.component.html',
  styleUrls: ['./stripe-banks.component.scss'],
})
export class StripeBanksComponent implements OnInit, OnDestroy {
  readonly iconType = IconType;
  readonly banks$ = this.stripeFacadeService.banks$;
  readonly loading$ = this.stripeFacadeService.loading$;

  constructor(
    private readonly dialog: MatDialog,
    private readonly stripeFacadeService: StripeFacadeService
  ) {}

  ngOnInit() {
    this.stripeFacadeService.loadBanks();
  }

  ngOnDestroy() {
    return;
  }

  handleBankAccountCreate() {
    this.dialog
      .open(CreateStripeBankComponent)
      .afterClosed()
      .pipe(
        take(1),
        untilDestroyed(this),
        filter((value) => !!value),
        tap((bank) => this.stripeFacadeService.createBankAccount(bank))
      )
      .subscribe();
  }

  async handleBankAccountDetails(bankId: string) {
    const banks = await firstValueFrom(this.banks$);

    this.dialog
      .open(StripeBankDetailsComponent, {
        data: banks.find((bank) => bank.id === bankId),
      })
      .afterClosed()
      .pipe(
        take(1),
        untilDestroyed(this),
        filter((value) => !!value),
        tap((exitDetails) =>
          this.stripeFacadeService.proceedAction(
            ProceedActionFor.BANKS,
            exitDetails
          )
        )
      )
      .subscribe();
  }
}
