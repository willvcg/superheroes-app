import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { superheroe } from '../../../Models/superheroe.model';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';
import { SuperheroesService } from '../../../services/superheroes.service';

const image = 'https://www.superherodb.com/pictures2/portraits/10/100/1007.jpg';
@Component({
  selector: 'app-create-edit',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatError,
  ],
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss',
})
export class CreateEditComponent {
  private readonly superheroesService = inject(SuperheroesService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
  });

  protected onSubmit() {
    const { name, fullName, publisher } = this.form.value;
    if (!name || !fullName || !publisher || this.form.invalid) return;
    const id = crypto.randomUUID();
    const superheroe: superheroe = { id, name, fullName, publisher, image };

    this.superheroesService
      .createSuperhero(superheroe)
      .pipe(
        tap(() => {
          this.goList();
          this.openSnackBar();
        })
      )
      .subscribe();
  }

  protected goList(): void {
    this.router.navigate(['../list'], {
      relativeTo: this.route,
    });
  }

  protected openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5 * 1000,
      data: {
        id: '1',
        message: `Superheroe ${this.form.controls.name.value} creado`,
      },
    });
  }
}
