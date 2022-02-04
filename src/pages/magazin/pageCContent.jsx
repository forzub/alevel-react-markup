import SiderBox from '../common/sider';
import { Breadcrumb, Layout } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { returnObjByIdFromBase } from '../../utils';
import ContentPage from './contentPage';
import ContentCat from './contentCat';
import ContentGoods from './contentGoods';

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
  current = returnObjByIdFromBase(base, +id);

  const page_type = current.content.type;

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
              { page_type === 'page' ? <ContentPage current={current}/> : null}
              { page_type === 'cat' ? <ContentCat current={current}/> : null}
              { page_type === 'itm' ? <ContentGoods current={current}/> : null}
        </Content>
      </div>

    </>
  );
}

export default PageCContent;