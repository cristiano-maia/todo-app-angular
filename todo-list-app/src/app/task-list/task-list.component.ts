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

  constructor(private tarefaService: TarefaService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.tarefaService.obterTarefas().subscribe((tarefas: Tarefa[]) => {
      this.tarefas = tarefas;
    });
  }

  excluirTarefa(indice: number) {
    this.tarefaService.excluirTarefa(indice);
  }

  concluirTarefa(indice: number) {
    const tarefa = this.tarefas[indice];
    tarefa.status = 'concluida'; 
    this.tarefaService.editarTarefa(indice, tarefa);
  }

  editarTarefa(indice: number) {
    const tarefa = this.tarefas[indice];
    this.tarefaService.definirTarefaParaEdicao(tarefa, indice);
    this.router.navigate(['/tasks', indice, 'edit']);
  }

  fazerLogout() {
    this.authService.logout();
  }

  navegarParaNovaTarefa() {
    this.router.navigate(['/tasks/new']);
  }
}
