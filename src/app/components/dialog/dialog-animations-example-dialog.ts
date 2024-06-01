import { Component, Inject, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { SuperheroesService } from '../../services/superheroes.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
@Component({
	selector: 'dialog-animations-example-dialog',
	templateUrl: 'dialog-animations-example-dialog.html',
	standalone: true,
	imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent]
})
export class DialogComponent {
	private readonly superheroesService = inject(SuperheroesService);
	private readonly snackBar = inject(MatSnackBar);
	private durationInSeconds = signal(5);
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: { id: string; name: string; message: string },
		public dialogRef: MatDialogRef<DialogComponent>
	) {}

	protected deleteSuperheroe(): void {
		this.superheroesService
			.deleteSuperhero(this.data.id)
			.pipe(tap(() => this.openSnackBar()))
			.subscribe();
	}

	protected openSnackBar() {
		this.snackBar.openFromComponent(SnackbarComponent, {
			duration: this.durationInSeconds() * 1000,
			data: { id: this.data.id, message: `${this.data.name} borrado` }
		});
	}
}
