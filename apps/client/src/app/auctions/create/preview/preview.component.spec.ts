import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalizationService } from '@ocean/internationalization';
import { TwoColumnsComponent } from '@ocean/layout';
import { TextFieldComponent } from '@ocean/shared/forms';
import { DatepickerComponent } from '@ocean/shared/forms/fields/datepicker/datepicker.component';
import { CapitalizePipe } from '@ocean/shared/pipes';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { render, screen, within } from '@testing-library/angular';
import { IconComponent } from 'libs/icons/src/lib/icon/icon.component';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { FinalizeComponent } from '../finalize';
import { PreviewComponent } from './preview.component';
import { FormsModule } from '@angular/forms';
import { FormBuilderService } from '@ocean/libs/form-builder';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NumberOnlyDirective, TrimInputDirective } from '@ocean/shared';
import { FormUtils } from '@ocean/shared/utils/form.utils';
import { TextMaskModule } from 'angular2-text-mask';

const form = new FormGroup({
  auctionStartDate: new FormControl(new Date('03/08/2022')),
  auctionEndDate: new FormControl(new Date('05/09/2022')),
  description: new FormGroup({
    name: new FormControl('test'),
    type: new FormControl('repair'),
    description: new FormControl('description'),
  }),
});

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        MatDatepickerModule,
      ],
      declarations: [
        MockPipe(TranslatePipe, (value) => value),
        PreviewComponent,
        TextFieldComponent,
        TwoColumnsComponent,
        FinalizeComponent,
        DatepickerComponent,
        IconComponent,
      ],
      providers: [
        MockProvider(LocalizationService),
        FormBuilderService,
        FormUtils,
      ],
    })
      .overrideTemplate(PreviewComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.form = form;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check getters', () => {
    it('should get descriptionGroup', () => {
      expect(component.descriptionGroup).toEqual(
        component.form.get('description')
      );
    });
    it('should get jobName', () => {
      expect(component.jobName).toEqual('test');
    });
    it('should get jobType', () => {
      expect(component.jobType).toEqual('repair');
    });
    it('should get jobDescription', () => {
      expect(component.jobDescription).toEqual('description');
    });
    it('should get auctionStartDate', () => {
      expect(component.auctionStartDate).toEqual(new Date('03/08/2022'));
    });
    it('should get auctionEndDate', () => {
      expect(component.auctionEndDate).toEqual(new Date('05/09/2022'));
    });
    it('should get auctionType', () => {
      expect(component.auctionType).toEqual('repair');
    });
  });

});

describe('PreviewComponent', () => {
  const deps = {
    imports: [
      TestModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatInputModule,
      MatDatepickerModule,
      TextMaskModule,
      MockModule(MatTableModule),
      MockModule(FlexLayoutModule),
    ],
    declarations: [
      MockPipe(TranslatePipe, (value) => value),
      CapitalizePipe,
      PreviewComponent,
      TextFieldComponent,
      TwoColumnsComponent,
      FinalizeComponent,
      DatepickerComponent,
      IconComponent,
      TrimInputDirective,
      NumberOnlyDirective,
    ],
    providers: [MockProvider(LocalizationService), FormBuilderService],
  };

  it('should render zipCode from boat info ', async () => {
    await render(PreviewComponent, {
      ...deps,
      componentProperties: {
        boat: {
          zipCode: '560069',
          address: 'FL, USA',
        },
        form: form,
      },
    });

    expect(screen.getByText('560069')).toBeInTheDocument();
  });

  it('should render address from boat info ', async () => {
    await render(PreviewComponent, {
      ...deps,
      componentProperties: {
        boat: {
          zipCode: '560069',
          address: 'FL, USA',
        },
        form: form,
      },
    });

    expect(screen.getByText('FL, USA')).toBeInTheDocument();
  });
});
