import { Form, Input, Button, Checkbox } from 'antd';
import  UploadImgs from '../../components/uploadImgs';

const AdmCFormItm = ({ titulVal = '', ...props }) => {

  

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
      text: null,
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };


  const onFinish = (values) => {
    console.log('values', values);
    // dispatch(authAdminAutorization(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };




  return (<>
    <Form
      name="admin_contentCItm"
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
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
            initialValue={titulVal}
          >
            <Input placeholder='титул, отображается в меню' />

          </Form.Item>
        </div>

      </div>


      {/* <Form.Item wrapperCol={{ offset: 22, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={false}>
          Submit
        </Button>
      </Form.Item> */}

      <Form.Item>
        <UploadImgs />
      </Form.Item>
    </Form>


  </>);
}

export default AdmCFormItm;