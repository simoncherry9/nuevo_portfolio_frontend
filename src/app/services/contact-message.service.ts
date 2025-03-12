import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessage } from '../interfaces/contact-message';

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  private apiUrl = 'http://localhost:3001/api/contact'; 

  constructor(private http: HttpClient) {}

  getMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(this.apiUrl);
  }

  getMessageById(id: number): Observable<ContactMessage> {
    return this.http.get<ContactMessage>(`${this.apiUrl}/${id}`);
  }

  createMessage(message: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(this.apiUrl, message);
  }

  updateMessage(id: number, message: ContactMessage): Observable<ContactMessage> {
    return this.http.put<ContactMessage>(`${this.apiUrl}/${id}`, message);
  }

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
