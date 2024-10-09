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
    // Observa as tarefas e espera que a lista esteja vazia
    service.obterTarefas().subscribe(tarefas => {
      expect(tarefas.length).toBe(0); // Espera que a lista de tarefas esteja vazia
    });
  });

  // Teste para adicionar uma nova tarefa
  it('deve adicionar uma tarefa', () => {
    const tarefa: Tarefa = { titulo: 'Teste', descricao: 'Descrição do teste', status: 'pendente' };
    service.adicionarTarefa(tarefa); // Chama o método para adicionar a tarefa
    
    // Observa as tarefas e espera que a lista tenha 1 item
    service.obterTarefas().subscribe(tarefas => {
      expect(tarefas.length).toBe(1); // Espera que a lista de tarefas tenha um item
      expect(tarefas[0].titulo).toBe('Teste'); // Espera que o título da tarefa adicionada seja 'Teste'
      expect(tarefas[0].descricao).toBe('Descrição do teste'); // Espera que a descrição esteja correta
      expect(tarefas[0].status).toBe('pendente'); // Espera que o status seja 'pendente'
    });
  });

  // Teste para editar uma tarefa existente
  it('deve editar uma tarefa', () => {
    const tarefa: Tarefa = { titulo: 'Teste', descricao: 'Descrição do teste', status: 'pendente' };
    service.adicionarTarefa(tarefa); // Adiciona a tarefa inicialmente
    
    const tarefaEditada: Tarefa = { titulo: 'Teste Editado', descricao: 'Descrição editada', status: 'concluida' };
    service.editarTarefa(0, tarefaEditada); // Chama o método para editar a tarefa adicionada
    
    // Observa as tarefas e verifica se a tarefa foi editada corretamente
    service.obterTarefas().subscribe(tarefas => {
      expect(tarefas[0].titulo).toBe('Teste Editado'); // Espera que o título da tarefa editada seja 'Teste Editado'
      expect(tarefas[0].descricao).toBe('Descrição editada'); // Espera que a descrição da tarefa editada esteja correta
      expect(tarefas[0].status).toBe('concluida'); // Espera que o status da tarefa editada seja 'concluida'
    });
  });

  // Teste para excluir uma tarefa
  it('deve excluir uma tarefa', () => {
    const tarefa: Tarefa = { titulo: 'Teste', descricao: 'Descrição do teste', status: 'pendente' };
    service.adicionarTarefa(tarefa); // Adiciona a tarefa antes da exclusão
    service.excluirTarefa(0); // Chama o método para excluir a tarefa
    
    // Observa as tarefas e espera que a lista esteja vazia após a exclusão
    service.obterTarefas().subscribe(tarefas => {
      expect(tarefas.length).toBe(0); // Espera que a lista de tarefas esteja vazia após a exclusão
    });
  });
});
