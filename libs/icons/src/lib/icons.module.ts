import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon/icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule, TranslateModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IconsModule {}
