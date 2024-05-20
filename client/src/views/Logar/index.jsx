import { useState, useEffect } from 'react'

function Logar() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    useEffect(() => {
        document.title = "Tela Login"
    })

    async function efetuarLogin() {
        try {
            const resposta = await fetch("/logar", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            })
            if (!resposta.ok) {
                alert("Usuário ou senha inválidos")
                throw new Error("Erro na requisição:" + resposta.status)
            }

            const dados = await resposta.json()
            localStorage.setItem('id', dados.id)
            window.location.href = "/principal"
        } catch (error) {
            console.error("Error ao fazer login", error)
        }
    }

    return (
        <div className=" container col-3 pt-5 justify-content-center">
            <div className='text-align-center'>
                <h1 className='text-center'>Bem vindo</h1>
                <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='email'
                    class="form-control"
                />
                <input type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder='senha'
                    class="form-control"
                />
                <button className='mt-2 btn btn-primary float-end' onClick={efetuarLogin}>Logar</button>
            </div>
        </div>
    )
}
export default Logar