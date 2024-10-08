import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TarefaService } from '../task.service';
import { Tarefa } from '../tarefa.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true, // Definindo o componente como standalone
  imports: [CommonModule, ReactiveFormsModule], // Incluindo o ReactiveFormsModule
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup; // Formulário reativo para as tarefas
  indiceEdicao: number | null = null; // Armazena o índice da tarefa em edição

  constructor(private fb: FormBuilder, private tarefaService: TarefaService, private router: Router) {
    // Inicializando o formulário com validação
    this.taskForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      status: ['pendente'] // Define o valor padrão do status como "pendente"
    });
  }

  ngOnInit(): void {
    // Obtém a tarefa para edição a partir do serviço
    this.tarefaService.obterTarefaParaEdicao().subscribe((data) => {
      if (data) {
        this.taskForm.patchValue(data.tarefa); // Preenche o formulário com os dados da tarefa
        this.indiceEdicao = data.indice; // Armazena o índice da tarefa em edição
      }
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const tarefa: Tarefa = this.taskForm.value; // Obtém os dados do formulário

      // Verifica se o status é "concluída"
      if (tarefa.status === 'concluida') {
        tarefa.status = 'concluida';
      }

      if (this.indiceEdicao !== null) {
        this.tarefaService.editarTarefa(this.indiceEdicao, tarefa); // Edita a tarefa existente
        this.indiceEdicao = null; // Reseta o índice de edição
      } else {
        this.tarefaService.adicionarTarefa(tarefa); // Adiciona uma nova tarefa
      }

      // Reseta o formulário após adicionar/editar a tarefa
      this.taskForm.reset({
        titulo: '',
        descricao: '',
        status: 'pendente' // Reseta o status para "pendente"
      });

      // Redireciona para a lista de tarefas após salvar
      this.router.navigate(['/tasks']);
    }
  }
}
