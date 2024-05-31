import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: 'snackbar.component.html',
  styles: `
      :host {
        display: flex;
      }
  
      .example-pizza-party {
        color: hotpink;
      }
    `,
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
})
export class SnackbarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
