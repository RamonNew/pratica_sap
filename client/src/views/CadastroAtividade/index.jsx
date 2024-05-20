import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function CadastradoAtividade() {
    //Definindo os estados para cada campo do formulário
    const [descricao, setDescricao] = useState('')
    const [id_professor, setId_professor] = useState('')

    const { id_turma } = useParams()

    useEffect(() => {
        document.title = "Cadastro Turma"
        setId_professor(localStorage.getItem("id"))

        if (!localStorage.getItem("id")) {
            window.location.replace("../");
            alert("Efetue login")
        }
    }, [])

    //Função que será chamada ao enviar o formulário
    async function cadastrarAtividade(event) {
        //Impede o comportamento de recarregar a página
        event.preventDefault()
        //Criando objeto com os dados do usuário a serem enviados para a API
        const atividadeData = {
            descricao,
            id_turma
        }

        try {

            //Realiza POST para a API
            const resposta = await fetch('/atividade/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' //Especificando o corpo como JSON
                },
                body: JSON.stringify(atividadeData)
            })

            //Verifica se a resposta da API foi bem-sucedida
            if (!resposta.ok) {
                console.debug("Erro ao criar usuário")
            } else {
                alert('Atividade Cadastrada')
                console.debug("Turma Cadastrada")
                window.location.href = '/visualizarTurma/' + id_turma
            }

        } catch (error) {
            console.debug(error)
        }
    }


    return (
        <div className="container col-3 pt-5 justify-content-center">
            <h1>Cadastro Atividade</h1>
            <form onSubmit={cadastrarAtividade}>
                <input
                    type="text"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    placeholder='Descrição'
                    class="form-control"
                />
                <a className='mt-2 btn btn-danger float-start' href={`/visualizarTurma/${id_turma}`}>Cancelar</a>
                <button className='mt-2 btn btn-primary float-end' type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default CadastradoAtividade