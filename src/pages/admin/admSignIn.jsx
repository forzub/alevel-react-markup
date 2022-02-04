import { Form, Input, Button, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/hooc/useAuth';
import { admSetCurrentUser } from '../../store/admin';
import '../css/signin.css';
import { RUNTIME_URL, SINGIN_URL, TOCKEN_TEST_LOCATION, TOKEN_UPD_URL } from '../constants';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useState, useEffect } from 'react';
import Title from 'antd/lib/typography/Title';
import { elemSpinerLoadingToggle } from '../../store/elements';



const AdmSingIn = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(null);

  const { singin, user } = useAuth();
  const fromPage = location.state?.from?.pathname || '/admin';
  const [buttonSpiner, setButtonSpiner] = useState(false);

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

  useEffect(() => {
    let myStorage = window.localStorage;
    if (myStorage.getItem('myToken') !== null) {
      
      const idToken = myStorage.getItem('myToken');  

      dispatch( elemSpinerLoadingToggle() );

      fetch(`${RUNTIME_URL}${TOCKEN_TEST_LOCATION}?auth=${idToken}`, 
        { method: 'PATCH', body: JSON.stringify({login: 'on'}), })
          .then(res => res.json())
          .then(data => {
  
            if (data.error) {
                  message.error(data.error);
                  message.error('время сессии истекло, необходимо перелогиниться');
                  dispatch( admSetCurrentUser(null) );
                  localStorage.clear();
              }
              else {
                 singin({ expiresIn: 0, idToken: idToken, refreshToken: null }, () => navigate(fromPage), { replace: true });  
              }
          })
          .catch(err => console.log(err))
          .finally(
              dispatch( elemSpinerLoadingToggle() ) 
          );          
    }
  }, []);


  const updateToken = (refreshToken) => {

    fetch(TOKEN_UPD_URL, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
    })
      .then((res) => {

        if (!res.ok) {
          return res.json().then((data) => {
            const errors = { code: data.error.code, message: data.error.message };
            message.error(errors.message);
          });
        }
        return res.json();
      })
      .then(data => {

        const new_user = {
          expiresIn: +data.expires_in,
          idToken: data.id_token,
          refreshToken: data.refresh_token
        }

        singin(new_user, () => { });
        setTimeout(() => updateToken(refreshToken), new_user.expiresIn * 1000);
      })
      .catch(e => message.error(e))

  }


  const onFinishFailed = (errorInfo) => {
    setIsError({ code: 'ввода', message: [] });
  };




  const onFinish = (form_values) => {
    let myStorage = window.localStorage;

    const values = {
      email: 'qwerty@i.ua',
      password: '111111',
    };

    setButtonSpiner(true);

    fetch(SINGIN_URL, {
      method: "POST",
      header: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          email: values.email,
          password: values.password,
          returnSecureToken: true,
        }
      )
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) { setIsError({ code: data.error.code, message: data.error.errors }) }
        else {
          setIsError(null);
          const { expiresIn, idToken, refreshToken } = data;
          singin({ expiresIn: +expiresIn, idToken, refreshToken }, () => navigate(fromPage), { replace: true });

          setTimeout(() => updateToken(refreshToken), +expiresIn * 1000);
          myStorage.setItem('myToken', idToken);
          myStorage.setItem('expiresIn', Date.now());
        }
      })
      .catch(error => { console.log('error auth ', error) })
      .finally(setButtonSpiner(false));
  };


  return (
    <Form
      name="admin_signin"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      // autoComplete="off"
      validateMessages={validateMessages}
    >
      <Form.Item
        name={'email'}
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={buttonSpiner}>
          Submit
        </Button>
      </Form.Item>
      {isError ?
        <>
          <Title level={3} style={{ textAlign: 'center' }} >Ошибка {isError.code}</Title>
          <Typography >
            {Array.from(isError.message).map((el, index) =>
              <Paragraph style={{ textAlign: 'center' }} key={'' + index}>
                {el.message}
              </Paragraph>
            )}
          </Typography>
        </>
        : null}

    </Form>
  );

}

export default AdmSingIn;