import { Button, Typography, Image } from "antd";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { useSelector } from "react-redux";
import { clone } from "ramda";
import { useDispatch } from "react-redux";
import { elemGoodsOrder } from "../../store/elements";



const { Title, Paragraph, Text, Link } = Typography;

const ContentGoods = ({ current }) => {

  const dispatch = useDispatch();
  const elem_orders = clone(useSelector(store => store.element.goods_order));


  const hendleOnClick = () => {
    const order = {
      id: current.id,
      name: current.content.title,
      cost: current.content.price,
    }
    elem_orders.push(order);
    dispatch( elemGoodsOrder(elem_orders) )
  }

  return (
    <>
      <Typography>
        <Title style={{ textAlign: 'center' }} >{current.content.title}</Title>

        <Paragraph style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 30px auto', }}>
          {current.content.description}
        </Paragraph>

        <Paragraph style={{ overflow: 'hidden' }}>
          {
            ('image' in current.content) && (current.content.image.length > 0) ?
              <Paragraph style={{ width: '50%', float: 'left' }} >
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  loop={true}
                  autoplay={true}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {current.content.image.map(el => (
                    <SwiperSlide key={el.name}>
                      <Image
                        width={300}
                        src={el.url}
                        preview={false}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Paragraph>
              :
              null
          }
          {console.log(('params' in current.content) && (current.content.params.length > 0))}
          {
            ('params' in current.content) && (current.content.params.length > 0) ?
              <Paragraph style={{ width: '50%', marginLeft: '50%', paddingLeft: '20px', fontSize: '20px' }}>
                {current.content.params.map((el, index) => (
                  <Paragraph
                    style={{ display: 'flex' }}
                    key={`params_index_${index}`}>
                    <Text
                      style={{
                        display: 'flex',
                        flex: '1 0 auto',
                        padding: '5px 10px',
                        border: "1px solid #ccc",
                        borderRadius: '4px',
                        marginRight: '15px',
                      }}
                      strong
                    >
                      {el.param_name}</Text> :
                    <Text
                      style={{
                        display: 'flex',
                        flex: '1 0 auto',
                        padding: '5px 10px',
                        border: "1px solid #ccc",
                        borderRadius: '4px',
                        marginLeft: '15px',
                      }}
                      strong
                    >{el.param_value}</Text>
                  </Paragraph>
                ))}
              </Paragraph>
              : null
          }

        </Paragraph>


        <Paragraph style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text strong style={{ fontSize: '25px' }} >{`${current.content.price} грн.`}</Text>
          <Button type='button' onClick={hendleOnClick}> Купить </Button>
        </Paragraph>
      </Typography>


    </>
  );
}

export default ContentGoods;