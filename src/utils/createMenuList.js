import { returnObjByIdFromBase } from ".";

export const createMenusLists = (base, subMenu = false) => {
  let links = [];

  if (base.length > 0) {
    
    base.forEach(el => {
      let obj = {}

      if (!('show' in el.content)) { el.content.show = true }
      if (el.content.show) {

        obj = (el.id !== 0) ?
          { title: el.content.title, path: `${el.id}${el.content.path}`, key: '' + el.id } :
          { title: el.content.title, path: `/`, key: '0' };

        if ((subMenu) && (el.content.type === 'cat') && ('items' in el)) {

          let child = returnObjByIdFromBase(base, el.id)
          obj.items = createMenusLists(child.items);
        }
        links.push(obj);
      }
    }
    );
  }
  return links

}