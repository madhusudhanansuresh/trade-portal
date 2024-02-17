import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reason-dialog',
  templateUrl: './reason-dialog.component.html',
  styleUrl: './reason-dialog.component.scss'
})
export class ReasonDialogComponent {
  reason = new FormControl(''); // Initializes the form control
}
