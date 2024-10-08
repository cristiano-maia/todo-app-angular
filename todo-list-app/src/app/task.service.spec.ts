import { TestBed } from '@angular/core/testing';
import { TarefaService } from './task.service';
import { Tarefa } from './tarefa.model';

// Descreve o conjunto de testes para o TarefaService
describe('TarefaService', () => {
  let service: TarefaService;

  // Antes de cada teste, configura o módulo de testes e injeta o serviço
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarefaService);
    service['tarefas'] = []; // Reinicializa a lista de tarefas para um array vazio
  });

  // Teste para verificar se o serviço inicializa com uma lista de tarefas vazia
  it('deve inicializar com uma lista de tarefas vazia', () => {
    service.obterTarefas().subscribe(tarefas => {
      expect(tarefas.length).toBe(0); // Espera que a lista de tarefas esteja vazia
    });
  });

  // Teste para adicionar uma nova tarefa
  it('deve adicionar uma tarefa', () => {
    const tarefa: Tarefa = { titulo: 'Teste', descricao: 'Descrição do teste', status: 'pendente' };
    service.adicionarTarefa(tarefa);
    
    service.obterTarefas().subscribe(tarefas => {
      expect(tarefas.length).toBe(1); // Espera que a lista de tarefas tenha um item
      expect(tarefas[0].titulo).toBe('Teste'); // Espera que o título da tarefa adicionada seja 'Teste'
    });
  });

  // Teste para editar uma tarefa existente
  it('deve editar uma tarefa', () => {
    const tarefa: Tarefa = { titulo: 'Teste', descricao: 'Descrição do teste', status: 'pendente' };
    service.adicionarTarefa(tarefa);
    
    const tarefaEditada: Tarefa = { titulo: 'Teste Editado', descricao: 'Descrição editada', status: 'pendente' };
    service.editarTarefa(0, tarefaEditada);
    
    service.obterTarefas().subscribe(tarefas => {
      expect(tarefas[0].titulo).toBe('Teste Editado'); // Espera que o título da tarefa editada seja 'Teste Editado'
    });
  });

  // Teste para excluir uma tarefa
  it('deve excluir uma tarefa', () => {
    const tarefa: Tarefa = { titulo: 'Teste', descricao: 'Descrição do teste', status: 'pendente' };
    service.adicionarTarefa(tarefa);
    service.excluirTarefa(0);
    
    service.obterTarefas().subscribe(tarefas => {
      expect(tarefas.length).toBe(0); // Espera que a lista de tarefas esteja vazia após a exclusão
    });
  });
});
