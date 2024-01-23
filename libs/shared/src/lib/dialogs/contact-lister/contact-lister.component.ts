import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-lister',
  templateUrl: './contact-lister.component.html',
  styleUrls: ['./contact-lister.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListerComponent implements OnInit {
  form: FormGroup;
  sendAs = [
    {
      title: 'Shipyard',
      value: 'Shipyard'
    },
    {
      title: 'Surveyor',
      value: 'Surveyor'
    }
  ];
  isSend: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ContactListerComponent>,
    private fb: FormBuilder
  ) {
  }
  onSend() {
    this.isSend = true;
    setTimeout(() => {
      this.dialogRef.close();
    }, 5000);
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

}
