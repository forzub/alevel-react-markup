import { Button, Layout, Modal } from 'antd';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FormOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { returnObjByIdFromBase } from '../../utils';
import AdmSideMenu from '../../components/menu/admSideMenu';
import { Outlet } from 'react-router-dom';
import '../css/admin.css';
import { useAuth } from '../../components/hooc/useAuth';
import AdmInputModal from '../../components/admInputModal';
import { admSetNewItemRoot, admSetRootId, setIsInputModalVisible } from '../../store/admin';

// import AdmIndexC from './admCIndex';
// import AdmCMain from './admCMain';
// import AdmCItems from './admCItems';
// import { Routes, Route, } from "react-router-dom";


const { TabPane } = Tabs;
const { Content, Sider } = Layout;


const Admin = () => {



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isBaseLoaded = useSelector(store => store.magazin.isBaseLoaded);
  const catalog = useSelector(store => store.magazin);
  const rootId = useSelector(store => store.admin.rootId);

  const { id, path } = useParams();
  const { singout } = useAuth();



  let menu = [];
  let parent = null;
  let obj = {};

  // console.log(id)
  // console.log(path)
  // console.log(rootId)

  // console.log(useParams())
  // console.log(useLocation())


  if (id) {
    obj = returnObjByIdFromBase(catalog.base.items, +id);
    if (obj) {
      if (id === path) { parent = +id; } else { parent = obj.parent }
    } else { parent = null; }
  } else {
    parent = null;
  }

  if (parent !== rootId) { dispatch(admSetRootId(parent)); }

  if (isBaseLoaded) {
    if (rootId) {
      obj = returnObjByIdFromBase(catalog.base.items, rootId);
      menu = obj.items;
      parent = { path: obj.content.path, id: obj.id };
    } else {
      menu = catalog.base.items;
      parent = null;
    }
  }



  const showInputModal = (rootTarget) => {
    dispatch(admSetNewItemRoot(rootTarget));
    dispatch(setIsInputModalVisible(true))
  }

  function admEnterButtonClick(path, id) {
    navigate(path);
    dispatch(admSetRootId(+id));
  }

  const callBackFuncs = {
    adm_enter: admEnterButtonClick,
    adm_add: showInputModal
  }

  return (
    <>

      <header className='adm-header'>
        <div className="wrapper">
          <div className="adm-top-menu">
            <Button type='button ' onClick={() => navigate('/')}>?????????????? ???? ????????</Button>
            <Button type='button ' onClick={() => singout(() => navigate('/', { replace: true }))}>Log Out</Button>
          </div>
        </div>
      </header>
      <Layout className='admin'>
        <div className="wrapper">

          <Tabs defaultActiveKey="1"
          // onTabClick={(key, event) => console.log('??????', key, event)}
          >
            <TabPane
              tab={<span><FormOutlined />???????????????????? ??????????????????</span>}
              key="1"
            >
              <Layout>
                <Sider>
                  <AdmSideMenu
                    mode="vertical"
                    links={menu}
                    callBackFuncs={callBackFuncs}
                    parent={parent}

                  />
                </Sider>

                <div className='content-bx'>
                  <Content>
                    {obj ?
                        <Outlet />
                      : <Navigate to='/404' />}
                    {/* <Outlet /> */}
                  </Content>
                </div>

              </Layout>
            </TabPane>


            <TabPane
              tab={<span><ShoppingCartOutlined />???????????????????? ????????????????</span>}
              key="2"
            >
              <Layout>
                <Sider>
                  Tab 2 Sider
                </Sider>

                <div className='content-bx'>
                  <Content>
                    Tab 2 Content
                  </Content>
                </div>

              </Layout>
            </TabPane>
          </Tabs>

        </div>
      </Layout>

      <AdmInputModal />
    </>
  );
}

export default Admin;
