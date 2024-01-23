import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { InternationalizationModule } from '@ocean/internationalization';
import { SharedDirectivesModule } from '@ocean/shared/directives/directives.module';
import { SharedPipesModule } from '@ocean/shared/pipes/pipes.module';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

export const AppFormsImports = [
  FlexLayoutModule,
  ReactiveFormsModule,
  SharedDirectivesModule,
  SharedPipesModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule,
  InternationalizationModule,
  MatSelectCountryModule
];
