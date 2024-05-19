import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPipesModule } from '@ocean/shared';
import { IconsModule } from '@ocean/icons';

export const BasicImports = [
  FlexLayoutModule,
  OverlayModule,
  MatButtonModule,
  IconsModule,
  MatListModule,
  MatMenuModule,
  SharedPipesModule,
  TranslateModule
];
