import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Treatment } from '../models/treatment.model';

const baseUrl = 'http://localhost:8080/api/treatments';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(baseUrl);
  }

  get(id: any): Observable<Treatment> {
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

  findByName(name: any): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${baseUrl}?name=${name}`);
  }
}
