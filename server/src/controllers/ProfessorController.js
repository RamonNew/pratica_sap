const Professor = require("../models/Professor")

class ProfessorController{
    index(req,res){
        Professor.mostrarProfessores().then(
            resposta=>{
                console.debug("Mostrando Usuários")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("ERRO ao mostrar Usuários")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }

    create(req,res){
        let nome = req.body.nome
        let email = req.body.email
        let senha = req.body.senha
        Professor.inserindoProfessor(nome,email,senha).then(
            resposta=>{
                console.debug("Mostrando Usuários")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Mostrando Usuários")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }

    update(req, res){
        let id = req.params.id
        let nome = req.body.nome
        let email = req.body.email
        let senha = req.body.senha
        Professor.atualizandoProfessor(id,nome,email,senha).then(
            resposta=>{
                console.debug("Atualizando Usuários")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Erro Atualizando Usuários")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }

    destroy(req, res){
        let id = req.params.id
        Professor.deletandoProfessor(id).then(
            resposta=>{
                console.debug("Deletando Professor")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Erro Deletando Professor")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }

    mostrarProfessor(req,res){
        let id = req.params.id
        Professor.mostrandoUmProfessor(id).then(
            resposta=>{
                console.debug("Mostrando um Professor")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Mostrando um Professor")
                res.status(resposta[0]).json(resposta[1])
            }
        )    
    }
    logar(req,res){
        let email = req.body.email
        let senha = req.body.senha
        Professor.validarEmailSenha(email,senha).then(
            resposta=>{
                console.debug("Efetuando Login")
                res.status(resposta[0]).json(resposta[1][0])
            }
        ).catch(
            resposta=>{
                console.debug("Erro Efetuando Login")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }
}

module.exports = new ProfessorController()