
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
            image: '',
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
            image: '',
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
            image: '',
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
            image: '',
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
            image: '',
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
            image: '',
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
            image: '',
            description: 'Земноводные, или амфибии (Amphibia)',
            textContent: 'Земноводные, или амфибии (Amphibia) — класс позвоночных животных',
          },
          items: [
            {
              id: 10,
              parent: 9,
              content: {
                path: '/zveri2',
                title: 'Звери2',
                image: '',
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