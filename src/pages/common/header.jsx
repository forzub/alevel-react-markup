import '../css/headerbox.css';
import { Input, Space } from 'antd';

import { Avatar, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../img/logo.svg';

import MyMenu from '../../components/menu/compMenu';
import Search from 'antd/lib/transfer/search';

const HeaderBox = () => {

    const links = [
        { title: 'Главная', path: '/' },
        { title: 'Каталог', path: '/catalog' },
        { title: 'Контакты', path: '/contacts' },
    ];
    const { Search } = Input;
    const onSearch = value => console.log(value); 

    return (
        <div className="header-bx">
            <a className="header-logo-link" href="/"><img className="header-logo-im" src={logo} alt="logo" width={80} height={80} /></a>
            <MyMenu mode="horizontal" links={links} />
            <form action="" className="header-form-search">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </form>
            <div className="icons-list shopcart">
                <Badge count={5}>
                    <ShoppingCartOutlined style={{'fontSize':'30px'}} />
                </Badge></div>
            <div className="user"><Avatar size={40} icon={<UserOutlined />} /></div>
        </div>
    );
}

export default HeaderBox;