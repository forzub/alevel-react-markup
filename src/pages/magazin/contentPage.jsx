import { Typography, Image } from 'antd';

const { Title, Paragraph,} = Typography;

const ContentPage = ({ current, props }) => {


  return (<>
    <Typography>
      <Title level={2}>{current.content.title}</Title>

      <Paragraph style={{ textAlign : 'center' ,} }>
        <Image
          width={600}
          preview={false}
          src={current.content.cat_image[0].url}
        />
      </Paragraph>

      <Paragraph>
        {current.content.description}
      </Paragraph>

      <Paragraph>
        {current.content.textContent}
      </Paragraph>

    </Typography>
  </>);
}

export default ContentPage;