import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from '@ocean/carousel';

import { CarouselViewComponent } from './carousel-view/carousel-view.component';
import { SurveyItemsTableComponent } from './survey-items-table/survey-items-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    CarouselModule,
    MatTableModule,
    TranslateModule,
  ],
  declarations: [CarouselViewComponent, SurveyItemsTableComponent],
  exports: [CarouselViewComponent, SurveyItemsTableComponent],
})
export class ComponentsModule {}
