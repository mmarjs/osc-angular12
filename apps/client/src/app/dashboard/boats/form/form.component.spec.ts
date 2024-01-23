import { storeInitialState } from './../../../../../../../libs/testing/src/index';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MediaService } from '@ocean/api/client';
import { ErrorHandlingService } from '@ocean/api/client/error-handling.service';
import { FormAddressComponent, FormLocationComponent, } from '@ocean/client/common/forms';
import { TwoColumnsComponent } from '@ocean/layout';
import { NumberOnlyDirective, TrimInputDirective, } from '@ocean/shared/directives';
import { TextareaFieldComponent, TextFieldComponent, } from '@ocean/shared/forms';
import { render, screen } from '@testing-library/angular';
import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { BoatsFormComponent } from './form.component';
import { LocalizationService } from '@ocean/internationalization';
import { MatSelectCountryComponent, MatSelectCountryLangToken } from '@angular-material-extensions/select-country';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { DropDownComponent } from '@ocean/shared/forms/fields/drop-down';
import { FormBuilderComponent, LibsFormBuilderModule } from '@ocean/libs/form-builder';
import { JobDialogs } from '@ocean/api/data';

describe('BoatsFormComponent', () => {
  const actions$: Observable<any> = of(null);

  const deps = {
    imports: [
      RouterTestingModule,
      ReactiveFormsModule,
      FormsModule,
      LibsFormBuilderModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MockModule(FlexLayoutModule),
      TestModule
    ],
    declarations: [
      BoatsFormComponent,
      TextFieldComponent,
      TextareaFieldComponent,
      TwoColumnsComponent,
      FormAddressComponent,
      FormLocationComponent,
      FormBuilderComponent,
      TrimInputDirective,
      NumberOnlyDirective,
      MockComponent(MatSelectCountryComponent),
      MockComponent(DropDownComponent)
    ],
    providers: [
      MockProvider(JobDialogs),
      MockProvider(MatSelectCountryLangToken),
      provideMockStore({initialState: storeInitialState}),
      provideMockActions(() => actions$),
      MockProvider(MediaService, {getFilesByTags: () => of([])}),
      MockProvider(ErrorHandlingService, {handleError: of}),
      MockProvider(ActivatedRoute, {
        data: of({}),
      } as any),
      MockProvider(LocalizationService),
    ],
  };

  it('should render', async () => {
    await render(BoatsFormComponent, deps);
    expect(screen.getByLabelText(/FORMS.LABELS.NAME/i)).toBeInTheDocument();
  });
});
