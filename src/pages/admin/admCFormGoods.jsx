import { Form, Input,} from 'antd';
import UploadImgs from '../../components/uploadImgs';

import DynamicFields from '../../components/dynamicFields';
import { useSelector } from 'react-redux';
import { validateMessages, onFinishFailed } from './admCFormsUtils';

const { TextArea } = Input;

const AdmCFormGoods = ({ props, callbacks } ) => {

  const admin_fields = useSelector((store) => store.admin);

 

  return (<>
    <Form
      fields={[
        { name: ['title'], value: admin_fields.content_title },
        { remember: true },
        {
          name: ['params'],
          value: admin_fields.content_params
        },
        {
          name: ['textContent'],
          value: admin_fields.content_textContent
        },
        {
          name: ['description'],
          value: admin_fields.content_description
        },
        {
          name: ['price'],
          value: admin_fields.content_price
        },
      ]}
      name="admin_contentCItm"
      initialValues={{}}
      onFinish={callbacks.formOnFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
      // onChange={formChange}
    >
      <div className="adm-citm-form-row">
        <div className="adm-citm-form-col">

          <Form.Item
            name='title'
            label="Титул"
            rules={[
              {
                required: true,
                message: "обязателен для заполнения"
              },
              {
                min: 4,
                message: 'минимум - 4 символа'
              }
            ]}
            hasFeedback
          >
            <Input placeholder='титул, отображается в меню' />
          </Form.Item>

          <Form.Item
            name='price'
            label="Цена"
            rules={[
              {
                required: true,
                message: "A value must be entered",
                pattern: new RegExp(/^(?=.*\d)\d*(?:\.\d{0,2})?$/)
              },
            ]}
            hasFeedback
            initialValue={0}
          >
            <Input placeholder='Цена' />
          </Form.Item>
        </div>

        <div className="adm-citm-form-col">
          <UploadImgs
            adminImgList={admin_fields.content_image}
            target_key={'content_image'}
            maxCount={4}
            onUpdateImageList={callbacks.uploadUpdateImage}
          />
        </div>
      </div>


      <div className="adm-citm-form-row">
        <div className="adm-citm-form-col">
          <h3>Параметры:</h3>
          <DynamicFields />
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

export default AdmCFormGoods;