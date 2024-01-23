import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
      <button type="button" mat-flat-button [color]="color" [disabled]="disabled" [appLink]="appLink" (click)="btnClick.emit()" [ngClass]="{
        'pointer-events-off':isLoading
      }">
      <img src="/assets/images/loading.gif" alt="Loading..." *ngIf="isLoading" class="loading-gif">
      <ng-content></ng-content>
    </button>
    `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Output() btnClick: EventEmitter<void> = new EventEmitter();
  @Input() color = 'primary';
  @Input() disabled: boolean;
  @Input() isLoading: boolean;
  @Input() appLink: string;
}
