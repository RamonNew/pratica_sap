const Turma = require("../models/Turma")

class TurmaController{
    index(req,res){
        Turma.mostrarTurmas().then(
            resposta=>{
                console.debug("Mostrando Turmas")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("ERRO ao mostrar Turmas")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }

    create(req,res){
        let nome = req.body.nome
        let id_professor = req.body.id_professor
        Turma.inserindoTurma(nome,id_professor).then(
            resposta=>{
                console.debug("Inserindo Turma")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Erro Inserindo Turma")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }

    update(req, res){
        let id = req.params.id
        let nome = req.body.nome
        let id_professor = req.body.id_professor
        Turma.atualizandoTurma(id,nome,id_professor).then(
            resposta=>{
                console.debug("Atualizando Turma")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Erro Atualizando Turma")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }

    destroy(req, res){
        let id = req.params.id
        Turma.deletandoTurma(id).then(
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

    mostraTurma(req,res){
        let id = req.params.id
        Turma.mostrandoUmaTurma(id).then(
            resposta=>{
                console.debug("Mostrando uma Turma")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Erro Mostrando uma Turma")
                res.status(resposta[0]).json(resposta[1])
            }
        )    
    }

    mostrarTurmaProfessor(req,res){
        let id_professor = req.params.id_professor
        Turma.mostrarTurmasProfessor(id_professor).then(
            resposta=>{
                console.debug("Atualizando Turma Professor")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Erro Atualizando Turma Professor")
                res.status(resposta[0]).json(resposta[1])
            }
        )    
    }
}

module.exports = new TurmaController()