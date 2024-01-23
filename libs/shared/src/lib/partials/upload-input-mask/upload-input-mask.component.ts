import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-upload-input-mask',
  template: `
  <div class="upload-mask-wrapper">
    <span class="cross"></span>
    <ng-content select=".file-element-trigger"></ng-content>
  </div>
`,
  styleUrls: ['./upload-input-mask.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadInputMaskComponent {

}
