const express = require('express')
const app = express()
const port = 5000
const ProfessorController = require("./controllers/ProfessorController")
const TurmaController =require("./controllers/TurmaController")
const AtividadeController = require("./controllers/AtividadeController")

// For parsing application/json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//validando login turma
app.post("/logar",ProfessorController.logar)

//CRUD Professor
app.get("/professor",ProfessorController.index)
app.post("/professor",ProfessorController.create)
app.put("/professor/:id",ProfessorController.update)
app.delete("/professor/:id",ProfessorController.destroy)
app.get("/professor/:id",ProfessorController.mostrarProfessor)


//CRUD turma
app.get("/turma",TurmaController.index)
app.post("/turma",TurmaController.create)
app.put("/turma/:id",TurmaController.update)
app.delete("/turma/:id",TurmaController.destroy)
app.get("/turma/:id",TurmaController.mostraTurma)


app.get("/turma/professor/:id_professor",TurmaController.mostrarTurmaProfessor)

app.get("/atividade/turma/:id_turma",AtividadeController.mostrarAtividadeTurma)

app.post("/atividade/",AtividadeController.create)

//CRUD Turma

