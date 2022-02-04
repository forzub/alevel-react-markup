import { Layout } from 'antd';
import './css/template.css';
import {Outlet, } from "react-router-dom";
import HeaderBox from './common/header';
import FooterBox from './common/footer';
import SiderBox from '../pages/common/sider';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";



// import PageCContent from './magazin/pageCContent';
// import PageCMain from './magazin/pageCMain';

const { Header, Footer, Sider } = Layout;


const Template = () => {

    const { id } = useParams();
    const [current, setCurrent] = useState(null);
    const handleClick = (e) => { setCurrent(e.key); }
    
    // console.log('current', current);

    useEffect(() => {
        if (!id) {
            setCurrent(0);
        }
        else {
            setCurrent(+id);
        }    
    }, [id]
    );

    const menuCB = {
        cb: handleClick,
        active: current,
    };



    return (<>
        <Layout>
            <Header>
                <div className="wrapper">
                    <HeaderBox menuCB={menuCB} />
                </div>
            </Header>

            <Layout>
                <div className="wrapper">
                    <Sider>
                        <SiderBox menuCB={menuCB} />
                    </Sider>
                    <Outlet />
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