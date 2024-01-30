import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  console.log('URL da Rota:', state.url);

  if (state.url === '/cardapio') {
    console.log('Permitindo acesso ao Cardápio sem autenticação.');
    return true;
  }

  if (this.authService.isAuthenticated()) {
    console.log('Usuário autenticado. Permitindo acesso.');
    return true;
  } else {
    console.log('Usuário não autenticado. Redirecionando para /login.');
    this.router.navigate(['/login']);
    return false;
  }
}
}
