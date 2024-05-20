import { useState, useEffect } from 'react'

function Logar() {
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')

    useEffect(()=>{
        document.title = "Tela Login"    
    })

    async function efetuarLogin(){
        try {
            const resposta = await fetch("/logar",{
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,senha})
            })
            if(!resposta.ok){
                alert("Usuário ou senha inválidos")
                throw new Error("Erro na requisição:" + resposta.status)
            }

            const dados = await resposta.json()
            localStorage.setItem('id',dados.id)
            window.location.href = "/principal"
        } catch (error) {
            console.error("Error ao fazer login",error)
        }
    }

    return (
        <div>
            <h1>Bem vindo</h1>
            <label htmlFor="">email</label>
            <input type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="">senha</label>
            <input type="text" 
            value={senha}
            onChange={(e)=>setSenha(e.target.value)}
            />

            <button onClick={efetuarLogin}>Logar</button>
        </div>
    )
}
export default Logar