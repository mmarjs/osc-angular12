import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { JobItem } from '@ocean/api/shared';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-survey-items-table',
  templateUrl: './survey-items-table.component.html',
  styleUrls: ['./survey-items-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SurveyItemsTableComponent {
  @Input() jobItems?: JobItem[] = [];
  columns: string[] = ['id', 'title'];

  toggleShowMore(row: JobItem & { showMore: boolean }): void {
    row.showMore = !row.showMore;
  }
}
