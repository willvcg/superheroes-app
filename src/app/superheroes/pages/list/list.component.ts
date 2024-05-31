import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
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
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly superheroesService = inject(SuperheroesService);
  protected users$ = computed(() => this.superheroesService.getUsers());

  protected user$ = computed(() => this.superheroesService.getUser());

  protected createUser$ = computed(() => this.superheroesService.createUser());

  protected modifyUser$ = computed(() => this.superheroesService.modifyUser());

  protected deleteUser$ = computed(() => this.superheroesService.deleteUser());
}
