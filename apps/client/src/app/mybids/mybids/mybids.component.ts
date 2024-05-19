import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Bid, PagedResponse } from '@ocean/api/shared';
import { BidsFacade } from '@ocean/client/state';
import { LocalizationService } from '@ocean/internationalization';
import { SortItem } from '@ocean/shared';
import { delay, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-mybids',
  templateUrl: './mybids.component.html',
  styleUrls: ['./mybids.component.scss'],
})
export class MybidsComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  limit: number;
  priceFilters = [
    {
      title: this.localizationService.translate('FORMS.LABELS.HIGH_TO_LOW'),
      value: 'desc',
    },
    {
      title: this.localizationService.translate('FORMS.LABELS.LOW_TO_HIGH'),
      value: 'asc',
    },
  ];
  bids: Bid[];
  sortedItem: SortItem;
  source: PagedResponse<Bid>;
  isLoading: boolean = true;
  pagedDataOfMyBidsSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private bidsFacade: BidsFacade,
    private localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      bidAmount: [],
      workStartDate: [],
      approximateDuration: [],
    });
    const pageable = {
      page: 0,
      size: 10,
    };
    this.bidsFacade.loadMyBids({ pageable: pageable });
    this.pagedDataOfMyBidsSubscription = this.bidsFacade.pagedDataOfMyBids$
      .pipe(
        tap(() => (this.isLoading = true)),
        delay(500),
        map((res) => {
          this.source = res;
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  onChange(controlName: string) {
    const control = this.filterForm.get(controlName) as FormControl;

    this.sortedItem = { active: controlName, direction: control.value };

    const pageable = {
      sort: `${controlName},${control.value}`,
      page: 0,
      size: this.source.data.length,
    };
    this.bidsFacade.loadMyBids({ pageable: pageable });
    Object.keys(this.filterForm.controls)
      .filter((element) => element !== controlName)
      .forEach((ctrl) => this.filterForm.get(ctrl).setValue(null));
  }

  ngOnDestroy(): void {
    this.pagedDataOfMyBidsSubscription.unsubscribe();
  }
}
