import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


function VisualizarTurma() {
    const { id_turma } = useParams()
    const [nomeTurma, setNomeTurma] = useState('')
    const [nome, setNome] = useState('')
    const [atividades, setAtividades] = useState([])

    useEffect(() => {
        const id = localStorage.getItem("id")

        if (!id) {
            window.location.replace("./");
            alert("Efetue login")
        }

        pegarNomeTurma()
        pegarNome()
        listarAtividades()
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
    async function pegarNomeTurma() {
        try {

            // Faz a chamada para a API através do proxy
            const resposta = await fetch('/turma/' + id_turma);
            if (!resposta.ok) {
                throw new Error(`HTTP error! status: ${resposta.status}`);
            }
            const dados = await resposta.json();
            console.debug(dados)
            setNomeTurma(dados["nome"]);
            //setNome("hehe")
        } catch (erro) {
            throw new Error('Erro na consulta!' + erro);
        }
    }

    async function listarAtividades() {
        try {
          const id = localStorage.getItem("id")
          // Faz a chamada para a API através do proxy
          const resposta = await fetch(`/atividade/turma/${id_turma}`)
          if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
          }
          const dados = await resposta.json();
          console.debug(dados)
          setAtividades(dados);
          //setNome("hehe")
        } catch (erro) {
          throw new Error('Erro na consulta!' + erro);
        }
      }

    async function logout() {
        localStorage.clear()
        window.location.replace("../")
    }
    return (
        <div>
            <div className='menu'>{nome}</div>
            <button onClick={logout}>Logout</button>
            <h1><a href="/principal">Voltar</a></h1>
            <h1><a href={`/cadastrarAtividade/${id_turma}`}>Cadastrar Atividade</a></h1>
            <div><b>Turma:</b>{nomeTurma}</div>
            <table>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                {atividades.map(atividade => (
                    <tr key={atividade.id}>
                        <td>{atividade.id}</td>
                        <td>{atividade.descricao}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default VisualizarTurma