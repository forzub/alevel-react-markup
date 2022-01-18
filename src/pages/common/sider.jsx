import MyMenu from '../../components/menu/compMenu';
import '../css/siderbox.css';

const links = [
    { title: 'Главная', path: '/' },
    { title: 'Каталог', path: '/catalog' },
    { title: 'Контакты', path: '/contacts' },
];


const SiderBox = () => {

    return (
        <>
            <MyMenu mode="vertical" links={links} />
        </>
    );
}

export default SiderBox;