import { UpperCasePipe } from '@angular/common';
import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
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
    UpperCasePipe,
  ],
  templateUrl: './create-edit.component.html',
  styleUrl: './create-edit.component.scss',
})
export class CreateEditComponent implements OnInit {
  private readonly superheroesService = inject(SuperheroesService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);

  protected form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
  });

  protected editSuperheroe = computed(() => this.heroeSelectedId());

  protected heroeSelectedId = signal<string | null>(null);
  protected image = signal<string | null>(null);

  constructor() {
    this.fillForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.heroeSelectedId.set(params.get('id'));
    });
  }

  protected fillForm() {
    effect(() => {
      const heroeSelectedId = this.heroeSelectedId();
      if (!heroeSelectedId) return;
      this.superheroesService
        .getSuperheroById(heroeSelectedId)
        .pipe(
          tap((superheroe) => {
            if (!superheroe) return;
            const { name, fullName, publisher, image } = superheroe;
            this.form.patchValue({ name, fullName, publisher });
            this.image.set(image);
          })
        )
        .subscribe();
    });
  }

  protected onSubmit() {
    const { name, fullName, publisher } = this.form.value;
    if (!name || !fullName || !publisher || this.form.invalid) return;

    if (this.editSuperheroe()) {
      this.modifySuperheroe(name, fullName, publisher);
    } else {
      this.createSuperheroe(name, fullName, publisher);
    }
  }

  protected modifySuperheroe(
    name: string,
    fullName: string,
    publisher: string
  ) {
    const heroeSelectedId = this.heroeSelectedId();
    const image = this.image();
    if (!heroeSelectedId?.length || !image) return;
    this.superheroesService
      .modifySuperhero(heroeSelectedId, {
        id: heroeSelectedId,
        name,
        fullName,
        publisher,
        image,
      })
      .pipe(
        tap(() => {
          this.goList();
          this.openSnackBar();
        })
      )
      .subscribe();
  }

  protected createSuperheroe(
    name: string,
    fullName: string,
    publisher: string
  ) {
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
    if (this.editSuperheroe()) {
      this.router.navigate(['../../list'], {
        relativeTo: this.route,
      });
      return;
    } else {
      this.router.navigate(['../list'], {
        relativeTo: this.route,
      });
    }
  }

  protected openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5 * 1000,
      data: {
        id: '1',
        message: `Superheroe ${this.form.controls.name.value} ${
          this.editSuperheroe() ? 'editado' : 'creado'
        }`,
      },
    });
  }
}
