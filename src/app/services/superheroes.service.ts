import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { superheroe } from '../Models/superheroe.model';

@Injectable({
  providedIn: 'root',
})
export class SuperheroesService {
  protected readonly http = inject(HttpClient);

  protected superheroes_mock = signal<superheroe[]>([
    {
      id: '1',
      name: 'Batman II',
      fullName: 'Dick Grayson',
      publisher: 'Nightwing',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/1496.jpg',
    },
    {
      id: '2',
      name: 'Aquaman',
      fullName: 'Orin',
      publisher: 'DC Comics',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/634.jpg',
    },
    {
      id: '3',
      name: 'Spider-Man',
      fullName: 'Peter Parker',
      publisher: 'Marvel Comics',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg',
    },
    {
      id: '4',
      name: 'Captain America',
      fullName: 'Steve Rogers',
      publisher: 'Marvel Comics',
      image: 'https://www.superherodb.com/pictures2/portraits/10/100/274.jpg',
    },
  ]);

  getSuperheroes(): Observable<superheroe[]> {
    return of(this.superheroes_mock()).pipe(delay(300));
  }

  getSuperheroesByName(name: string): Observable<superheroe[]> {
    const filteredSuperheroes = this.superheroes_mock().filter((hero) =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    );
    return of(filteredSuperheroes).pipe(delay(300));
  }

  getSuperheroById(id: string): Observable<superheroe | undefined> {
    const superhero = this.superheroes_mock().find((hero) => hero.id === id);
    return of(superhero).pipe(delay(300));
  }

  createSuperhero(newSuperhero: superheroe): Observable<{ success: boolean }> {
    this.superheroes_mock().push(newSuperhero);
    return of({ success: true }).pipe(delay(300));
  }

  modifySuperhero(
    id: string,
    updatedSuperhero: superheroe
  ): Observable<{ success: boolean }> {
    const index = this.superheroes_mock().findIndex((hero) => hero.id === id);
    if (index !== -1) {
      this.superheroes_mock()[index] = updatedSuperhero;
    }
    return of({ success: true }).pipe(delay(300));
  }

  deleteSuperhero(id: string): Observable<{ success: boolean }> {
    const filteredSuperheroes = this.superheroes_mock().filter(
      (hero) => hero.id !== id
    );
    this.superheroes_mock.set(filteredSuperheroes);
    return of({ success: true }).pipe(delay(300));
  }
}
