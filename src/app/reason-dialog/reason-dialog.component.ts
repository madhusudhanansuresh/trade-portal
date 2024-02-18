import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reason-dialog',
  templateUrl: './reason-dialog.component.html',
  styleUrl: './reason-dialog.component.scss'
})
export class ReasonDialogComponent {
  reason = new FormControl('', Validators.required); // Initializes the form control

  constructor(public dialogRef: MatDialogRef<ReasonDialogComponent>) {}


  closeDialog(): void {
    if (this.reason.valid) {
      this.dialogRef.close(this.reason.value);
    }
  }

}
