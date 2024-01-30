import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  public userProfilePicture: string = '';

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
  // Ao inicializar, verifique se há um usuário autenticado
  if (this.authService.isAuthenticated()) {
    // Obter informações do usuário do serviço de autenticação
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.loadUserInfo(currentUser.email);
    }

    // Recuperar a URL da foto do localStorage
    const storedProfilePicture = localStorage.getItem('userProfilePicture');
    if (storedProfilePicture) {
      this.userProfilePicture = storedProfilePicture;
    }
  }

}

private loadUserInfo(email: string): void {
  console.log('Iniciando carregamento de informações do usuário...');

  this.authService.getUserInfo(email).subscribe({
    next: (userInfo) => {
      console.log('Informações do usuário:', userInfo);

      if (userInfo && userInfo.foto_url) {
        this.userProfilePicture = userInfo.foto_url;
        console.log('URL da foto do perfil:', this.userProfilePicture);
      } else {
        console.warn('As informações do usuário ou a URL da foto estão ausentes.');
      }
    },
    error: (error) => {
      console.error('Erro ao obter informações do usuário:', error);
    },
    complete: () => {
      console.log('Concluído o carregamento de informações do usuário.');
    }
  });
}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/cardapio']);
  }

}
