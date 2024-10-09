import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../task.service';
import { Tarefa } from '../tarefa.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Importando o AuthService
import { NgxPaginationModule } from 'ngx-pagination'; // Importando o NgxPaginationModule

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule], // Incluindo o NgxPaginationModule
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tarefas: Tarefa[] = [];
  page: number = 1; // Variável para a paginação
  itensPorPagina: number = 5; // Número de itens por página

  constructor(private tarefaService: TarefaService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.tarefaService.obterTarefas().subscribe((tarefas: Tarefa[]) => {
      this.tarefas = tarefas;
    });
  }

  excluirTarefa(indiceRelativo: number) {
    // Calcular o índice absoluto com base na página atual e no número de itens por página
    const indiceAbsoluto = (this.page - 1) * this.itensPorPagina + indiceRelativo;

    this.tarefaService.excluirTarefa(indiceAbsoluto); // Remove a tarefa com o índice absoluto
  }

  concluirTarefa(indiceRelativo: number) {
    // Calcular o índice absoluto com base na página atual e no número de itens por página
    const indiceAbsoluto = (this.page - 1) * this.itensPorPagina + indiceRelativo;

    const tarefa = this.tarefas[indiceAbsoluto];
    tarefa.status = 'concluida'; 
    this.tarefaService.editarTarefa(indiceAbsoluto, tarefa); // Atualizar tarefa com índice absoluto
  }

  editarTarefa(indiceRelativo: number) {
    // Calcular o índice absoluto com base na página atual e no número de itens por página
    const indiceAbsoluto = (this.page - 1) * this.itensPorPagina + indiceRelativo;

    const tarefa = this.tarefas[indiceAbsoluto];
    this.tarefaService.definirTarefaParaEdicao(tarefa, indiceAbsoluto);
    this.router.navigate(['/tasks', indiceAbsoluto, 'edit']);
  }

  fazerLogout() {
    this.authService.logout();
  }

  navegarParaNovaTarefa() {
    // Limpa o estado de edição ao navegar para adicionar nova tarefa
    this.tarefaService.definirTarefaParaEdicao(null, null); // Resetar tarefa e índice
    this.router.navigate(['/tasks/new']); // Navegar para a rota de nova tarefa
  }
}
