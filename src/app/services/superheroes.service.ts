import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateUpdateUserRequest,
  CreateUserResponse,
  GetUsersResponse,
  UsersData,
} from '../Models/superheroe.model';

export interface paramsPerPage {
  per_page: number;
}

export const defaultParamsPerPage: paramsPerPage = {
  per_page: 4,
};

export const defaultUser: CreateUpdateUserRequest = {
  name: 'Will',
  job: 'Developer',
};

@Injectable({
  providedIn: 'root',
})
export class SuperheroesService {
  protected readonly http = inject(HttpClient);

  private url = signal<string>('https://reqres.in/api/users');

  getUsers(
    pageId: number = 2,
    params: paramsPerPage = defaultParamsPerPage
  ): Observable<UsersData> {
    return this.http.get<UsersData>(`${this.url()}?page=${pageId}`, {
      params: { ...params },
    });
  }

  getUser(id: number = 2): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(`${this.url()}/${id}`);
  }

  createUser(
    body: CreateUpdateUserRequest = defaultUser
  ): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(this.url(), body);
  }

  modifyUser(id: number = 5, body: CreateUpdateUserRequest = defaultUser) {
    return this.http.put(`${this.url()}/${id}`, body);
  }

  deleteUser(id: number = 5) {
    return this.http.delete(`${this.url()}/${id}`);
  }
}
