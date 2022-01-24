
export const returnObjByIdFromBase = (odjArr, id, field='id') =>{
  let result = null; 
  let arr = field.split('/');
  
  for(let i = 0; i < odjArr.length; i++){
    let item = odjArr[i];
    
    for(let k=0; k < arr.length; k++){
      item = item[arr[k]];
    }

    result = (item === id) ?  odjArr[i] : null;
    if(!result){ 
      if( 'items' in odjArr[i]) {
        result = returnObjByIdFromBase(odjArr[i].items, id);
      }
    }
    if(result) return result;
  };  
  return result;
}


