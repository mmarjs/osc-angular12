import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Boat } from '@ocean/api/shared';
import { NotifierService } from '@ocean/shared/services';
import {
  EditableFieldModel,
  FormBuilderService,
  FormFieldGroupTypes,
  FormFieldListModel,
  FormFieldModel,
  FormFieldsService
} from '@ocean/libs/form-builder';
import { BoatsFacade } from '@ocean/client/state';
import { BehaviorSubject, catchError, combineLatestWith, EMPTY, tap, zip } from 'rxjs';
import { FormUtils, postcodeExist } from '@ocean/shared';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { countryEntityToISO } from '@ocean/shared/utils/country-to-iso';
import { stringToCountryField } from '@ocean/shared/utils/string-to-country-field';
import { normalizeBoatLength } from '@ocean/shared/utils/boat-length-validator';
import { boatFields } from '@ocean/forms-config';
import { SharedCreateBoatForm } from '../shared-form';

type BoatFields = typeof boatFields;

type Fields = {
  [K in keyof Pick<BoatFields, 'name' | 'length' | 'type' | 'makeModelYear' | 'address' | 'country' | 'zipCode'>]: EditableFieldModel;
};

@Component({
  selector: 'app-boat-info',
  templateUrl: './boat-info.component.html',
  styleUrls: ['./boat-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoatInfoComponent implements OnInit, OnDestroy {
  private readonly isEditing$ = new BehaviorSubject<boolean>(false);

  @Output() updateJobTitle = new EventEmitter<string>();

  @Input() title: string;
  @Input() hasMainImage: boolean;
  @Input() form: FormGroup;

  @Input() set boat(value: Boat) {
    const country = stringToCountryField(value?.country);

    this.boatInfoForm?.patchValue({
      name: value?.name ?? 'unknown',
      length: value?.length ?? '1',
      type: value?.type ?? 'unknown',
      makeModelYear: value?.makeModelYear ?? 1960,
      address: value?.address ?? 'unknown',
      zipCode: postcodeExist(country.alpha2Code) ? (value?.zipCode ?? '0000') : '0000',
      country,
    });

    this._boat = value;
  }

  get boat() {
    return this._boat;
  }

  get jobName() {
    return this.form?.get('name')?.value;
  }

  get jobDescription() {
    return this.form?.get('description')?.value;
  }

  get mediasForm() {
    return this.form?.get('medias') as FormGroup;
  }

  get files(): FormArray {
    return this.mediasForm?.get('files') as FormArray;
  }

  private _boat: Boat;

  isLoading$ = new BehaviorSubject<boolean>(false);

  formFields: FormFieldListModel<Fields, FormFieldModel> | undefined;

  boatInfoForm: FormGroup | undefined;

  constructor(
    private readonly notifier: NotifierService,
    private readonly formBuilderService: FormBuilderService,
    private readonly boatFacade: BoatsFacade,
    private readonly fieldsService: FormFieldsService<BoatFields>,
    private readonly sharedForm: SharedCreateBoatForm
  ) {
    this.fieldsService.init(boatFields);
    this.init();
  }

  ngOnInit() {
    this.boatInfoForm?.markAllAsTouched();
    this.handleUpdatedBoat();

    this.fieldsService.validateWhenCountryChanged(
      this.boatInfoForm?.get('country'),
      this.boatInfoForm?.get('zipCode')
    )?.subscribe();

    this.boatInfoForm
      ?.statusChanges
      .pipe(
        combineLatestWith(this.isEditing$),
        untilDestroyed(this)
      )
      .subscribe(([_, isEditing]) => {
        if (isEditing || !this.boatInfoForm?.valid) {
          this.sharedForm.form?.get('description.syncing')?.setErrors({
            invalid: true
          });
        } else {
          this.sharedForm.form?.get('description.syncing')?.setErrors(null);
        }
      });
  }

  ngOnDestroy() {
    this.isLoading$.complete();
    this.isEditing$.complete();
  }

  private init() {
    this.formFields = this.fieldsService.rewrite({
      name: {
        order: 0,
        type: FormFieldGroupTypes.editable,
        label: 'FORMS.LABELS.NAME',
        cssClassName: 'trim-text',
        isEditing: false,
        onStartEditing: ignoredFieldName => this.excludeFieldsFromEdit(ignoredFieldName),
        onDoneEditing: name => this.patchBoatValue('name', name)
      },
      length: {
        order: 1,
        type: FormFieldGroupTypes.editable,
        cssClassName: 'trim-text',
        isEditing: false,
        onStartEditing: ignoredFieldName => this.excludeFieldsFromEdit(ignoredFieldName),
        onDoneEditing: length => this.patchBoatValue('length', normalizeBoatLength(length))
      },
      type: {
        order: 2,
        type: FormFieldGroupTypes.editable,
        label: 'FORMS.LABELS.TYPE',
        cssClassName: 'trim-text',
        isEditing: false,
        onStartEditing: ignoredFieldName => this.excludeFieldsFromEdit(ignoredFieldName),
        onDoneEditing: type => this.patchBoatValue('type', type)
      },
      makeModelYear: {
        order: 3,
        type: FormFieldGroupTypes.editable,
        cssClassName: 'trim-text',
        isEditing: false,
        onStartEditing: ignoredFieldName => this.excludeFieldsFromEdit(ignoredFieldName),
        onDoneEditing: year => this.patchBoatValue('makeModelYear', year)
      },
      address: {
        order: 4,
        type: FormFieldGroupTypes.editable,
        isEditing: false,
        onStartEditing: ignoredFieldName => this.excludeFieldsFromEdit(ignoredFieldName),
        onDoneEditing: address => this.patchBoatValue('address', address)
      },
      country: {
        order: 5,
        type: FormFieldGroupTypes.country,
        cssClassName: 'column-wrapper',
        onCountryChange: country => this.patchBoatValue('country', countryEntityToISO(country))
      },
      zipCode: {
        order: 6,
        type: FormFieldGroupTypes.editable,
        isEditing: false,
        onStartEditing: ignoredFieldName => this.excludeFieldsFromEdit(ignoredFieldName),
        onDoneEditing: zipCode => this.patchBoatValue('zipCode', zipCode ?? '0000')
      }
    });

    this.boatInfoForm = this.formBuilderService.buildReactiveForm(this.formFields);
  }

  private patchBoatValue<K extends keyof Boat>(key: K, value: unknown): void {
    if (typeof value !== 'string' || this.boat?.[key] === value) {
      this.resetFieldsToEditableState();
      FormUtils.validateZipCtrlByCountry(this.boatInfoForm?.get('country')?.value, this.boatInfoForm?.get('zip'));
      return;
    }

    this.boatFacade.update({
      ...this.boat,
      [key]: value
    });

    this.changeLoadingStatusTo(true);
  }

  private excludeFieldsFromEdit(ignoredFieldName: string) {
    const {[ignoredFieldName]: _, ...rest} = this.boatInfoForm?.value ?? {};

    for (const key of Object.keys(rest)) {
      this.boatInfoForm?.controls?.[key]?.disable();
    }

    this.isEditing$.next(true);
  }

  private resetFieldsToEditableState() {
    for (const key of Object.keys(this.formFields)) {
      this.boatInfoForm?.controls?.[key]?.enable();
    }

    this.isEditing$.next(false);
  }

  private handleUpdatedBoat() {
    this.boatFacade
      .updatedItem$
      .pipe(
        tap(() => this.changeLoadingStatusTo(false)),
        catchError(() => {
          this.changeLoadingStatusTo(false);
          return EMPTY;
        }),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.resetFieldsToEditableState();
      });
  }

  private changeLoadingStatusTo(status: boolean) {
    this.isLoading$.next(status);

    if (status) {
      this.boatInfoForm?.disable();
    } else {
      this.boatInfoForm?.enable();
    }
  }
}
