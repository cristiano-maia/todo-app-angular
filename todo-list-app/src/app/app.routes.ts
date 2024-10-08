import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { AuthGuard } from './auth.guard'; // Importa o AuthGuard para proteção das rotas

// Define as rotas da aplicação
export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Rota para o componente de login
  { 
    path: 'tasks', 
    component: TaskListComponent, 
    canActivate: [AuthGuard] // Protege a rota, permitindo acesso apenas a usuários autenticados
  }, 
  { 
    path: 'tasks/new', 
    component: TaskFormComponent, 
    canActivate: [AuthGuard] // Protege a rota, permitindo acesso apenas a usuários autenticados
  }, 
  { 
    path: 'tasks/:id/edit', 
    component: TaskFormComponent, 
    canActivate: [AuthGuard] // Protege a rota, permitindo acesso apenas a usuários autenticados
  }, 
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' // Redireciona para o login se a rota estiver vazia
  }, 
  { 
    path: '**', 
    redirectTo: 'login' // Redireciona qualquer rota desconhecida para o login
  } 
];
