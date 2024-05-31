import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-superheroes',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './superheroes.component.html',
  styleUrl: './superheroes.component.scss',
})
export class SuperheroesComponent {}
