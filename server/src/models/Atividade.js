import mysql from 'mysql2';
import db from '../config.js';

class Atividade {
    constructor() {
        this.conexao = mysql.createConnection(db)
    }

    mostrarAtividades() {
        let sql = "SELECT * FROM atividades"

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([200, retorno])
            })
        })
    }

    mostrarAtividadesTurma(id_turma) {
        let sql = `SELECT * FROM atividades WHERE id_turma="${id_turma}"`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([200, retorno])
            })
        })
    }

    inserindoAtividade(descricao,id_turma) {
        let sql = `INSERT INTO atividades (descricao,id_turma) VALUE ("${descricao}","${id_turma}")`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([201, retorno])
            })
        })
    }

    atualizandoAtividade(id, descricao,id_turma) {
        let sql = `UPDATE atividades SET descricao="${descricao}",id_turma="${id_turma}" WHERE id="${id}"`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([202, retorno])
            })
        })
    }

    deletandoAtividade(id) {
        let sql = `DELETE FROM atividades WHERE id="${id}";`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                if (retorno["affectedRows"]>0) {
                    resolve([202, retorno])
                } else {
                    resolve([404, retorno])
                }

            })
        })
    }

    mostrandoUmaAtividade(id){
        let sql = `SELECT * FROM atividades WHERE id="${id}"`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                if (retorno.length>0) {
                    resolve([200, retorno[0]])
                } else {
                    resolve([404, retorno])
                }

            })
        })    
    }
}

export default new Atividade()
