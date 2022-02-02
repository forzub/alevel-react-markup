import { useEffect } from "react";
import { Button, Form, Input, Image, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SaveOutlined } from '@ant-design/icons';
import { validateMessages, onFinishFailed } from './admCFormsUtils';
import { magazinBase_Update } from "../../store/magazin/actions";
import { returnObjByIdFromBase, transliterate } from "../../utils";
import { clone } from "ramda";
import UploadImgs from '../../components/uploadImgs';
import logo from '../../img/logo.svg';
import { admSetFormsFields } from "../../store/admin";


const { TextArea } = Input;

const AdmCMain = () => {

  const dispatch = useDispatch()
  const admin_fields = useSelector(store => store.admin);
  const base = clone(useSelector(store => store.magazin.base));
  let current_obj = returnObjByIdFromBase(base.items, 0);
  current_obj = current_obj.content;

  const {
    content_cat_image,
    content_description,
    content_textContent,
  } = useSelector(store => store.admin);

  function forms_fields_set() {
    const adm_forms_fields = {
      content_cat_image: !current_obj.cat_image ? [] : current_obj.cat_image,
      content_description: current_obj.description,
      content_textContent: current_obj.textContent,
    }
    dispatch(admSetFormsFields(adm_forms_fields));
  }

  useEffect(() => {
    forms_fields_set();

    console.log('tyt')
  },[current_obj.description, current_obj.textContent, ]);




  const onMainFormFinish = (values) => {
    console.log('mainform', values);

    let content = {
      content_description : values.description,
      content_textContent : values.textContent,
    }
    
    current_obj.cat_image = content_cat_image;
    current_obj.description = values.description;
    current_obj.textContent = values.textContent;
    
    forms_fields_set();
    // dispatch(admSetFormsFields({content}));
    dispatch(magazinBase_Update(base));
  }

  const udateImages = (imList) => {
    let image_key = 'cat_image';
    current_obj[image_key] = imList;
    // content_cat_image = imList;
    // dispatch(admSetFormsFields({content_cat_image}));
    dispatch(magazinBase_Update(base));

  }



  return (<>
    <div className="adm-citm-form-row itm-text-cont">
      <div className="adm_itm_top_menu">
        <h1 className="adm_itm_top_menu_ti">Главная Страница</h1>
        <Image width={100} src={logo} preview={false} />
        <div className="adm_top-menu_butbx">
          <Button
            type="button"
            htmlType="submit"
            form="admin_CMain" >
            <SaveOutlined /> Сохранить
          </Button>
        </div>
      </div>
    </div>

    <Form
      fields={[
        { name: ['title'], value: admin_fields.content_title },
        {
          name: ['textContent'],
          value: admin_fields.content_textContent
        },
        {
          name: ['description'],
          value: admin_fields.content_description
        },
      ]}
      name="admin_CMain"
      onFinish={onMainFormFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    // onChange={formChange}
    >

      <div className="adm-citm-form-row">
        <div className="adm-citm-form-col">
          <h3>Слайдер:</h3>
          <UploadImgs
            adminImgList={admin_fields.content_cat_image}
            target_key={'content_cat_image'}
            maxCount={4}
            onUpdateImageList={udateImages}
          />
        </div>

        <div className="adm-citm-form-col">
          <h3>Описание объекта:</h3>
          <Form.Item
            name='description'
          >
            <TextArea
              rows={6}
            />
          </Form.Item>
        </div>
      </div>

      <div className="adm-citm-form-row itm-text-cont">
        <h3>Основной контент:</h3>
        <Form.Item
          className='adm-itm-text-cont'
          name='textContent'
        >
          <TextArea
            rows={4}
          />
        </Form.Item>
      </div>


    </Form>


  </>);
}

export default AdmCMain;