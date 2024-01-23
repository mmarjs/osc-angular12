import { EventEmitter } from '@angular/core';
import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick
} from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { TranslatePipe } from '@ngx-translate/core';
import { AppFormsModule } from '@ocean/client/common/forms';
import { LocalizationService } from '@ocean/internationalization';
import { TwoColumnsComponent } from '@ocean/layout';
import { TextFieldComponent } from '@ocean/shared/forms';
import { DatepickerComponent } from '@ocean/shared/forms/fields/datepicker/datepicker.component';
import { CapitalizePipe } from '@ocean/shared/pipes';
import { TestModule } from '@ocean/testing/helpers/test.module';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IconComponent } from 'libs/icons/src/lib/icon/icon.component';
import { MockModule, MockPipe, MockProvider } from 'ng-mocks';
import { FinalizeComponent } from '../finalize';
import { PreviewComponent } from './preview.component';


const form = new FormGroup({
  auctionStartDate: new FormControl('03/08/2022'),
  auctionEndDate: new FormControl('05/09/2022'),
  description: new FormGroup({
    name: new FormControl('test'),
    type: new FormControl('repair'),
    description: new FormControl('description'),
  }),
  information: new FormGroup({
    jobItems: new FormControl({
      title: 'title',
      description: 'description',
    }),
  }),
});

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [PreviewComponent],
      providers: [MockProvider(LocalizationService)],
    })
      .overrideTemplate(PreviewComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    component.form = form;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('check boat', () => {
    it('should update boat', fakeAsync(() => {
      const boat = {
        id: 4010,
        name: 'DDDD',
        makeModelYear: '2022',
        type: 'qqqq',
        length: '122',
        address: 'Vishakapatnam',
        address2: '',
        city: 'Bangalore',
        state: 'Karnataka',
        zipCode: '560069',
        about: 'ddddd',
        images: [],
      };
      component.boat = boat;
      tick();
      expect(component.boat).toEqual(boat);
    }));
  });

  describe('check getters', () => {
    it('should get descriptionGroup', fakeAsync(() => {
      tick();
      expect(component.descriptionGroup).toEqual(
        component.form.get('description')
      );
    }));
    it('should get informationGroup', fakeAsync(() => {
      tick();
      expect(component.informationGroup).toEqual(
        component.form.get('information')
      );
    }));
    it('should get jobName', fakeAsync(() => {
      tick();
      expect(component.jobName).toEqual('test');
    }));
    it('should get jobType', fakeAsync(() => {
      tick();
      expect(component.jobType).toEqual('repair');
    }));
    it('should get jobDescription', fakeAsync(() => {
      tick();
      expect(component.jobDescription).toEqual('description');
    }));
    it('should get auctionEndDate', fakeAsync(() => {
      tick();
      expect(component.auctionEndDate).toEqual('05/09/2022');
    }));
    it('should get jobItems', fakeAsync(() => {
      tick();
      expect(component.jobItems).toEqual({
        title: 'title',
        description: 'description',
      });
    }));
    it('should get auctionType', fakeAsync(() => {
      tick();
      expect(component.auctionType).toEqual('repair');
    }));
  });

  describe('check handleUpdateZip', () => {
    it('isEditZipCode to be false and updateZip should emit', () => {
      const spy = jest.spyOn(component.updateZip, 'emit');
      component.handleUpdateZip();
      expect(component.isEditZipCode).toBeFalsy();
      expect(spy).toBeCalled();
    });
  });

  describe('check handleUpdateLocation', () => {
    it('isEditZipCode to be false and updateZip should emit', () => {
      const spy = jest.spyOn(component.updateLocation, 'emit');
      component.handleUpdateLocation();
      expect(component.isEditLocation).toBeFalsy();
      expect(spy).toBeCalled();
    });
  });

  describe('Address form', () => {
    it('should allow more 6 characters for zipcode', () => {
      component.addressForm.get('address').setValue('test address');
      component.addressForm.get('zipCode').setValue('123456');
      expect(component.addressForm.valid).toBeTruthy();
    });

    it('should not allow more than 6 characters for zipcode', () => {
      component.addressForm.get('address').setValue('test address');
      component.addressForm.get('zipCode').setValue('1234567');
      expect(component.addressForm.invalid).toBeTruthy();
    });

    it('should allow less than 6 characters for zipcode', () => {
      component.addressForm.get('address').setValue('test address');
      component.addressForm.get('zipCode').setValue('12345');
      expect(component.addressForm.valid).toBeTruthy();
    });
  });
});

describe('PreviewComponent', () => {
  const deps = {
    imports: [
      TestModule,
      ReactiveFormsModule,
      AppFormsModule,
      MatNativeDateModule,
      MockModule(MatTableModule),
      MockModule(FlexLayoutModule),
    ],
    declarations: [
      MockPipe(TranslatePipe, (value) => value),
      CapitalizePipe,
      TextFieldComponent,
      TwoColumnsComponent,
      FinalizeComponent,
      DatepickerComponent,
      IconComponent,
    ],
    providers: [MockProvider(LocalizationService)],
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

    expect(screen.queryByText('560069')).toBeInTheDocument();
  });

  it.each`
    zipCode
    ${'56006912345678'}
    ${'560069ga@'}
    ${'_-560069'}
  `(
    'should disabled ok button when "$zipCode" invalid value typed in',
    async ({ zipCode }) => {
      await render(PreviewComponent, {
        ...deps,
        componentProperties: {
          boat: {
            zipCode: '560069',
            address: 'FL, USA',
          },
          form,
        },
      });

      await userEvent.click(screen.getByTestId('zipcode-edit'));
      expect(screen.getByTestId('zipcode-ok')).not.toHaveClass('disable');

      const input = screen.getByDisplayValue('560069');
      await userEvent.clear(input);
      await userEvent.type(input, zipCode);

      expect(screen.getByTestId('zipcode-ok')).toHaveClass('disable');
    }
  );

  it('should emit on zipcode save', async () => {
    const updateZipMockEvent = new EventEmitter<string>();
    jest.spyOn(updateZipMockEvent, 'emit');

    await render(PreviewComponent, {
      ...deps,
      componentProperties: {
        boat: {
          zipCode: '560069',
          address: 'FL, USA',
        },
        form,
        updateZip: updateZipMockEvent,
      },
    });

    await userEvent.click(screen.getByTestId('zipcode-edit'));

    const input = screen.getByDisplayValue('560069');
    await userEvent.clear(input);
    await userEvent.type(input, '123456');

    await userEvent.click(screen.getByTestId('zipcode-ok'));

    expect(updateZipMockEvent.emit).toHaveBeenCalledWith('123456');
  });
});
