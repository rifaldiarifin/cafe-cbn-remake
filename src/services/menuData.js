export const menuData = new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      {
        uuid: 'c11',
        name: 'Americano',
        image: '/coffee/americano.jpg',
        price: 12000,
        contents: '-',
        menuCode: '',
        menuType: {
          category: { name: 'Drinks', image: '/coffee/espresso_coffee.jpg' },
          subCategory: { name: 'Coffee', image: '/coffee/espresso_coffee.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c12',
        name: 'Espresso',
        price: 11000,
        image: '/coffee/espresso_coffee.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Drinks', image: '/coffee/espresso_coffee.jpg' },
          subCategory: { name: 'Coffee', image: '/coffee/espresso_coffee.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c13',
        name: 'Cappuccino',
        price: 20000,
        image: '/coffee/cappuccino_coffee.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Drinks', image: '/coffee/espresso_coffee.jpg' },
          subCategory: { name: 'Coffee', image: '/coffee/espresso_coffee.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c14',
        name: 'Macchiato',
        price: 19000,
        image: '/coffee/macchiato.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Drinks', image: '/coffee/espresso_coffee.jpg' },
          subCategory: { name: 'Coffee', image: '/coffee/espresso_coffee.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c21',
        name: 'Black Charcoal',
        price: 25000,
        image: '/noncoffee/black_charcoal.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Drinks', image: '/coffee/espresso_coffee.jpg' },
          subCategory: { name: 'Non Coffee', image: '/noncoffee/black_charcoal.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c22',
        name: 'Mango Juice',
        price: 23500,
        image: '/noncoffee/mango_juice.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Drinks', image: '/coffee/espresso_coffee.jpg' },
          subCategory: { name: 'Non Coffee', image: '/noncoffee/black_charcoal.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c23',
        name: 'Matcha Latte',
        price: 24000,
        image: '/noncoffee/matcha_latte.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Drinks', image: '/coffee/espresso_coffee.jpg' },
          subCategory: { name: 'Non Coffee', image: '/noncoffee/black_charcoal.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c31',
        name: 'Chocolate',
        price: 12000,
        image: '/cake/chocolate-cake-piece.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Deserts', image: '/cake/white-chocolate-mocha-cake.jpg' },
          subCategory: { name: 'Cake', image: '/cake/white-chocolate-mocha-cake.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c32',
        name: 'White Chocolate Mocha',
        price: 12000,
        image: '/cake/white-chocolate-mocha-cake.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Deserts', image: '/cake/white-chocolate-mocha-cake.jpg' },
          subCategory: { name: 'Cake', image: '/cake/white-chocolate-mocha-cake.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c41',
        name: 'Berry Dairy',
        price: 9000,
        image: '/cupcake/berry-cupcake-dairy.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Deserts', image: '/cake/white-chocolate-mocha-cake.jpg' },
          subCategory: { name: 'Cupcake', image: '/cupcake/vegan-tiramisu-cupcakes.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c42',
        name: 'Vegan Tiramisu',
        price: 1100,
        image: '/cupcake/vegan-tiramisu-cupcakes.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Deserts', image: '/cake/white-chocolate-mocha-cake.jpg' },
          subCategory: { name: 'Cupcake', image: '/cupcake/vegan-tiramisu-cupcakes.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c43',
        name: 'Red Velvet',
        price: 9000,
        image: '/cupcake/Red-Velvet-Cupcakes.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Deserts', image: '/cake/white-chocolate-mocha-cake.jpg' },
          subCategory: { name: 'Cupcake', image: '/cupcake/vegan-tiramisu-cupcakes.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c51',
        name: 'Chocolate Peanut',
        price: 7000,
        image: '/icecream/chocolate-peanut-icecream.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Deserts', image: '/cake/white-chocolate-mocha-cake.jpg' },
          subCategory: { name: 'Ice Cream', image: '/icecream/chocolate-peanut-icecream.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      },
      {
        uuid: 'c61',
        name: 'Chocolate Chip',
        price: 1500,
        image: '/cookies/chocolate-chip-cookies.jpg',
        menuCode: '',
        contents: '-',
        menuType: {
          category: { name: 'Deserts', image: '/cake/white-chocolate-mocha-cake.jpg' },
          subCategory: { name: 'Cookies', image: '/cookies/chocolate-chip-cookies.jpg' }
        },
        menuRatings: [],
        createdAt: '',
        updatedAt: ''
      }
    ])
  }, 1000)
})

