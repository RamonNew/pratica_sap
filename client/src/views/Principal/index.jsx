import { useEffect, useState } from 'react'

function Principal() {

  const [nome, setNome] = useState("")
  const [turmas, setTurmas] = useState([])
  useEffect(() => {
    document.title = "Tela principal"

    pegarNome()
    listarTurmas()
  }, [])

  async function pegarNome() {
    try {
      const id = localStorage.getItem("id")

      if (!id) {
        window.location.replace("./");
        alert("Efetue login")
      }

      // Faz a chamada para a API através do proxy
      const resposta = await fetch('/professor/' + id);
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dados = await resposta.json();
      console.debug(dados)
      setNome(dados["nome"]);
      //setNome("hehe")
    } catch (erro) {
      throw new Error('Erro na consulta!' + erro);
    }
  }

  async function listarTurmas() {
    try {
      const id = localStorage.getItem("id")
      // Faz a chamada para a API através do proxy
      const resposta = await fetch(`/turma/professor/${id}`)
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dados = await resposta.json();
      console.debug(dados)
      setTurmas(dados);
      //setNome("hehe")
    } catch (erro) {
      throw new Error('Erro na consulta!' + erro);
    }
  }

  async function logout() {
    localStorage.clear()
    window.location.replace("./")
  }

  async function deletarTurma(id) {
    if (window.confirm("Tem certeza que deseja deletar essa turma?")) {
      try {
        const resposta = await fetch('/turma/' + id, {
          method: 'DELETE',
        })
        if (!resposta.ok) {
          throw new Error("Falha ao deletar turma")
        } else {//else não obrigatório
          listarTurmas()
        }

      } catch (error) {
        console.error("Erro ao deletar turma:", error)
      }
    }
  }

  return (
    <div className='container'>
      <div className='bg-primary py-2 px-5 text-end'>
        <span className='text-white float-start fs-4'>Usuário | {nome}</span>
        <button className='btn btn-warning' onClick={logout}>Logout</button>
      </div>


      <div className='mt-4 text-end'><a className='btn btn-primary' href="./cadastroTurma">Cadastrar Turma</a></div>
      <div className='turmas'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Número</th>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map(turma => (
              <tr key={turma.id}>
                <td>{turma.id}</td>
                <td>{turma.nome}</td>
                <td>
                  <button className='btn bg-danger text-white me-2' onClick={() => deletarTurma(turma.id)}>Excluir</button>
                  <a className='btn btn-success bg-success text-white' href={`/visualizarTurma/${turma.id}`}>Vizualizar</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Principal