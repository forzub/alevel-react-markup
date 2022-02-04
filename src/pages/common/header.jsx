import '../css/headerbox.css';
import { Input } from 'antd';
import { useSelector } from 'react-redux';

import { Avatar, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import MyMenu from '../../components/menu/compMenu';
import Search from 'antd/lib/transfer/search';
import { createMenusLists } from '../../utils/createMenuList';
import { Link } from 'react-router-dom';



const HeaderBox = ({ menuCB, props }) => {

    let logo = 'https://firebasestorage.googleapis.com/v0/b/alevel-finish-base.appspot.com/o/logo.svg?alt=media';
    const base = useSelector(store => store.magazin.base.items);
    const orders = useSelector(store => store.element.goods_order);
    const { Search } = Input;

    let links = createMenusLists(base);


    return (
        <div className="header-bx">
            <Link className="header-logo-link" to="/"><img className="header-logo-im" src={logo} alt="logo" width={80} height={80} /></Link>
            <MyMenu mode="horizontal" menuCB={menuCB} links={links} />

            {/* <form action="" className="header-form-search">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}

                />
            </form> */}
            <div className="icons-list shopcart">
                <Badge count={orders.length}>
                    <ShoppingCartOutlined style={{ 'fontSize': '30px' }} />
                </Badge>
            </div>
            {/* <div className="user"><Avatar size={40} icon={<UserOutlined />} /></div> */}
        </div>
    );
}

export default HeaderBox;