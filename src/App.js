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
import { Spin, Alert } from 'antd';
import { useSelector } from 'react-redux';
import StartContent from './pages/common/startContent';


function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const showSpiner = useSelector(store => store.element.spinerLoading);
  const isBase = useSelector(store => store.magazin.isBaseLoaded);

  //console.log(isBase)

  useEffect(
    () => {
      dispatch( magazinLoadBaseFromServer() );
      // dispatch(magazinLoadBaseFromServer(magazinBase));
    }, []
  );

  return (
    <>
    {
      isBase ? 
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
      </>
      : <StartContent />
    }


      { showSpiner ?
      ReactDOM.createPortal(
        <div className="spiner-bx">
          <Spin tip="Loading...">
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
          </div>,
        document.getElementById('modal')
      ) : null
      }

    </>
  );
}

export default App;
