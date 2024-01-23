import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CarouselModule } from '@ocean/carousel';
import { IconsModule } from '@ocean/icons';
import { MatDataSourceModule } from '@ocean/material';
import { SharedModule } from '@ocean/shared';
import { StripeModule } from '@ocean/stripe';
import { LibsFormBuilderModule } from '@ocean/libs/form-builder';

export const DashboardImports = [
  StripeModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  SharedModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  IconsModule,
  MatDataSourceModule,
  CarouselModule,
];
