import SiderBox from '../common/sider';
import { Breadcrumb, Layout } from 'antd';

const { Sider, Content } = Layout;

const PageCContent = () => {


  return (
    <>
      <Sider>
        <SiderBox />
      </Sider>

      <div className='content-bx'>
        <Breadcrumb >
          <Breadcrumb.Item>
            <a href="">Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">List</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <Content>

        </Content>
      </div>

    </>
  );
}

export default PageCContent;