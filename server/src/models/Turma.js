const mysql = require("mysql2")
const dbConfig = require("../config")
class Turma {
    constructor() {
        this.conexao = mysql.createConnection(dbConfig.db)
    }

    mostrarTurmas() {
        let sql = "SELECT * FROM turmas"

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([200, retorno])
            })
        })
    }

    mostrarTurmasProfessor(id_professor) {
        let sql = `SELECT * FROM turmas WHERE id_professor="${id_professor}"`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([200, retorno])
            })
        })
    }

    inserindoTurma(nome,id_professor) {
        let sql = `INSERT INTO turmas (nome,id_professor) VALUE ("${nome}","${id_professor}")`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([201, retorno])
            })
        })
    }

    atualizandoTurma(id, nome,id_professor) {
        let sql = `UPDATE turmas SET nome="${nome}",id_professor="${id_professor}" WHERE id="${id}"`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([202, retorno])
            })
        })
    }

    deletandoTurma(id) {
        let sql = `DELETE FROM turmas WHERE id="${id}";`

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

    mostrandoUmaTurma(id){
        let sql = `SELECT * FROM turmas WHERE id="${id}"`

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

module.exports = new Turma()
