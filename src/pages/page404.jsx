import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {

const navigate = useNavigate();


const handleClick = () => {
  navigate(`/admin`, { replace: true });
}

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={handleClick}>Back Home</Button>}
      />
    </>
  );
}

export default PageNotFound;