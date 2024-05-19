import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IconType } from '@ocean/icons';

@Component({
  selector: 'app-contact-lister',
  templateUrl: './contact-lister.component.html',
  styleUrls: ['./contact-lister.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListerComponent implements OnInit {
  readonly iconType = IconType;

  isSend?: boolean;
  form?: FormGroup;

  constructor(
    public readonly dialogRef: MatDialogRef<ContactListerComponent>,
    private readonly fb: FormBuilder
  ) {}

  onSend() {
    this.isSend = true;
    setTimeout(() => {
      this.dialogRef.close();
    }, 5000);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }
}
