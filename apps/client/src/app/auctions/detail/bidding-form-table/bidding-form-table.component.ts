import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { BiddingTableFormModel, JobItem } from '@ocean/api/shared';
import { tap } from 'rxjs';
import { toggle } from '@ocean/animations';
import { IconType } from '@ocean/icons';
import { MatTable } from '@angular/material/table';
import { JobDialogs } from '@ocean/api/data';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-bidding-form-table',
  templateUrl: './bidding-form-table.component.html',
  styleUrls: ['./bidding-form-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toggle()],
})
export class BiddingFormTableComponent implements AfterViewInit, OnDestroy {
  @Output() addSurveyItem: EventEmitter<JobItem> = new EventEmitter();
  @Output() removeSurveyItem: EventEmitter<number> = new EventEmitter();
  @Output() bidsValueChange: EventEmitter<BiddingTableFormModel[]> =
    new EventEmitter();
  @Output() addJobItemNote: EventEmitter<BiddingTableFormModel> =
    new EventEmitter();

  @Input() biddingTableFormModel: BiddingTableFormModel[];
  @Input() showOnlyDescription: boolean;

  @ViewChild('form') ngForm: NgForm;
  @ViewChild(MatTable) bidTable: MatTable<any>;

  min: number = 1;
  maxLength: number = 10;
  iconType = IconType;
  columns: string[] = ['id', 'title', 'quantity', 'bid', 'notes'];
  expandedElements: JobItem[] = [];

  ngAfterViewInit(): void {
    this.ngForm.form.valueChanges
      .pipe(
        tap(() => {
          this.setValidators();
          const bids = this.biddingTableFormModel.slice();
          this.bidsValueChange.emit(bids);
        }),
        untilDestroyed(this)
      )
      .subscribe();

    this.setValidators();

    requestAnimationFrame(() => {
      Object.keys(this.ngForm.form.controls).forEach((key) => {
        this.ngForm.form.controls[key].updateValueAndValidity();
      });
    });
  }

  setValidators() {
    Object.keys(this.ngForm.form.controls).forEach((key) =>
      this.ngForm.form.controls[key].addValidators([
        Validators.min(this.min),
        Validators.maxLength(this.maxLength),
        Validators.required,
      ])
    );
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnDestroy() {}

  constructor(private readonly jobDialogs: JobDialogs) {}

  checkError = (event: boolean) => event;

  createLineItem() {
    this.jobDialogs
      .addJobLineItem()
      .pipe(
        tap((item) =>
          this.addSurveyItem.emit({
            id: item.id,
            title: item.response.firstInput,
            description: item.response.secondInput,
          })
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  openNoteDialog(jobItem: BiddingTableFormModel) {
    this.jobDialogs
      .openNoteDialog(jobItem.title)
      .pipe(
        tap((note) =>
          this.addJobItemNote.emit({
            ...jobItem,
            note,
          })
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  toggleRow(row: JobItem) {
    const index = this.expandedElements.findIndex((x) => x.id === row.id);
    if (index === -1) {
      this.expandedElements.push(row);
    } else {
      this.expandedElements.splice(index, 1);
    }
  }

  isExpanded(row: JobItem): string {
    if (this.expandedElements.findIndex((x) => x.id === row.id) !== -1) {
      return 'expanded';
    }
    return 'collapsed';
  }
}
