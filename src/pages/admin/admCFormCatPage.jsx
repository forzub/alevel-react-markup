import { Form, Input } from 'antd';
import { useSelector } from "react-redux";
import UploadImgs from '../../components/uploadImgs';
import { validateMessages, onFinishFailed } from './admCFormsUtils';

const { TextArea } = Input;

const AdmCFormCatPage = ({ props, callbacks }) => {

  const admin_fields = useSelector(store => store.admin);

  return (<>

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
      name="admin_CCatPage"
      initialValues={{}}
      onFinish={callbacks.formOnFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    // onChange={formChange}
    >
      <div className="adm-citm-form-row"
        style={admin_fields.content_type === 'page' ?
          { background: '#eee' } : null}
      >
        <div className="adm-citm-form-col">
          <UploadImgs
            adminImgList={admin_fields.content_cat_image}
            target_key={'content_cat_image'}
            maxCount={1}
            onUpdateImageList={callbacks.uploadUpdateImage}
          />
        </div>

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
        </div>

      </div>

      <div className="adm-citm-form-row itm-text-cont"
        style={admin_fields.content_type === 'page' ?
          { background: '#eee' } : null}
      >
        <h3>Описание объекта:</h3>
        <Form.Item
          className='adm-itm-text-cont'
          name='description'
        >
          <TextArea
            rows={2}
          />
        </Form.Item>
      </div>

      <div className="adm-citm-form-row itm-text-cont"
        style={admin_fields.content_type === 'page' ?
          { background: '#eee' } : null}
      >
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

export default AdmCFormCatPage;