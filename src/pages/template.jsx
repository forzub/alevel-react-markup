import { Layout } from 'antd';
import './css/template.css';
import { Routes, Route, } from "react-router-dom";
import HeaderBox from './common/header';
import FooterBox from './common/footer';
import PageCContent from './magazin/pageCContent';
import PageCMain from './magazin/pageCMain';



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
                    <Routes>
                        <Route index element={<PageCMain />} />
                        <Route path='/:id/:path' element={<PageCContent />} />
                        <Route path='/:id' element={<PageCContent />} />
                    </Routes>
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