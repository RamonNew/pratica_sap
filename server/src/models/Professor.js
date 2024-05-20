const mysql = require("mysql2")
const dbConfig = require("../config")
class Professor {
    constructor() {
        this.conexao = mysql.createConnection(dbConfig.db)
    }

    mostrarProfessores() {
        let sql = "SELECT * FROM professores"

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([200, retorno])
            })
        })
    }

    inserindoProfessor(nome, email, senha) {
        let sql = `INSERT INTO professores (nome,email,senha) VALUE ("${nome}","${email}","${senha}")`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([201, retorno])
            })
        })
    }

    atualizandoProfessor(id, nome, email, senha) {
        let sql = `UPDATE professores SET nome="${nome}",email="${email}",senha="${senha}" WHERE id="${id}"`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                resolve([202, retorno])
            })
        })
    }

    deletandoProfessor(id) {
        let sql = `DELETE FROM professores WHERE id="${id}";`

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

    mostrandoUmProfessor(id){
        let sql = `SELECT * FROM professores WHERE id="${id}"`

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
    validarEmailSenha(email,senha){
        let sql = `SELECT * FROM professores WHERE email="${email}" AND senha="${senha}"`

        return new Promise((resolve, reject) => {
            this.conexao.query(sql, function (erro, retorno) {
                if (erro) {
                    reject([400, erro])
                }
                if (retorno.length>0) {
                    resolve([200, retorno])
                } else {
                    resolve([404, retorno])
                }

            })
        })
    }
}

module.exports = new Professor()
