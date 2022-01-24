import { NavLink } from "react-router-dom";
import isEmpty from "ramda/src/isEmpty";
import { useState } from 'react';
import { Button, Menu } from 'antd';

const MyMenu = ({ links = [{}], ...props }) => {

  const [current, setCurrent] = useState('main');
  const handleClick = (e) => { setCurrent(e.key); }



  return (

    <Menu onClick={handleClick} selectedKeys={[current]} {...props}>

      {links.map((el, index) =>
        <Menu.Item key={`${index}`} >
          <NavLink to={el.path}>{el.title}</NavLink>
        </Menu.Item>
      )}

    </Menu>
  );
}

export default MyMenu;

