import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MOCK_THREADS } from '../threads.mock';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-messages-recipients-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesRecipientsSearchComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger, { static: true })
  trigger: MatAutocompleteTrigger;

  searchCtrl: FormControl;
  selected: Array<any> = [];

  uid = '1';
  accounts = MOCK_THREADS;

  readonly iconType = IconType;

  constructor() {}

  ngOnInit() {
    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => {
        if (query) {
          this.doSearch(query);
        } else {
          this.accounts = MOCK_THREADS;
          // if (this.trigger) {
          //   this.trigger.closePanel();
          // }
        }
      });
  }

  doSelect(account: any) {
    if (
      !this.selected.some((a) => a.name === account.name) &&
      account.name !== this.uid
    ) {
      this.selected.push(account);
    }
    this.accounts = MOCK_THREADS;
    // this.accounts = [];
  }

  doRemove(account: any): void {
    this.selected = this.selected.filter((a) => a.name !== account.name);
  }

  private doSearch(query: string) {
    this.accounts = MOCK_THREADS.filter(
      (account) => account.name.indexOf(query) !== -1
    );

    if (this.accounts.length > 0) {
      this.trigger.openPanel();
    }
  }
}
