import { Button, Checkbox  } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { returnObjByIdFromBase } from "../../utils";
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { clone } from "ramda";
import AdmCFormItm from './admCFormItm';


const AdmCItems = () => {
  const [pagetype, setType] = useState('itm');
  const { id } = useParams();
  const base =  clone(useSelector(store => store.magazin.base));
  const current_obj =  returnObjByIdFromBase(base.items, +id);

  useEffect(() => {
    if ('type' in current_obj.content) {
      setType(current_obj.content.type)
    }    
  }, 
    [current_obj.content.type, id]);
  

  const onClick = ({ key }) => {
    current_obj.content.type = key;
    setType(key);
    // console.log(current_obj.content.type)
  };

  const types = [
    { types: 'page', title: 'Страница' },
    { types: 'cat', title: 'Каталог' },
    { types: 'itm', title: 'Товар' },
  ]

  const getTypeTitle = (arr, key) => {
    return arr.filter(el => el.types === key)[0];
  }

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const menu = (
    <Menu onClick={onClick}>
      {types.map(element => <Menu.Item key={element.types}>{element.title}</Menu.Item>)}
    </Menu>
  );

  return (<>
    <div className="adm_itm_top_menu">
      <h1 className="adm_itm_top_menu_ti">Управление магазином</h1>
      <div className="adm_top-menu_butbx">
        <Checkbox onChange={onChange}>Не публиковать</Checkbox>
        <Dropdown overlay={menu} >
        <Button onClick={e => e.preventDefault()}>
            {getTypeTitle(types, pagetype).title} <DownOutlined />
          </Button>
        </Dropdown>
        <Button type="button" onClick={() => null} > <SaveOutlined /> Сохранить </Button>
        <Button type='button' onClick={() => null} > <DeleteOutlined /> Удалить </Button>
      </div>
    </div>
    <h2> {current_obj.content.title}  </h2>
    { pagetype === 'itm' ? <AdmCFormItm titulVal={current_obj.content.title} /> : null }

    




  </>);

}

export default AdmCItems;