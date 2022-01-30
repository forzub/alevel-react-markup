
export const magazinBase = {
  curentID: 10,
  parent: null,
  items: [
    {
      id: 0,
      parent: null,
      content: {
        title: 'Главная',
        type: 'page',
        path: '/',
      },
    },

    {
      id: 1,
      parent: null,
      content: {
        title: 'Контакты',
        type: 'page',
        path: '/contact',
      },
    },

    {
      id: 2,
      parent: null,
      content: {
        title: 'Каталог',
        type: 'cat',
        path: '/catalog',
      },

      items: [
        {
          id: 3,
          parent: 2,
          content: {
            path: '/zveri',
            title: 'Звери',
            type: 'itm',
            price: '32.40',
            image: [
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              },
              {
                uid: '-2',
                name: 'patric.png',
                status: 'done',
                url: 'https://firebasestorage.googleapis.com/v0/b/alevel-finish-base.appspot.com/o/1.jpg?alt=media',
              }
            ],
            params: [{ param_name: 'Потребление еды', param_value: 'да' }, { param_name: 'Летает', param_value: 'нет' }],
            description: 'Млекопитающие или звери (Mammalia)',
            textContent: 'Млекопитающие или звери (Mammalia) — класс позвоночных животных',
          }

        },
        {
          id: 4,
          parent: 2,
          content: {
            path: '/pticy',
            title: 'Птицы',
            type: 'itm',
            image: [],
            description: 'Птицы (Aves)',
            textContent: 'Кроме самих птиц, Вы так же можете заказать их перья. Птицы (Aves) — класс теплокровных яйцекладущих позвоночных животных',
          }
        },
        {
          id: 5,
          parent: 2,
          content: {
            path: '/zmei',
            title: 'Змеи',
            type: 'itm',
            image: [],
            description: 'Змеи (Serpentes)',
            textContent: 'Змеи (Serpentes) — подотряд пресмыкающихся отряда чешуйчатые.',
          }
        },
        {
          id: 6,
          parent: 2,
          content: {
            path: '/yasherica',
            title: 'Ящерицы',
            type: 'itm',
            image: [],
            description: 'Ящерицы (Lacertilia)',
            textContent: 'Ящерицы (Lacertilia) — подотряд отряда чешуйчатых класса пресмыкающихся',
          }
        },
        {
          id: 7,
          parent: 2,
          content: {
            path: '/cherepahi',
            title: 'Черепахи',
            type: 'itm',
            image: [],
            description: 'Черепахи (Testudines)',
            textContent: 'Черепахи (Testudines) — один из четырёх отрядов пресмыкающихся',
          }
        },
        {
          id: 8,
          parent: 2,
          content: {
            path: '/cayman',
            title: 'Кайманы',
            type: 'itm',
            image: [],
            description: 'Кайман (Caiman crocodylus)',
            textContent: 'Небольшой кайман с довольно длинной, суженной спереди мордой',
          }
        },
        {
          id: 9,
          parent: 2,
          content: {
            path: '/amfibia',
            title: 'Амфибии',
            type: 'cat',
            image: [],
            description: 'Земноводные, или амфибии (Amphibia)',
            textContent: 'Земноводные, или амфибии (Amphibia) — класс позвоночных животных',
          },
          items: [
            {
              id: 10,
              parent: 9,
              content: {
                path: '/amfibki',
                title: 'Амфибки',
                type: 'itm',
                image: [],
                description: 'Млекопитающие или звери (Mammalia)',
                textContent: 'Млекопитающие или звери (Mammalia) — класс позвоночных животных',
              }
    
            },
          ]
        },
      ]
    }
  ],
}

export const users = {



}


export const STORAGE_URL = '/alevel-finish-base.appspot.com';
export const FBASE_URL = `https://firebasestorage.googleapis.com/v0/b${STORAGE_URL}/o`;
export const API_KEY = 'AIzaSyAlwGG1B-9uOuHgQ8JsOJ-SaOBAIS6oipQ-AIzaSyAlwGG1B';
export const SINGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY.slice(0,39)}`;
export const TOKEN_UPD_URL = `https://securetoken.googleapis.com/v1/token?key=${API_KEY.slice(0,39)}`;
export const RUNTIME_URL = 'https://alevel-finish-base-default-rtdb.firebaseio.com/alevel/-MugREdDrupZod0sqwkQ.json';