// const allMenu = {
//     coffee: [
//         {
//             uuid: "c11",
//             name: "Americano",
//             price: 12000,
//             img: "/coffee/americano.jpg"
//         },
//         {
//             uuid: "c12",
//             name: "Espresso",
//             price: 11000,
//             img: "/coffee/espresso_coffee.jpg"
//         },
//         {
//             uuid: "c13",
//             name: "Cappuccino",
//             price: 20000,
//             img: "/coffee/cappuccino_coffee.jpg"
//         },
//         {
//             uuid: "c14",
//             name: "Macchiato",
//             price: 19000,
//             img: "/coffee/macchiato.jpg"
//         },
//     ],
//     noncoffee: [
//         {
//             uuid: "c21",
//             name: "Black Charcoal",
//             price: 25000,
//             img: "/noncoffee/black_charcoal.jpg"
//         },
//         {
//             uuid: "c22",
//             name: "Mango Juice",
//             price: 23500,
//             img: "/noncoffee/mango_juice.jpg"
//         },
//         {
//             uuid: "c23",
//             name: "Matcha Latte",
//             price: 24000,
//             img: "/noncoffee/matcha_latte.jpg"
//         }
//     ],
//     cake: [
//         {
//             uuid: "c31",
//             name: "Chocolate",
//             price: 12000,
//             img: "/cake/chocolate-cake-piece.jpg"
//         },
//         {
//             uuid: "c32",
//             name: "White Chocolate Mocha",
//             price: 12000,
//             img: "/cake/white-chocolate-mocha-cake.jpg"
//         }
//     ],
//     cupcake: [
//         {
//             uuid: "c41",
//             name: "Berry Dairy",
//             price: 9000,
//             img: "/cupcake/berry-cupcake-dairy.jpg"
//         },
//         {
//             uuid: "c42",
//             name: "Vegan Tiramisu",
//             price: 1100,
//             img: "/cupcake/vegan-tiramisu-cupcakes.jpg"
//         },
//         {
//             uuid: "c43",
//             name: "Red Velvet",
//             price: 9000,
//             img: "/cupcake/Red-Velvet-Cupcakes.jpg"
//         }
//     ],
//     icecream: [
//         {
//             uuid: "c51",
//             name: "Chocolate Peanut",
//             price: 7000,
//             img: "/icecream/chocolate-peanut-icecream.jpg"
//         }
//     ],
//     cookies: [
//         {
//             uuid: "c61",
//             name: "Chocolate Chip",
//             price: 1500,
//             img: "/cookies/chocolate-chip-cookies.jpg"
//         }
//     ]
// }

// export const menuData = [
//     {
//         menu: {
//             title: "Filtering"
//         },
//         subMenu: [
//             {
//                 title: "Hot",
//                 icon: "fire",
//                 data: [...allMenu.coffee, ...allMenu.noncoffee, ...allMenu.cake, ...allMenu.cupcake, ...allMenu.icecream, ...allMenu.cookies]
//             },
//             {
//                 title: "Discount",
//                 icon: "two-hearts",
//                 data: [...allMenu.coffee, ...allMenu.cake]
//             },
//             {
//                 title: "Expensive",
//                 icon: "up",
//                 data: [...allMenu.icecream, ...allMenu.cookies]
//             },
//             {
//                 title: "Cheapest",
//                 icon: "down",
//                 data: [...allMenu.noncoffee, ...allMenu.cake]
//             }
//         ]
//     },
//     {
//         menu: {
//             title: "Drinks",
//             img: "/coffee/espresso_coffee.jpg"
//         },
//         subMenu: [
//             {
//                 title: "Coffee",
//                 img: "/coffee/espresso_coffee.jpg",
//                 data: allMenu.coffee
//             },
//             {
//                 title: "Non Coffee",
//                 img: "/noncoffee/black_charcoal.jpg",
//                 data: allMenu.noncoffee
//             }
//         ]
//     },
//     {
//         menu: {
//             title: "Deserts",
//             img: "/cake/white-chocolate-mocha-cake.jpg"
//         },
//         subMenu: [
//             {
//                 title: "Cake",
//                 img: "/cake/white-chocolate-mocha-cake.jpg",
//                 data: allMenu.cake
//             },
//             {
//                 title: "Cupcake",
//                 img: "/cupcake/vegan-tiramisu-cupcakes.jpg",
//                 data: allMenu.cupcake
//             },
//             {
//                 title: "Icecream",
//                 img: "/icecream/kit-kat-ice-cream.jpg",
//                 data: allMenu.icecream
//             },
//             {
//                 title: "Cookies",
//                 img: "/cookies/chocolate-chip-cookies.jpg",
//                 data: allMenu.cookies
//             }
//         ]
//     },
// ]
