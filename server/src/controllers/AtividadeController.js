import AtividadeModel from '../models/AtividadeModel.js';

class AtividadeController {
    async index(req, res) {
        const [status, data] = await AtividadeModel.mostrarAtividades();
        console.debug("Mostrando Atividades");
        res.status(status).json(data);
    }

    async create(req, res) {
        const { descricao, id_turma } = req.body;
        const [status, data] = await AtividadeModel.inserindoAtividade(descricao, id_turma);
        console.debug("Inserindo Atividade");
        res.status(status).json(data);
    }

    async update(req, res) {
        const { id } = req.params;
        const { descricao, id_turma } = req.body;
        const [status, data] = await AtividadeModel.atualizandoAtividade(id, descricao, id_turma);
        console.debug("Atualizando Atividade");
        res.status(status).json(data);
    }

    async destroy(req, res) {
        const { id } = req.params;
        const [status, data] = await AtividadeModel.deletandoAtividade(id);
        console.debug("Deletando Atividade");
        res.status(status).json(data);
    }

    async mostrarAtividade(req, res) {
        const { id } = req.params;
        const [status, data] = await AtividadeModel.mostrandoUmaAtividade(id);
        console.debug("Mostrando uma Atividade");
        res.status(status).json(data);
    }

    async mostrarAtividadeTurma(req, res) {
        const { id_turma } = req.params;
        const [status, data] = await AtividadeModel.mostrarAtividadesTurma(id_turma);
        console.debug("Mostrando Atividades da Turma");
        res.status(status).json(data);
    }
}

export default new AtividadeController();
