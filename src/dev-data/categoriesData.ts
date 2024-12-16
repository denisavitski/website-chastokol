import type { MenuCatalogItem } from '@elements/MenuCatalog.astro'

export const categoriesData: Array<MenuCatalogItem> = [
  {
    id: 'menu-fences',
    button: {
      icon: 'fence-1',
      name: 'Заборы',
    },
    category: {
      columns: [
        {
          id: 'fences-1',
          title: 'Металлические заборы',
          links: [
            {
              href: '/',
              name: 'Из профнастила',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из евроштакетника',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из сетки рабица',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из профильной трубы',
              image: { src: '/images/small-preview.jpg' },
            },
          ],
        },
        {
          id: 'fences-2',
          title: 'Деревянные заборы',
          links: [
            {
              href: '/',
              name: 'Горизонтальные',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Шахматка',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из штакетника',
              image: { src: '/images/small-preview.jpg' },
            },
          ],
        },
        {
          id: 'fences-3',
          title: 'Заборы для дачи',
          links: [
            {
              href: '/',
              name: 'Из профнастила',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из евроштакетника',
              image: { src: '/images/small-preview.jpg' },
            },
          ],
        },
        {
          id: 'fences-5',
          title: 'Заборы из пластика',
          links: false,
        },
        {
          id: 'fences-5',
          title: 'Кованые заборы',
          links: [
            {
              href: '/',
              name: 'Из сетки рабица',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из профильной трубы',
              image: { src: '/images/small-preview.jpg' },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'menu-gates',
    button: {
      icon: 'fence-2',
      name: 'Ворота',
    },
    category: {
      columns: [
        {
          id: 'gates-1',
          title: 'Металлические заборы',
          links: [
            {
              href: '/',
              name: 'Из профнастила',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из евроштакетника',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из сетки рабица',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из профильной трубы',
              image: { src: '/images/small-preview.jpg' },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'menu-wickets',
    button: {
      icon: 'fence-3',
      name: 'Калитки',
    },
    category: {
      columns: [
        {
          id: 'wickets-1',
          title: 'Металлические заборы',
          links: [
            {
              href: '/',
              name: 'Из профнастила',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из евроштакетника',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из сетки рабица',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из профильной трубы',
              image: { src: '/images/small-preview.jpg' },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'menu-awnings',
    button: {
      icon: 'fence-4',
      name: 'Навесы',
    },
    category: {
      columns: [
        {
          id: 'awnings-1',
          title: 'Металлические заборы',
          links: [
            {
              href: '/',
              name: 'Из профнастила',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из евроштакетника',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из сетки рабица',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из профильной трубы',
              image: { src: '/images/small-preview.jpg' },
            },
          ],
        },
      ],
    },
  },
  {
    id: 'menu-piles',
    button: {
      icon: 'fence-5',
      name: 'Сваи',
    },
    category: {
      columns: [
        {
          id: 'piles-1',
          title: 'Металлические заборы',
          links: [
            {
              href: '/',
              name: 'Из профнастила',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из евроштакетника',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из сетки рабица',
              image: { src: '/images/small-preview.jpg' },
            },
            {
              href: '/',
              name: 'Из профильной трубы',
              image: { src: '/images/small-preview.jpg' },
            },
          ],
        },
      ],
    },
  },
]
