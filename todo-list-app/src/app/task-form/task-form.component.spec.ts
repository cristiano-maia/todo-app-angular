import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { TarefaService } from '../task.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Descreve o conjunto de testes para o TaskFormComponent
describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  // Configuração do TestBed antes de cada teste
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TaskFormComponent], // Adiciona TaskFormComponent aqui
      providers: [
        TarefaService,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: 1 }) } // Mock do ActivatedRoute
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance; // Obtém a instância do componente
  });

  // Teste para verificar se o componente foi criado com sucesso
  it('deve criar', () => {
    expect(component).toBeTruthy(); // Verifica se o componente foi criado
  });

  // Adicione mais testes conforme necessário
});
