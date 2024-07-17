import Atividade from '../models/Atividade.js';
class AtividadeController{
    index(req,res){
        Atividade.mostrarAtividades().then(
            resposta=>{
                console.debug("Mostrando Atividades")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("ERRO ao mostrar Atividades")
                res.status(resposta[0]).json(resposta[1])
            }
        )
    }

    create(req,res){
        let descricao = req.body.descricao
        let id_turma = req.body.id_turma
        Atividade.inserindoAtividade(descricao,id_turma).then(
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
        let descricao = req.body.descricao
        let id_professor = req.body.id_professor
        Turma.atualizandoTurma(id,descricao,id_professor).then(
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

    mostrarAtividadeTurma(req,res){
        let id_turma = req.params.id_turma
        Atividade.mostrarAtividadesTurma(id_turma).then(
            resposta=>{
                console.debug("Mostrando Atividades Turma")
                res.status(resposta[0]).json(resposta[1])
            }
        ).catch(
            resposta=>{
                console.debug("Erro Mostrando Atividades Turma")
                res.status(resposta[0]).json(resposta[1])
            }
        )    
    }
}

export default new AtividadeController()