import { Routes, Route, Link } from "react-router-dom";
import isEmpty from "ramda/src/isEmpty";
import { useState } from 'react';
import { Menu } from 'antd';

const MyMenu = ({ links = [{}], ...props }) => {
  const [current, setCurrent] = useState('main');
  const handleClick = (e) => { setCurrent(e.key); }



  return (

    <Menu onClick={handleClick} selectedKeys={[current]} {...props}>
      
      {links.map((el, index) =>
      <Menu.Item key={`${index}`} ><Link to={el.path}>{el.title}</Link></Menu.Item>
      )}

    </Menu>
  );
}

export default MyMenu;

// {/* {!isEmpty(links) ? links.map((el, index) =><Menu.Item key={index} ><Link to={el.path}>{el.title}</Link></Menu.Item>) : null} */}
//      {/* { links.map((el, index) =><Menu.Item key={`${index}`} ><Link to={el.path}>{el.title}</Link></Menu.Item>)} */}