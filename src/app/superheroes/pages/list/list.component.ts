import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debouncedSignal } from '../../../Utils/utils';
import { DialogComponent } from '../../../components/dialog/dialog-animations-example-dialog';
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
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly superheroesService = inject(SuperheroesService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  protected searchValue = signal<string>('');
  protected debouncedSearchValue = debouncedSignal(this.searchValue);
  protected superHeroes$ = computed(() => {
    const debouncedSearchValue = this.debouncedSearchValue();
    if (debouncedSearchValue) {
      return this.superheroesService.getSuperheroesByName(debouncedSearchValue);
    }
    return this.superheroesService.getSuperheroes();
  });

  protected goEdit(id: string): void {
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
    id: string,
    name: string
  ): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id,
        name,
        message: `¿Estás seguro de que quieres borrar ${name}?`,
      },
    });
  }
}
