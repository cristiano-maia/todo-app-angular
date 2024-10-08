import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root', // Permite que o AuthGuard seja injetado em qualquer parte da aplicação
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Método que determina se a rota pode ser ativada
  canActivate(): boolean {
    if (this.authService.estaAutenticado()) {
      return true; // Permite acesso se o usuário estiver autenticado
    } else {
      this.router.navigate(['/login']); // Redireciona para o login se não estiver autenticado
      return false; // Bloqueia o acesso à rota
    }
  }
}
