import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPipesModule } from '@ocean/shared';

export const BasicImports = [
  FlexLayoutModule,
  OverlayModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  SharedPipesModule,
  TranslateModule
];
