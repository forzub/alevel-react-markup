import Template from './pages/template';
import Admin from './pages/admin/admin';
import { Routes, Route,  } from "react-router-dom";


function App() {
  return (
    <>
    <Routes>
      <Route path='/*' element={<Template />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
    </Routes>
    </>
  );
}

export default App;
