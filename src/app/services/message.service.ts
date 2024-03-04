import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class MessageService {
    constructor(private snackBar: MatSnackBar, private router: Router) { }

    showOkMessage(message: string): void {
        this.snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: 'center',
            panelClass: 'success-snackbar'            
        });
    }

    showErrorMessage(message = 'An error occurred. Please try again later'): void {
        this.snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: 'center',
            panelClass:'error-snackbar'
        });
    }


}