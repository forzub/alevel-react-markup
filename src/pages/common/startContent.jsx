import { Image, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import logo from '../../img/logo.svg';



const StartContent = () => {

  return (
    <> <div className="mainpage_wrp">
      <Typography style={{textAlign: 'center', width: '100%', opacity:'0.5'}}>
        <Title> Животненькие </Title>
      </Typography>
      <Image width={200} src={logo} preview={false} />
    </div>
    </>
  );
}

export default StartContent;