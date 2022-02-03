import SiderBox from '../common/sider';
import { Breadcrumb, Layout } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { returnObjByIdFromBase } from '../../utils';

const { Content } = Layout;

const PageCContent = () => {
  const base = useSelector(store => store.magazin.base.items);
  const { id } = useParams();

  const breadcrums = [];
  let current = null;
  let parent = null;

  current = returnObjByIdFromBase(base, +id);
  parent = current.parent;

  
  while (parent) {
    breadcrums.unshift({ title: current.content.title, path: current.content.path, key: `${current.id}` })
    current = returnObjByIdFromBase(base, parent);
    parent = current.parent;
  } ;
  
  breadcrums.unshift({ title: current.content.title, path: current.content.path, key: `${current.id}`})
  





  return (
    <>

      <div className='content-bx'>
        <Breadcrumb >

          {breadcrums.map((el, index, array) =>
            <Breadcrumb.Item key={`${el.key}`}>
              {((index + 1) !== array.length) ?
                <Link to={`/${el.key}${el.path}`} >{el.title}</Link> :
                <>{el.title}</>
              }
            </Breadcrumb.Item>
          )}

        </Breadcrumb>


        <Content>

        </Content>
      </div>

    </>
  );
}

export default PageCContent;