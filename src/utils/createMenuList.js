import { returnObjByIdFromBase } from ".";

export const createMenusLists = (base, subMenu = false) => {
  let links = [];

    if (base.length > 0) {
      links = base.map(el => {
        let obj = (el.id !== 0) ?
          { title: el.content.title, path: `${el.id}${el.content.path}`, key: '' + el.id } :
          { title: el.content.title, path: `/`, key: '0' };

          if((subMenu) && (el.content.type === 'cat') && ('items' in el) ){

            let child = returnObjByIdFromBase(base, el.id)
            obj.items = createMenusLists(child.items);

          }
          

        return obj;
      });
    }
    return links
  
  

}