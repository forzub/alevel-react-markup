import {  NavLink, useNavigate } from "react-router-dom";
import {  Menu } from 'antd';
import { useSelector } from "react-redux";
import { returnObjByIdFromBase } from "../../utils";

const { SubMenu } = Menu;

const MyMenu = ({ links = [{}], menuCB, ...props }) => {

  const base = useSelector(store => store.magazin.base.items);
  const navigate = useNavigate();

  const handleSub = ({key}) => {
    const sub = returnObjByIdFromBase(base, +key);
    navigate(`${sub.id}${sub.content.path}`)
  }

  const returnMenuItems = (links) => {

    return (<>
      {links.map((el) =>
        ('items' in el) ?
          <SubMenu 
          key={el.key}  
          title={el.title} 
          onTitleClick={handleSub} 
          >
            {returnMenuItems(el.items)}
          </SubMenu>
          :
          <Menu.Item key={el.key} >
            <NavLink to={el.path}>{el.title}</NavLink>
          </Menu.Item>
      )}
    </>)
  };

  return (
    <Menu
      onClick={menuCB.cb}
      selectedKeys={['' + menuCB.active]}
      {...props}
      
    >
      {returnMenuItems(links)}
    </Menu>
  );
}

export default MyMenu;

