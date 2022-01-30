import { Link, useParams } from "react-router-dom";
import isEmpty from "ramda/src/isEmpty";
import { Button, Menu } from 'antd';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { admSetCurrent } from "../../store/admin";
import { EnterOutlined, RollbackOutlined, PlusCircleOutlined, CaretDownOutlined, CaretLeftOutlined } from '@ant-design/icons';


const AdmSideMenu = ({ links = [{}], callBackFuncs, parent, ...props }) => {

  const activeItem = useSelector(store => store.admin.activeMenuItem);
  const rootId = useSelector(store => store.admin.rootId);
  const dispatch = useDispatch();
  const { id, path } = useParams();

  const handleClick = (e) => { dispatch(admSetCurrent(e.key)); }

  if (!(path === '0')) { dispatch(admSetCurrent(id)) };
  if (path === '0') { dispatch(admSetCurrent(path)); }

  return (

    <Menu
      onClick={handleClick}
      selectedKeys={[activeItem]}
      {...props}>

      {parent ?
        <Menu.Item key={`but${parent.id}`} >
          <Link to={`edit/${parent.id}${parent.path}`} >
            <CaretLeftOutlined />
            {/* <RollbackOutlined /> */}
          </Link>
        </Menu.Item>
        : null}

      {links.map((el) =>
        <Menu.Item key={`${el.id}`} >
          <Link to={`edit/${el.id}${el.content?.path}`}>{el.content?.title}</Link>
          {('items' in el) && (el.content?.type === 'cat') ?
            <Button
              className="adm-menu-button adm_enter_button"
              onClick={() => { callBackFuncs.adm_enter(`edit/${el.id}/${el.id}`, el.id); }}
            >
              {/* <EnterOutlined /> */}
              <CaretDownOutlined />
            </Button> :
            null}
          {(!('items' in el) && (el.content.type === 'cat')  ) ?
            <Button
              className="adm-menu-button adm_add_button"
              onClick={() => { callBackFuncs.adm_add(el.id); }}
            >
              <PlusCircleOutlined />
            </Button> :
            null}
        </Menu.Item>
      )}
      <Menu.Item key={`add`} className="adm-menu-add">
        <Button
          className="adm-menu-button"
          onClick={() => { callBackFuncs.adm_add(rootId); }}
        >
          <PlusCircleOutlined />
        </Button>
      </Menu.Item>
    </Menu>
  );
}

export default AdmSideMenu;

