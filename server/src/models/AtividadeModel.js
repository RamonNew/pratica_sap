import mysql from 'mysql2/promise';
import db from '../config.js';

class AtividadeModel {
    constructor() {
        this.conexao = mysql.createPool(db);
    }

    async mostrarAtividades() {
        let sql = 'SELECT * FROM atividades';
        try {
            const [retorno] = await this.conexao.query(sql);
            return [200, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async mostrarAtividadesTurma(id_turma) {
        let sql = 'SELECT * FROM atividades WHERE id_turma = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [id_turma]);
            return [200, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async inserindoAtividade(descricao, id_turma) {
        let sql = 'INSERT INTO atividades (descricao, id_turma) VALUES (?, ?)';
        try {
            const [retorno] = await this.conexao.query(sql, [descricao, id_turma]);
            return [201, 'Atividade Inserida'];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async atualizandoAtividade(id, descricao, id_turma) {
        let sql = 'UPDATE atividades SET descricao = ?, id_turma = ? WHERE id = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [descricao, id_turma, id]);
            return [202, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async deletandoAtividade(id) {
        let sql = 'DELETE FROM atividades WHERE id = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [id]);
            if (retorno.affectedRows > 0) {
                return [202, 'Atividade Deletada'];
            } else {
                return [404, 'Atividade não encontrada'];
            }
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async mostrandoUmaAtividade(id) {
        let sql = 'SELECT * FROM atividades WHERE id = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [id]);
            if (retorno.length > 0) {
                return [200, retorno[0]];
            } else {
                return [404, 'Atividade não encontrada'];
            }
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }
}

export default new AtividadeModel();