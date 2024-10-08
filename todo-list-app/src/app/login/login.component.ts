import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: string = ''; // Modelo para o campo de usuário
  senha: string = ''; // Modelo para o campo de senha
  erroLogin: boolean = false; // Variável para controlar erro de login
  loginSucesso: boolean = false; // Variável para controlar sucesso de login

  constructor(private authService: AuthService, private router: Router) {}

  // Função para fazer login
  fazerLogin() {
    this.authService.login(this.usuario, this.senha).subscribe((resultado) => {
      if (resultado) {
        this.erroLogin = false; // Não há erro de login
        this.loginSucesso = true; // Login bem-sucedido
        this.router.navigate(['/tasks']); // Redireciona para a lista de tarefas após login bem-sucedido
      } else {
        this.erroLogin = true; // Ativa a mensagem de erro
        this.loginSucesso = false; // Reseta a variável de sucesso
      }
    });
  }
  
  // Função para realizar logout (opcional, caso queira implementar aqui)
  fazerLogout() {
    this.authService.logout(); // Chama o método logout do AuthService
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
