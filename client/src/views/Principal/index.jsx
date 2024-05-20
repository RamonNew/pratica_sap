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
    <div>
      <div className='menu'>{nome}</div>
      <button onClick={logout}>Logout</button>

      <h1><a href="./cadastroTurma">Cadastrar Turma</a></h1>
      <div className='turmas'>
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          {turmas.map(turma => (
            <tr key={turma.id}>
              <td>{turma.id}</td>
              <td>{turma.nome}</td>
              <td>
                <button onClick={() => deletarTurma(turma.id)}>Excluir</button>
                <a href={`/visualizarTurma/${turma.id}`}>Vizualizar</a>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Principal