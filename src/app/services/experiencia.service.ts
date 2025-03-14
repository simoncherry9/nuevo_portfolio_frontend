import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experience } from '../interfaces/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = 'http://localhost:3001/api/experience';

  constructor(private http: HttpClient) {}

  getAllExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }

  getActiveExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/active`);
  }

  addExperience(experience: Experience): Observable<any> {
    return this.http.post(this.apiUrl, experience);
  }

  updateExperience(id: number, experience: Partial<Experience>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, experience);
  }

  deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
