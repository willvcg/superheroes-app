import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, Inject, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SuperheroesService } from '../../../services/superheroes.service';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly superheroesService = inject(SuperheroesService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  protected users$ = computed(() => this.superheroesService.getUsers());

  protected user$ = computed(() => this.superheroesService.getUser());

  protected createUser$ = computed(() => this.superheroesService.createUser());

  protected modifyUser$ = computed(() => this.superheroesService.modifyUser());

  protected deleteUser$ = computed(() => this.superheroesService.deleteUser());

  protected goEdit(id: number): void {
    this.router.navigate(['../edit', id], {
      relativeTo: this.route,
    });
  }

  protected goCreate(): void {
    this.router.navigate(['../create'], {
      relativeTo: this.route,
    });
  }

  protected openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: number
  ): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id },
    });
  }
}

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
