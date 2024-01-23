import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchFilterComponent implements OnInit {
  searchCtrl: FormControl;

  @Input() appearance = 'legacy';
  @Input() placeholder: string;

  @Output() search = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.searchCtrl = new FormControl();
    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.search.emit(query);
      });
  }
}
