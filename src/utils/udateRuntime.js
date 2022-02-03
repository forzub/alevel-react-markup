import { message } from 'antd';
import { RUNTIME_URL } from '../pages/constants';
import { admSetCurrentUser } from '../store/admin';
import { elemSpinerLoadingToggle } from '../store/elements';
import { magazinBaseUpdate } from '../store/magazin';

export const updateRuntime = (payload, dispatch, getState, location ) => {

    const { idToken } = getState().admin.current_user;
    const BASE_URL = `${RUNTIME_URL}${location}?auth=${idToken}`;
    
    dispatch( elemSpinerLoadingToggle() ); 
    fetch(BASE_URL, { method: 'PATCH', body: JSON.stringify(payload), })
        .then(res => res.json())
        .then(data => {

          if (data.error) {
                message.error(data.error);
                message.error('время сессии истекло, необходимо перелогиниться');
                dispatch( admSetCurrentUser(null) );
                localStorage.clear();
            }
            else {
                dispatch(magazinBaseUpdate(payload));
                message.info('сохранено...');
              
            }
        })
        .catch(err => console.log(err))
        .finally(
            dispatch( elemSpinerLoadingToggle() ) 
        );

}