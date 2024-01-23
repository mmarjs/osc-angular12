// tslint:disable: nx-enforce-module-boundaries
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDataSourceModule, MaterialModule } from '@ocean/material';
import { CarouselModule } from '@ocean/carousel';
import { PartialsModule } from '@ocean/shared/partials/partials.module';
import { IconsModule } from '@ocean/icons';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPipesModule } from '@ocean/shared/pipes/pipes.module';
import { ComponentsModule } from '@ocean/components';
import { LibsFormBuilderModule } from '@ocean/libs/form-builder';
import { StripeModule } from '@ocean/stripe';

export const AuctionsImports = [
  ComponentsModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  MatDataSourceModule,
  MatButtonModule,
  MatIconModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  FormsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatStepperModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  CarouselModule,
  PartialsModule,
  TranslateModule,
  IconsModule,
  MatProgressSpinnerModule,
  SharedPipesModule,
  LibsFormBuilderModule,
  MaterialModule,
  StripeModule,
];
