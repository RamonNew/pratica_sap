import mysql from 'mysql2/promise';
import db from '../config.js';

class Professor {
    constructor() {
        this.conexao = mysql.createPool(db);
    }

    async mostrarProfessores() {
        let sql = 'SELECT * FROM professores';

        try {
            const [retorno] = await this.conexao.query(sql);
            return [200, retorno];
        } catch (error) {
            console.debug(error);
            return [400, error];
        }
    }

    async inserindoProfessor(nome, email, senha) {
        let sql = 'INSERT INTO professores (nome, email, senha) VALUES (?, ?, ?)';
        try {
            const [retorno] = await this.conexao.query(sql, [nome, email, senha]);
            return [201, retorno];
        } catch (erro) {
            return [400, erro];
        }
    }

    async atualizandoProfessor(id, nome, email, senha) {
        let sql = 'UPDATE professores SET nome=?, email=?, senha=? WHERE id=?';
        try {
            const [retorno] = await this.conexao.query(sql, [nome, email, senha, id]);
            return [202, retorno];
        } catch (erro) {
            return [400, erro];
        }
    }

    async deletandoProfessor(id) {
        let sql = 'DELETE FROM professores WHERE id=?';
        try {
            const [retorno] = await this.conexao.query(sql, [id]);
            if (retorno.affectedRows > 0) {
                return [202, retorno];
            } else {
                return [404, retorno];
            }
        } catch (erro) {
            return [400, erro];
        }
    }

    async mostrandoUmProfessor(id) {
        let sql = 'SELECT * FROM professores WHERE id=?';
        try {
            const [retorno] = await this.conexao.query(sql, [id]);
            if (retorno.length > 0) {
                return [200, retorno[0]];
            } else {
                return [404, retorno];
            }
        } catch (erro) {
            return [400, erro];
        }
    }
    async validarEmailSenha(email, senha) {
        let sql = 'SELECT * FROM professores WHERE email=? AND senha=?';
        try {
            const [retorno] = await this.conexao.query(sql, [email, senha]);
            if (retorno.length > 0) {
                return [200, retorno[0]];
            } else {
                return [404, retorno];
            }
        } catch (erro) {
            return [400, erro];
        }
    }
}

export default new Professor()
