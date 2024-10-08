// Este arquivo garante que todas as tarefas tenham as mesmas propriedades
export interface Tarefa {
    titulo: string; // Campo obrigatório
    descricao?: string; // Campo opcional
    status: 'pendente' | 'concluida'; // O status pode ser 'pendente' ou 'concluida'
}
