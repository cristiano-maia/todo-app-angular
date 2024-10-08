import { Component } from '@angular/core';
import { Tarefa } from './tarefa.model'; // Importe o modelo de Tarefa
import { RouterModule } from '@angular/router'; // Importe RouterModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Definindo como componente standalone
  imports: [RouterModule] // Adicionando RouterModule aos imports
})
export class AppComponent {
  title = 'Denvolvimento Angular';
  tarefas: Tarefa[] = []; // Lista de tarefas
  atualPagina: number = 1; // Adicionando a propriedade atualPagina
  tarefasPorPagina: number = 5; // Número de tarefas por página

  // Método para paginar as tarefas
  get tarefasPaginas() {
    const inicio = (this.atualPagina - 1) * this.tarefasPorPagina;
    return this.tarefas.slice(inicio, inicio + this.tarefasPorPagina);
  }

  // Método para ir para a próxima página
  proximaPagina() {
    this.atualPagina++;
  }

  // Método para voltar à página anterior
  paginaAnterior() {
    if (this.atualPagina > 1) {
      this.atualPagina--;
    }
  }

  // Método para definir a página atual
  definirPagina(pagina: number) {
    this.atualPagina = pagina;
  }

  // Método para resetar a página
  resetarPagina() {
    this.atualPagina = 1;
  }

  constructor() {
    this.resetarPagina(); // Garante que a página inicial seja sempre a 1
  }
}
