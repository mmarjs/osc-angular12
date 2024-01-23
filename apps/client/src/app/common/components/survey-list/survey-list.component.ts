import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconType } from '@ocean/icons';
import { noWhitespaceValidator } from '@ocean/shared/utils/no-whitespace-validator';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SurveyListComponent implements OnInit {
  @Output() submit = new EventEmitter<Array<any>>();
  @Input() form: FormGroup;
  @Input() isStarted: boolean;
  iconType = IconType;
  titlePlaceHolder = 'High-level description about the work that needs done';
  descriptionPlaceHolder =
    'Details describing any potential issue, roadblocks, or uncertainities';

  get surveyItems() {
    return this.form?.get('jobItems') as FormArray | undefined;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.surveyItems['controls'].forEach((fb: FormGroup) => {
      fb.get('title').setValidators([
        Validators.required,
        noWhitespaceValidator,
      ]);
      fb.get('description').setValidators([
        Validators.required,
        noWhitespaceValidator,
      ]);
    });
  }

  createSurveyGroup(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, noWhitespaceValidator]],
      description: ['', [Validators.required, noWhitespaceValidator]],
    });
  }

  addSurvey() {
    this.surveyItems.push(this.createSurveyGroup());
  }

  deleteSurvey(index) {
    this.surveyItems.removeAt(index);
  }
}
