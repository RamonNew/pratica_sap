import { useState, useEffect} from 'react'

function CadastradoTurma() {
    //Definindo os estados para cada campo do formulário
    const [nome, setNome] = useState('')
    const [id_professor, setId_professor] = useState('')

    useEffect(() => {
        document.title = "Cadastro Turma"
        setId_professor(localStorage.getItem("id"))
        
        if (!localStorage.getItem("id")) {
            window.location.replace("./");
            alert("Efetue login")
          }
      }, [])

    //Função que será chamada ao enviar o formulário
    async function cadastrarUsuario(event) {
        //Impede o comportamento de recarregar a página
        event.preventDefault()
        //Criando objeto com os dados do usuário a serem enviados para a API
        const turmaData = {
            nome,
            id_professor
        }

        try {

            //Realiza POST para a API
            const resposta = await fetch('/turma', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' //Especificando o corpo como JSON
                },
                body: JSON.stringify(turmaData)
            })

            //Verifica se a resposta da API foi bem-sucedida
            if (!resposta.ok) {
                console.debug("Erro ao criar usuário")
            } else {
                alert('Turma Cadastrada')
                console.debug("Turma Cadastrada")
                window.location.href = '/principal'
            }

        } catch (error) {
            console.debug(error)
        }
    }

    
    return (
        <div>
            <h1><a href="/principal">Voltar</a></h1>
            <h1>Cadastro Turma</h1>
            <form onSubmit={cadastrarUsuario}>
                <label>Nome:</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default CadastradoTurma