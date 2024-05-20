import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Logar from './views/Logar';
import Principal from './views/Principal';
import CadastradoTurma from './views/CadastroTurma';
import VisualizarTurma from './views/VisualizarTurma';
import CadastradoAtividade from './views/CadastroAtividade';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Logar />} />
        <Route path='/principal' element={<Principal />} />
        <Route path='/cadastroTurma' element={<CadastradoTurma />} />
        <Route path='/visualizarTurma/:id_turma' element={<VisualizarTurma />} />
        <Route path='/cadastrarAtividade/:id_turma' element={<CadastradoAtividade />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
