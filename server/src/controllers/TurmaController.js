import TurmaModel from "../models/TurmaModel.js";

class TurmaController {
    async index(req, res) {
        const [status, data] = await TurmaModel.mostrarTurmas();
        console.debug("Mostrando Turmas");
        res.status(status).json(data);
    }

    async create(req, res) {
        const { nome, id_professor } = req.body;
        const [status, data] = await TurmaModel.inserindoTurma(nome, id_professor);
        console.debug("Inserindo Turma");
        res.status(status).json(data);
    }

    async update(req, res) {
        const { id } = req.params;
        const { nome, id_professor } = req.body;
        const [status, data] = await TurmaModel.atualizandoTurma(id, nome, id_professor);
        console.debug("Atualizando Turma");
        res.status(status).json(data);
    }

    async destroy(req, res) {
        const { id } = req.params;
        const [status, data] = await TurmaModel.deletandoTurma(id);
        console.debug("Deletando Turma");
        res.status(status).json(data);
    }

    async mostraTurma(req, res) {
        const { id } = req.params;
        const [status, data] = await TurmaModel.mostrandoUmaTurma(id);
        console.debug("Mostrando uma Turma");
        res.status(status).json(data);
    }

    async mostrarTurmaProfessor(req, res) {
        const { id_professor } = req.params;
        const [status, data] = await TurmaModel.mostrarTurmasProfessor(id_professor);
        console.debug("Mostrando Turmas de um Professor");
        res.status(status).json(data);
    }
}

export default new TurmaController();
