import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'superheroes',
    loadComponent: () =>
      import('./superheroes/superheroes.component').then(
        (m) => m.SuperheroesComponent
      ),
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./superheroes/pages/list/list.component').then(
            (c) => c.ListComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./superheroes/pages/create-edit/create-edit.component').then(
            (c) => c.CreateEditComponent
          ),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./superheroes/pages/create-edit/create-edit.component').then(
            (c) => c.CreateEditComponent
          ),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('./superheroes/pages/detail/detail.component').then(
            (c) => c.DetailComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: 'superheroes/list', pathMatch: 'full' },
  { path: '**', redirectTo: 'superheroes/list' },
];
