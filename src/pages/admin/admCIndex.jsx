import { Image, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';




const AdmIndexC = () => {

  let logo = 'https://firebasestorage.googleapis.com/v0/b/alevel-finish-base.appspot.com/o/logo.svg?alt=media';


  return (
    <> <div className="mainpage_wrp">
      <Typography style={{textAlign: 'center', width: '100%', opacity:'0.5'}}>
        <Title> HELL-МИНКО </Title>
      </Typography>
      <Image width={200} src={logo} preview={false} />
    </div>
    </>
  );
}

export default AdmIndexC;