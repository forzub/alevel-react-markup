import LeyOut from './pages/layout';
import { Routes, Route, useLocation, } from "react-router-dom";
import { useEffect } from 'react';
import { magazinBase } from './pages/constants';
import { magazinLoadBaseFromServer } from './store/magazin';
import { useDispatch } from 'react-redux';
import Admin from './pages/admin/admin';
import PageNotFound from './pages/page404';
import AdmSingIn from './pages/admin/admSignIn';
import { RequireAuth } from './components/hoc/RequireAuth';
import ReactDOM from 'react-dom';

import AdmIndexC from './pages/admin/admCIndex';
import AdmCMain from './pages/admin/admCMain';
import AdmCItems from './pages/admin/admCItems';


function App() {

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(
    () => {
      dispatch(magazinLoadBaseFromServer(magazinBase));
    }, []
  );

  return (
    <>

      <Routes>
        <Route path='/' element={<LeyOut />} />
        <Route path='/*' element={<PageNotFound />} />
        <Route path='/404' element={<PageNotFound />} />
        <Route path='/login' element={<AdmSingIn />} />

        <Route path='/admin' element={
          <RequireAuth>
            <Admin />
          </RequireAuth>}>
          <Route index element={<AdmIndexC />} />
          <Route path='edit' element={<h1>Контент edit </h1>} />
          <Route path='edit/:path' element={<AdmCMain />} />
          <Route path='edit/:id/:path' element={<AdmCItems />} />
        </Route>
      </Routes>

      {ReactDOM.createPortal(
        <h1>Modal</h1>,
        document.getElementById('modal')
      )}

    </>
  );
}

export default App;
