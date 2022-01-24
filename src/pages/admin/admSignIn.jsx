import { Form, Input, Button, Checkbox } from 'antd';
import { useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../../components/hooc/useAuth';
import '../css/signin.css';



const AdmSingIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // console.log(useAuth());

  const {singin} = useAuth();
  const fromPage = location.state?.from?.pathname || '/' ;


  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };


  const onFinish = (values) => {
    singin( values, () => navigate(fromPage, {replace: true}) );
    // dispatch(authAdminAutorization(values));
  };

  const onFinishFailed = (errorInfo) => {
    singin(errorInfo.values, () => navigate(fromPage), {replace: true});
    // console.log('Failed:', errorInfo);
  };


  return (
    <Form
      name="admin_signin"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[{ required: true, type: 'email', message: 'Please input your e-mail!' },]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={false}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

}

export default AdmSingIn;