import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root', // Permite que o AuthService seja injetado em qualquer parte da aplicação
})
export class AuthService {
  // Variável para armazenar o status de login
  private autenticado = false;

  // Dados de login mock (simulados) para fins de teste
  private usuarioMock = 'admin';
  private senhaMock = '123456';

  constructor(private router: Router) {}

  // Função para verificar se o usuário está logado
  estaAutenticado(): boolean {
    return this.autenticado; // Retorna o status de autenticação
  }

  // Função para realizar o login
  login(usuario: string, senha: string): Observable<boolean> {
    // Verificação dos dados de login (usuário e senha)
    if (usuario === this.usuarioMock && senha === this.senhaMock) {
      this.autenticado = true; // Define que o usuário está autenticado
      return of(true); // Retorna um Observable com o valor true
    }
    // Caso os dados sejam inválidos, retorna um Observable com false
    return of(false);
  }

  // Função para realizar o logout
  logout(): void {
    this.autenticado = false; // Define que o usuário não está mais autenticado
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
}
