import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SuperheroesService } from '../../services/superheroes.service';
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
export class DialogAnimationsExampleDialog {
  private readonly superheroesService = inject(SuperheroesService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>
  ) {}

  protected deleteUser(): void {
    this.superheroesService.deleteUser(this.data.id);
  }
}
