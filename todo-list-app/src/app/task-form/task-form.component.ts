import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TarefaService } from '../task.service';
import { Tarefa } from '../tarefa.model';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'; // Incluindo ActivatedRoute para manipular rotas

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  indiceEdicao: number | null = null;

  constructor(
    private fb: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute // Para detectar mudanças de rota
  ) {
    this.taskForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      status: ['pendente']
    });
  }

  ngOnInit(): void {
    // Forçar a não reutilização da rota ao acessar este componente
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.tarefaService.obterTarefaParaEdicao().subscribe((data) => {
      if (data && data.tarefa) {
        this.taskForm.patchValue(data.tarefa); // Preenche o formulário com os dados da tarefa
        this.indiceEdicao = data.indice; // Armazena o índice da tarefa em edição
      } else {
        this.resetarFormulario(); // Reseta o formulário se não houver tarefa para editar
      }
    });
  }

  resetarFormulario() {
    this.taskForm.reset({
      titulo: '',
      descricao: '',
      status: 'pendente'
    });
    this.indiceEdicao = null;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const tarefa: Tarefa = this.taskForm.value;

      if (this.indiceEdicao !== null) {
        this.tarefaService.editarTarefa(this.indiceEdicao, tarefa); // Edita a tarefa existente
      } else {
        this.tarefaService.adicionarTarefa(tarefa); // Adiciona uma nova tarefa
      }

      this.resetarFormulario();

      this.router.navigate(['/tasks']);
    }
  }

  // Método para cancelar e redirecionar para a lista de tarefas
  cancelar(): void {
    this.router.navigate(['/tasks']); // Redireciona para a lista de tarefas sem salvar
  }
}
