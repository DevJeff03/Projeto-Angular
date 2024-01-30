import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, senha: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);

          // Atualizar o usuário e notificar os observadores
          this.setCurrentUser(response.user); // Supondo que a resposta contém informações do usuário

        }
      })
    );
  }

  register(userDetails: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/clientes`, userDetails, { headers });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  getUserInfo(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cliente/${email}`);
  }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserObservable(): Observable<any> {
    return this.currentUser$;
  }

  logout(): void {
    // Limpar o token de acesso do localStorage
    localStorage.removeItem('access_token');

    // Notificar os observadores que o usuário não está mais autenticado
    this.setCurrentUser(null);
  }
}
