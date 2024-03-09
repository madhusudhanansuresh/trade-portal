import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";



@Component({
  selector: "app-reason-dialog",
  templateUrl: "./reason-dialog.component.html",
  styleUrl: "./reason-dialog.component.scss",
})

export class ReasonDialogComponent {

  @ViewChild('reasonInput') reasonInput!: ElementRef;

  reason = new FormControl("", Validators.required);
  bullish = new FormControl(false);
  bearish = new FormControl(false);

  constructor(public dialogRef: MatDialogRef<ReasonDialogComponent>, private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.reasonInput.nativeElement.focus();
    }, 0);
  }
  

  closeDialog(): void {
    if (this.reason.valid) {
      const now = new Date();
      
      const timestamp = now.toLocaleString();
  
      let sentiment = ""; 
  
      if (this.bullish.value) {
        sentiment += "Bullish";
      }
      if (this.bearish.value) {       
        if (sentiment) {
          sentiment += " + ";
        }
        sentiment += "Bearish";
      }
  
      sentiment = sentiment || "None";
  
      const dialogResult = `${timestamp} - ${sentiment}: ${this.reason.value}`;
  
      this.dialogRef.close(dialogResult);
    }
  }
  
}
