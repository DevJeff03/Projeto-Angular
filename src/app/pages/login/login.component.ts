import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isChange: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;



  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      senha: ['', Validators.required],
      tipo: ['user'],
      foto_url: ['https://defc.ulpgc.es/wp-content/themes/defc-child/images/avatar.jpg']
    });
  }


  toggleChange() {
    this.isChange = !this.isChange;
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const token = response.access_token;
        localStorage.setItem('token', token);

        console.log('Login successful');
        console.log('isAuthenticated:', this.authService.isAuthenticated());
        console.log(token);

        // Obtenha as informações do usuário após o login bem-sucedido
        this.authService.getUserInfo(this.loginForm.value.email).subscribe({
          next: (userInfo) => {
            // Armazene as informações completas do usuário no serviço de autenticação
            this.authService.setCurrentUser(userInfo);

            alert('Login bem-sucedido, redirecionando para o cardápio');
            this.router.navigate(['/cardapio']);
          },
          error: (error) => {
            console.error('Erro ao obter informações do usuário:', error);
          }
        });
      },
      error: (error) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          alert('Usuário ou senha incorretos');
        }
      }
    });
  }

  onRegister() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        console.log('Registration successful');
        console.log('isAuthenticated:', this.authService.isAuthenticated());

        alert('Cadastro realizado com sucesso, redirecionando para o cardapio');
        this.router.navigate(['/cardapio']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }

}
