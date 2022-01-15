import { Layout, Breadcrumb } from 'antd';
import './css/template.css';
import HeaderBox from './common/header';
import FooterBox from './common/footer';
import SiderBox from './common/sider';
import ContentBox from './common/content';

const { Header, Footer, Sider, Content } = Layout;

const Template = () => {
    return (<>
        <Layout>
            <Header>
                <div className="wrapper">
                    <HeaderBox />
                </div>
            </Header>
            <Layout>
                <div className="wrapper">
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
                            <ContentBox />
                        </Content>
                    </div>
                </div>
            </Layout>
            <Footer>
                <div className="wrapper">
                    <FooterBox />
                </div>
            </Footer>
        </Layout>
    </>);
}

export default Template;