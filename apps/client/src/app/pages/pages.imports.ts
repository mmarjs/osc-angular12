import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {
  SharedDirectivesModule,
  SharedModule,
  SharedPipesModule,
} from '@ocean/shared';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatStepperModule } from '@angular/material/stepper';
import { LibsFormBuilderModule } from '@ocean/libs/form-builder';
import { IconsModule } from '@ocean/icons';

export const PagesImports = [
  LibsFormBuilderModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  SharedDirectivesModule,
  SharedPipesModule,
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  MatListModule,
  IconsModule,
  SharedModule,
  MatSelectCountryModule,
  NgxIntlTelInputModule,
  MatStepperModule,
];
