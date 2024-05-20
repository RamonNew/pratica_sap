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
        <div className='container'>
            <div className='bg-primary py-2 px-5 text-end'>
                <span className='text-white float-start fs-4'>Usuário | {nome}</span>
                <button className='btn btn-warning' onClick={logout}>Logout</button>
            </div>
            <div className='mt-4 text-end'><a className='btn btn-warning me-2' href="/principal">Voltar</a><a className='btn btn-primary' href={`/cadastrarAtividade/${id_turma}`}>Cadastrar Atividade</a></div>
            <div className='fs-4'><b>Turma: </b>{nomeTurma}</div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {atividades.map(atividade => (
                        <tr key={atividade.id}>
                            <td>{atividade.id}</td>
                            <td>{atividade.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default VisualizarTurma