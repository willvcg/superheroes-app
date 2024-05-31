import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperheroesService } from '../../services/superheroes.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class DialogComponent {
  private readonly superheroesService = inject(SuperheroesService);
  private readonly snackBar = inject(MatSnackBar);
  private durationInSeconds = signal(5);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}

  protected deleteUser(): void {
    this.superheroesService.deleteUser(this.data.id);
    this.openSnackBar();
  }

  protected openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds() * 1000,
    });
  }
}
