import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../models/provider.model';

const baseUrl = 'http://localhost:8080/api/providers';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(baseUrl);
  }

  get(id: any): Observable<Provider> {
    console.log("id:");
    console.log(id);
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: any): Observable<Provider[]> {
    return this.http.get<Provider[]>(`${baseUrl}?name=${name}`);
  }
}
