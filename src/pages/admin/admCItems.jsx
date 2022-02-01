import { Button, Checkbox, Form, } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { returnObjByIdFromBase, transliterate } from "../../utils";
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { clone } from "ramda";
import AdmCFormGoods from './admCFormGoods';
import { admSetFormsFields } from "../../store/admin";
import { useDispatch } from "react-redux";
import { magazinBase_Update } from "../../store/magazin/actions";
import AdmCFormCatPage from "./admCFormCatPage";



const AdmCItems = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pagetype, setType] = useState('itm');
  const { id, path } = useParams();
  const base = clone(useSelector(store => store.magazin.base));
  let current_obj = returnObjByIdFromBase(base.items, +id);
  const { title, type, image, cat_image, price, params, show, description, textContent } = current_obj.content

  const {
    content_title,
    content_type,
    content_image,
    content_cat_image,
    content_price,
    content_show,
    content_params,
    content_description,
    content_textContent,
    save_active,
  } = useSelector(store => store.admin);

  const types = [
    { types: 'page', title: 'Страница' },
    { types: 'cat', title: 'Каталог' },
    { types: 'itm', title: 'Товар' },
  ]

  const getTypeTitle = (array, key) => {
    return array.filter(el => el.types === key)[0];
  }

  function onChange(e) {
    current_obj.content.show = e.target.checked;
    dispatch(admSetFormsFields({ content_show: current_obj.content.show, }));
    dispatch(magazinBase_Update(base));
  }

  const onClick = ({ key }) => {
    current_obj.content.type = key;
    setType(key);
    dispatch(admSetFormsFields({ content_type: current_obj.content.type, }));
    dispatch(magazinBase_Update(base));
  };

  const menu = (
    <Menu onClick={onClick}>
      {types.map(element => <Menu.Item key={element.types}>{element.title}</Menu.Item>)}
    </Menu>
  );

  const onClickRemove = () => {
    const parent = current_obj.parent;
    let parent_obj = base;
    let new_path = '/admin';

    if (parent) {
      parent_obj = returnObjByIdFromBase(base.items, parent);
      new_path = `/admin/edit/${parent}/${parent}`;
    }

    const new_items = parent_obj.items.filter(el => el.id !== current_obj.id);

    if (new_items.length === 0) {
      delete parent_obj.items;
      new_path = `/admin/edit/${parent_obj.parent}/${parent_obj.parent}`;
    }
    else { parent_obj.items = [...new_items]; }

    dispatch(magazinBase_Update(base));
    navigate(new_path, { replace: true });
  }



  function forms_fields_set() {
    const adm_forms_fields = {
      content_title: title,
      content_type: type,
      content_image: !image ? [] : image,
      content_cat_image: !cat_image ? [] : cat_image,
      content_params: !params ? [] : params,
      content_price: !price ? '0' : price,
      content_show: !show ? true : show,
      content_description: description,
      content_textContent: textContent,
    }
    dispatch(admSetFormsFields(adm_forms_fields));
  }

  useEffect(() => {
    forms_fields_set();
    if ('type' in current_obj.content) {
      setType(current_obj.content.type)
    }
  },
    [id, current_obj.content.type,]);


  const udateImages = (imList, image_key = `${content_type === 'itm' ? 'image' : 'cat_image'}`) => {
    current_obj.content[image_key] = imList;
    dispatch(magazinBase_Update(base));
  }


  const completeDataOnFinish = (values, adm_forms_fields) => {

    current_obj.content.description = values.description;
    current_obj.content.textContent = values.textContent;
    current_obj.content.title = values.title;

    current_obj.content.show = content_show;
    current_obj.content.type = content_type;
    current_obj.content.path = `/${transliterate(values.title).toLowerCase().replace(/ /g, "_").replace(/-/g, "_")}`;

    adm_forms_fields.content_description = current_obj.content.description;
    adm_forms_fields.content_textContent = current_obj.content.textContent;
    adm_forms_fields.content_title = current_obj.content.title;

    dispatch(admSetFormsFields(adm_forms_fields));
    dispatch(magazinBase_Update(base));
    navigate(`/admin/edit/${current_obj.id}${current_obj.content.path}`, { replace: true });

  }


  const onGoodsFormFinish = (values) => {
    console.log('GOODS', values);

    current_obj.content.image = content_image;
    current_obj.content.params = values.params;
  
    const adm_forms_fields = {
      content_params: current_obj.content.params,
      content_price: current_obj.content.price,
    }

    completeDataOnFinish(values, adm_forms_fields);
  };


  const onCatPageFormFinish = (values) => {
    current_obj.content.cat_image = content_cat_image;

    const adm_forms_fields = {}
    completeDataOnFinish(values, adm_forms_fields);
  }







  return (<>
    { }
    <div className="adm_itm_top_menu">
      <h1 className="adm_itm_top_menu_ti">Управление магазином</h1>
      <div className="adm_top-menu_butbx">

        <Checkbox
          name='notPublic'
          onChange={onChange}
          checked={content_show}
        >
          Публиковать
        </Checkbox>

        <Dropdown
          overlay={menu} >
          <Button onClick={e => e.preventDefault()}>
            {getTypeTitle(types, pagetype).title} <DownOutlined />
          </Button>
        </Dropdown>

        <Button
          type="button"
          disabled={!save_active}
          htmlType="submit"
          form={pagetype === 'itm' ? "admin_contentCItm"
            : pagetype === 'cat' ? "admin_CCatPage"
              : pagetype === 'page' ? "admin_CCatPage" : "admin_CMainPage"}
        >
          <SaveOutlined /> Сохранить
        </Button>

        <Button type='button' onClick={onClickRemove} > <DeleteOutlined /> Удалить </Button>

      </div>
    </div>

    <h2> {current_obj.content.title}  </h2>

    {pagetype === 'itm' ?
      <AdmCFormGoods
        callbacks={{
          formOnFinish: onGoodsFormFinish,
          uploadUpdateImage: udateImages,
          content: 'image'
        }}
      /> : null}
    {pagetype === 'cat' ?
      <AdmCFormCatPage
        callbacks={{
          formOnFinish: onCatPageFormFinish,
          uploadUpdateImage: udateImages,
          content: 'cat_image',
        }}
      /> : null}

    {pagetype === 'page' ?
      <AdmCFormCatPage
        callbacks={{
          formOnFinish: onCatPageFormFinish,
          uploadUpdateImage: udateImages,
          content: 'cat_image',

        }}
      /> : null}

  </>);

}

export default AdmCItems;