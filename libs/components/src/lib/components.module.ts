import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from '@ocean/carousel';
import { IconsModule } from '@ocean/icons';

import { CarouselViewComponent } from './carousel-view/carousel-view.component';
import { SurveyItemsTableComponent } from './survey-items-table/survey-items-table.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    MatTableModule,
    TranslateModule,
    IconsModule,
  ],
  declarations: [CarouselViewComponent, SurveyItemsTableComponent],
  exports: [CarouselViewComponent, SurveyItemsTableComponent],
})
export class ComponentsModule {}
