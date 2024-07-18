import ProfessorModel from "../models/ProfessorModel.js";

class ProfessorController {
    async index(req, res) {
        const [status, data] = await ProfessorModel.mostrarProfessores();
        res.status(status).json(data);
    }

    async create(req, res) {
        const { nome, email, senha } = req.body;
        const [status, data] = await ProfessorModel.inserindoProfessor(nome, email, senha);
        res.status(status).json(data);
    }

    async update(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const [status, data] = await ProfessorModel.atualizandoProfessor(id, nome, email, senha);
        res.status(status).json(data);
    }

    async destroy(req, res) {
        const { id } = req.params;
        const [status, data] = await ProfessorModel.deletandoProfessor(id);
        res.status(status).json(data);
    }

    async mostrarProfessor(req, res) {
        const { id } = req.params;
        const [status, data] = await ProfessorModel.mostrandoUmProfessor(id);
        res.status(status).json(data);
    }
    async validar(req, res) {
        const { email, senha } = req.body;
        const [status, data] = await ProfessorModel.validarEmailSenha(email, senha);
        res.status(status).json(data);
    }
}

export default new ProfessorController();