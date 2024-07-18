import mysql from 'mysql2/promise';
import db from '../config.js';

class TurmaModel {
    constructor() {
        this.conexao = mysql.createPool(db);
    }

    async mostrarTurmas() {
        let sql = 'SELECT * FROM turmas';
        try {
            const [retorno] = await this.conexao.query(sql);
            return [200, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async mostrarTurmasProfessor(id_professor) {
        let sql = 'SELECT * FROM turmas WHERE id_professor = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [id_professor]);
            return [200, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async inserindoTurma(nome, id_professor) {
        let sql = 'INSERT INTO turmas (nome, id_professor) VALUES (?, ?)';
        try {
            const [retorno] = await this.conexao.query(sql, [nome, id_professor]);
            return [201, 'Turma Inserida'];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async atualizandoTurma(id, nome, id_professor) {
        let sql = 'UPDATE turmas SET nome = ?, id_professor = ? WHERE id = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [nome, id_professor, id]);
            return [202, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async deletandoTurma(id) {
        let sql = 'DELETE FROM turmas WHERE id = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [id]);
            if (retorno.affectedRows > 0) {
                return [202, 'Turma Deletada'];
            } else {
                return [404, 'Turma não encontrada'];
            }
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async mostrandoUmaTurma(id) {
        let sql = 'SELECT * FROM turmas WHERE id = ?';
        try {
            const [retorno] = await this.conexao.query(sql, [id]);
            if (retorno.length > 0) {
                return [200, retorno[0]];
            } else {
                return [404, 'Turma não encontrada'];
            }
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }
}

export default new TurmaModel();