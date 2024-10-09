import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarefa } from './tarefa.model';

@Injectable({
  providedIn: 'root' // Permite que o TarefaService seja injetado em qualquer parte da aplicação
})
export class TarefaService {
  private tarefas: Tarefa[] = []; // Array para armazenar as tarefas
  private listaDeTarefasAtualizada = new BehaviorSubject<Tarefa[]>(this.tarefas); // BehaviorSubject para observar a lista de tarefas

  // Armazenar a tarefa para edição
  private tarefaParaEdicao = new BehaviorSubject<{ tarefa: Tarefa | null, indice: number | null } | null>(null); // Comportamento para a tarefa em edição

  // Variáveis para gerenciar a paginação
  private paginaAtual: number = 1; // Página atual
  private itensPorPagina: number = 5; // Número de itens por página

  constructor() {
    this.carregarTarefasDoLocalStorage(); // Carrega tarefas do LocalStorage ao inicializar o serviço
  }

  // Método para carregar tarefas do LocalStorage
  private carregarTarefasDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem('tarefas'); // Tenta obter tarefas do LocalStorage
    if (tarefasSalvas) {
      this.tarefas = JSON.parse(tarefasSalvas); // Converte a string JSON de volta para um array de tarefas
      this.listaDeTarefasAtualizada.next(this.tarefas); // Atualiza a lista de tarefas observada
    }
  }

  // Método para armazenar tarefas no LocalStorage
  private armazenarTarefasNoLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(this.tarefas)); // Armazena o array de tarefas como uma string JSON
  }

  // Método para obter as tarefas com base na página atual
  obterTarefasPaginadas() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina; // Calcula o índice de início
    const tarefasPaginadas = this.tarefas.slice(inicio, inicio + this.itensPorPagina); // Obtém as tarefas para a página atual
    return tarefasPaginadas; // Retorna as tarefas paginadas
  }

  // Método para mudar a página
  mudarPagina(pagina: number) {
    this.paginaAtual = pagina; // Atualiza a página atual
    this.listaDeTarefasAtualizada.next(this.obterTarefasPaginadas()); // Atualiza a lista de tarefas observada com as tarefas paginadas
  }

  // Método para obter as tarefas
  obterTarefas() {
    return this.listaDeTarefasAtualizada.asObservable(); // Retorna um Observable da lista de tarefas
  }

  // Método para adicionar uma nova tarefa
  adicionarTarefa(tarefa: Tarefa) {
    this.tarefas.push(tarefa); // Adiciona a tarefa ao array
    this.armazenarTarefasNoLocalStorage(); // Armazena as tarefas no LocalStorage
    this.listaDeTarefasAtualizada.next(this.tarefas); // Atualiza a lista de tarefas observada
  }

  // Método para editar uma tarefa existente
  editarTarefa(indice: number, tarefaAtualizada: Tarefa) {
    this.tarefas[indice] = tarefaAtualizada; // Atualiza a tarefa no array
    this.armazenarTarefasNoLocalStorage(); // Armazena as tarefas no LocalStorage
    this.listaDeTarefasAtualizada.next(this.tarefas); // Atualiza a lista de tarefas observada
  }

  // Método para excluir uma tarefa
  excluirTarefa(indice: number) {
    this.tarefas.splice(indice, 1); // Remove a tarefa do array
    this.armazenarTarefasNoLocalStorage(); // Armazena as tarefas no LocalStorage
    this.listaDeTarefasAtualizada.next(this.tarefas); // Atualiza a lista de tarefas observada
  }

  // Método para definir a tarefa e índice para edição
  definirTarefaParaEdicao(tarefa: Tarefa | null, indice: number | null) { // Agora aceita null
    console.log('Definindo tarefa para edição: ', tarefa, 'índice: ', indice); // Log para depuração
    this.tarefaParaEdicao.next({ tarefa, indice }); // Atualiza o BehaviorSubject com a tarefa e índice
  }

  // Método para obter a tarefa para edição
  obterTarefaParaEdicao() {
    return this.tarefaParaEdicao.asObservable(); // Retorna um Observable da tarefa em edição
  }
}
