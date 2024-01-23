import { ComponentsModule } from '@ocean/components';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { CountWithNavigationComponent } from './count-with-navigation/count-with-navigation.component';
import { UploadInputMaskComponent } from './upload-input-mask/upload-input-mask.component';
import { FilesListComponent } from './files-list/files-list.component';
import { AuctionDetailCardComponent } from './auction-detail-card/auction-detail-card.component';
import { TimeRemainingComponent } from './time-remaining/time-remaining.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { IconsModule } from '@ocean/icons';
import { InternationalizationModule } from '@ocean/internationalization';
import { SharedDirectivesModule } from '@ocean/shared/directives';

@NgModule({
  declarations: [
    ButtonComponent,
    CountWithNavigationComponent,
    UploadInputMaskComponent,
    FilesListComponent,
    AuctionDetailCardComponent,
    TimeRemainingComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    IconsModule,
    InternationalizationModule,
    SharedDirectivesModule,
    ComponentsModule,
  ],
  exports: [
    ButtonComponent,
    CountWithNavigationComponent,
    UploadInputMaskComponent,
    FilesListComponent,
    AuctionDetailCardComponent,
    TimeRemainingComponent
  ]
})
export class PartialsModule { }
