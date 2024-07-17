import express from 'express';
const app = express()
const port = 5000

import ProfessorController from './controllers/ProfessorController.js';
import TurmaController from './controllers/TurmaController.js';
import AtividadeController from './controllers/AtividadeController.js';

// For parsing application/json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//validando login turma
app.post("/logar",ProfessorController.validar)

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

