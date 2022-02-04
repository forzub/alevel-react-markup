import { Layout, Image, Typography, Space } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import '../css/magazin.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { useSelector } from 'react-redux';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';

const { Sider, Content } = Layout;

const PageCMain = () => {

  const myBase = useSelector(store => store.magazin.base);
  const images = myBase.items[0].content.cat_image;

  return (
    <>

      <div className='content-bx'>
        <Content>
          <Typography>
            <Title style={{ textAlign: 'center' }} >ЖИВОТНЕНЬКИЕ</Title>
            <Paragraph style={{ textAlign: 'center' }}>{myBase.items[0].content.description}</Paragraph>
            {
              images ?

                <Swiper
                  // install Swiper modules
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  loop={true}
                  autoplay={true}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  // onSwiper={(swiper) => console.log(swiper)}
                  // onSlideChange={() => console.log('slide change')}
                >
                  {images.map(el => (
                    <SwiperSlide key={el.name}>
                      <Image
                        width={600}
                        src={el.url}
                        preview={false}
                      />
                    </SwiperSlide>
                  ))}
                  {/*  */}


                </Swiper>
                :
                null}
            <Space className='main-space'>
              <Paragraph style={{ textAlign: 'center' }}>{myBase.items[0].content.textContent}</Paragraph>
            </Space>
          </Typography>
        </Content>
      </div>

    </>
  );
}

export default PageCMain;