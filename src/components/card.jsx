import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const { Meta } = Card;


const CatCard = ({ el }) => {

  const navigate = useNavigate();

  let scr = 'https://firebasestorage.googleapis.com/v0/b/alevel-finish-base.appspot.com/o/404.png?alt=media';
  let title = el.content.title;
  let description = '';
  if (el.content.type === 'cat') {
    if (('cat_image' in el.content) && (el.content.cat_image.length > 0)) {
      scr = el.content.cat_image[0].url;
    }
    description = 'каталог';
  } else {
    if (('image' in el.content) && (el.content.image.length > 0)) {
      scr = el.content.image[0].url;
    }
    description = `${el.content.price} грн.`
  }

  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={scr} />}
        onClick={()=> navigate(`/${el.id}${el.content.path}`)}
      >
        <Meta title={title} description={description} />
      </Card>
    </>
  );
}

export default CatCard;