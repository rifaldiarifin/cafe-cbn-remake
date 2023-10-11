import api from '../api/api'

// CREATE
export const createMenu = async (body) => {
  return await api.post('/menu', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const createGroupMenu = async (body) => {
  return await api.post('/menu/groups', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// READ
export const getMenuData = async () => {
  return await await api.get('/menu')
}

export const getMenuDataOnlyUuid = async () => {
  return await api.get('/menu/uuidgroups')
}

// UPDATE
export const updateMenuByID = async (id, body) => {
  return await api.put(`/menu/${id}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const updateMenusInGroupByID = async (id, action, body) => {
  return await api.put(`/menu/groups/${id}/menus/${action}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const updateGroupMenuByID = async (id, body) => {
  return await api.put(`/menu/groups/${id}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// DELETE
export const deleteMenuDataByID = async (id) => {
  return await api.delete(`/menu/${id}`)
}

export const deleteGroupByID = async (id) => {
  return await api.delete(`/menu/groups/${id}`)
}

export const staticDataLandingMenu = [
  {
    uuid: 'c8d1d06f-dc3f-4af3-bdf6-53cfcf43a82d',
    groupName: 'Coffee',
    image:
      'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_groups%2F59b16dbd-4e89-4801-8919-cae422059fae.jpg?alt=media&token=843f35df-1916-44c4-9318-80b4948da73b',
    showOn: true,
    createdAt: '24-09-2023 01:12:56:335',
    updatedAt: '24-09-2023 20:42:18:747',
    menus: [
      {
        menu: {
          uuid: '8358c140-48b2-4963-86a1-4fde2b1fd859',
          menuCode: 'PRDCT1946U64BMJXYOX',
          name: 'Americano',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F9aa08dba-acba-4288-bd74-04119dffa9db.jpg?alt=media&token=b6a0a8f3-7032-462c-a043-5dce6045aa36',
          contents: 'Espresso, Hot Water',
          price: 14000
        }
      },
      {
        menu: {
          uuid: '196e78cb-6be0-4ce3-a7e7-e686e692c418',
          menuCode: 'PRDCT19497JYFGJRVI9',
          name: 'Cafe Mocha',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F7ec6d72d-21b7-4df7-a014-48a228a1decd.jpg?alt=media&token=f21d63d0-2d38-49d0-9116-b5d7b3f5cd0e',
          contents: '-',
          price: 18000
        }
      },
      {
        menu: {
          uuid: '36d28574-0fe7-4090-9a28-ed09413ae4f3',
          menuCode: 'PRDCT19475MRTHDJHHC',
          name: 'Cappuccino',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F51d6af99-0788-4091-8b37-8126ae75880b.jpg?alt=media&token=600b8005-e23f-4762-bdd8-6bb10b7a7f21',
          contents: '-',
          price: 16000
        }
      },
      {
        menu: {
          uuid: 'c51d4f07-0db3-472f-aac3-248861b8e582',
          menuCode: 'PRDCT194979YVELRYII',
          name: 'Caramel Latte',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fa0863dbb-b167-4f26-9d5e-97775182d3f2.jpg?alt=media&token=8065f4e5-2cd8-4b7b-b9ee-8fc773229dc8',
          contents: '-',
          price: 17000
        }
      },
      {
        menu: {
          uuid: '1f9c40f5-0ec8-4de9-8b54-60657266be43',
          menuCode: 'PRDCT1947HSPDV5DNL3',
          name: 'Espresso',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F9f3327f6-574c-42e7-bb02-26aa18516849.jpg?alt=media&token=7a65c3b8-442f-4ada-8a15-a468b31dab2c',
          contents: '-',
          price: 12000
        }
      },
      {
        menu: {
          uuid: 'ae151c63-a3bb-4513-bafb-9a6d827b0d69',
          menuCode: 'PRDCT1950KORN8JKTO5',
          name: 'Latte',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F82b85068-2c91-491f-abf8-635aac2cbdc7.jpg?alt=media&token=0a3bd94b-1e2c-4f5a-9099-4e3327299575',
          contents: '-',
          price: 16000
        }
      },
      {
        menu: {
          uuid: '43a15931-70b2-4baf-9513-e7b6feb084b6',
          menuCode: 'PRDCT1951MTLDMPFIZV',
          name: 'Macchiato',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fc4ab4919-6b1e-4cef-be20-dcb40c59c185.jpg?alt=media&token=3f434adb-59ad-4a70-b083-57656d1f4943',
          contents: '-',
          price: 17000
        }
      },
      {
        menu: {
          uuid: '653972e0-b41b-4426-a583-4023d0aab906',
          menuCode: 'PRDCT1948H2EKU2BD5Z',
          name: 'Piccolo',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fd9830416-5986-4801-96a7-1d675ec8bc19.jpg?alt=media&token=a02ee8b5-1a33-485c-af8c-48efd986813c',
          contents: '-',
          price: 18000
        }
      },
      {
        menu: {
          uuid: '28f5c994-a9da-448a-a963-eb33fd359203',
          menuCode: 'PRDCT1950LLOBTGKFEW',
          name: 'Tiramisu',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F0cc94674-0d86-4201-9daf-a38b94de3848.jpg?alt=media&token=6aac55ae-6ab7-456b-afcd-918eba935a67',
          contents: '-',
          price: 21000
        }
      }
    ]
  },
  {
    uuid: '1e70fc93-5bdc-4bb3-b456-84488afeb62a',
    groupName: 'Non Coffee',
    image:
      'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_groups%2F6dde4416-b332-4842-aaf6-fcfb9ff73b70.jpg?alt=media&token=d334b17e-9356-4bfb-bcaf-5081121c7ad7',
    showOn: true,
    createdAt: '24-09-2023 01:14:14:825',
    updatedAt: '24-09-2023 11:30:40:520',
    menus: [
      {
        menu: {
          uuid: '3e697247-1404-47ba-8789-231049d70902',
          menuCode: 'PRDCT1952CORUIOEQQL',
          name: 'Black Charcoal',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F4366787b-dc7c-4561-9bee-2eafde234160.jpg?alt=media&token=59a86ad8-4e2a-4dc9-8945-1ea0db734f61',
          contents: '-',
          price: 18000
        }
      },
      {
        menu: {
          uuid: '3781d9ad-8db2-495a-8f73-15450432d5ca',
          menuCode: 'PRDCT1952GKTA7OWUCP',
          name: 'Chocolate',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fb2e1ec80-d31d-4d39-92f0-29e9af56ca47.png?alt=media&token=91fd5052-6719-484c-98c0-b22c82de50a1',
          contents: '-',
          price: 15000
        }
      },
      {
        menu: {
          uuid: 'e4028ed5-bdbe-455b-85df-e33617c93238',
          menuCode: 'PRDCT19539VQPKUANQQ',
          name: 'Cotton Candy',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F04dba6cc-38d1-4bcb-95e8-239f8a2aa213.jpg?alt=media&token=9bb89a50-9302-4a51-90cd-6bf91ef27506',
          contents: '-',
          price: 20000
        }
      },
      {
        menu: {
          uuid: 'a3aab60f-8d1e-4caf-8dbb-c9e78793b70e',
          menuCode: 'PRDCT1953MPKFP4TLHT',
          name: 'Mango Juice',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F819248fb-e086-41fb-a92e-09077240304f.jpg?alt=media&token=d561cdd6-8eb0-437d-8468-502a3e274610',
          contents: '-',
          price: 16500
        }
      },
      {
        menu: {
          uuid: 'a46b20eb-cbf3-444b-96b6-b7067c8cf8b9',
          menuCode: 'PRDCT1954FURMBFZTGC',
          name: 'Matcha Latte',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fd6eb7592-088c-4993-890a-b5cb000ff52c.jpg?alt=media&token=a3e70660-ee3e-4f95-a587-1f02d75703a2',
          contents: '-',
          price: 19000
        }
      },
      {
        menu: {
          uuid: '4e16974d-d4a6-4b62-926f-eeed5194b8a8',
          menuCode: 'PRDCT1954JTFCILGG02',
          name: 'Strawberry',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Ffd0b507d-b1dd-4753-9fb7-3b8cfc32d352.jpg?alt=media&token=cdfefc1c-e381-4c77-8abe-b5133a2de8b0',
          contents: '-',
          price: 17000
        }
      }
    ]
  },
  {
    uuid: 'f61f4831-2fd2-4d0d-be15-57dc943b6001',
    groupName: 'Cookies',
    image:
      'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_groups%2Ff2a19965-014e-4595-b592-3f89f12a5819.jpg?alt=media&token=de3817a0-a551-4d61-b9b7-e143565668eb',
    showOn: true,
    createdAt: '29-09-2023 22:45:19:202',
    updatedAt: '29-09-2023 22:48:15:232',
    menus: [
      {
        menu: {
          uuid: '2f2ecf17-16c2-45b3-9219-17a1a9ce1f28',
          menuCode: 'PRDCT2242X7FG19CCC6',
          name: 'Checkerboard Cookies',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fc7ff931f-6fc0-40df-9c5f-45a5a20a2389.jpg?alt=media&token=bfd6912d-223c-453e-81b5-6328b9dc3047',
          contents: '-',
          price: 2000
        }
      },
      {
        menu: {
          uuid: 'f6b8b0b0-db6b-496d-8d56-2f8685e93f32',
          menuCode: 'PRDCT2242GYEODFUSLU',
          name: 'Chocochip',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F7bc0286f-e11b-4114-ab41-eedf78fd684e.jpg?alt=media&token=843232b9-3fc9-43cf-a4e7-806888a6381b',
          contents: '-',
          price: 2000
        }
      },
      {
        menu: {
          uuid: 'f7326491-ec0c-4616-8af5-7cb8dfd7edea',
          menuCode: 'PRDCT2243GEUXBX6XYL',
          name: 'Heart Thumbprint Cookies',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F881a31b5-9a48-4edc-b6c1-ecb6bbae74b8.jpg?alt=media&token=92f1afc6-4323-4f25-a150-13295d2f458b',
          contents: '-',
          price: 2000
        }
      },
      {
        menu: {
          uuid: '54b75675-52f3-4f61-bd5a-95d58378597b',
          menuCode: 'PRDCT2244CVLJH5XV8C',
          name: 'Peanut Butter Spider Cookies',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fa2aa95b0-4723-441a-9e02-191dc6a6b10a.jpg?alt=media&token=09622413-10ae-4b82-b457-4b98ad0e3704',
          contents: '-',
          price: 3500
        }
      },
      {
        menu: {
          uuid: '850aa16c-a68f-4b22-8a71-d7e2ee1fa261',
          menuCode: 'PRDCT2244RTO8WCAHB4',
          name: 'Rainbow Cookies',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fd855be80-3281-4dee-80a7-86214542ce00.jpg?alt=media&token=a1cb42c3-ce67-4d8f-a6fe-e975ce27b661',
          contents: '-',
          price: 2000
        }
      },
      {
        menu: {
          uuid: '78d08681-16af-4edf-a9dd-0be7a3f875a5',
          menuCode: 'PRDCT2245XKGK7JYMCG',
          name: 'Valentine Cookies',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F89c002e1-57f8-4c53-a002-5a269a9b0d67.jpg?alt=media&token=9b8920d2-67a5-498e-824f-9bb93a240d12',
          contents: '-',
          price: 2500
        }
      }
    ]
  },
  {
    uuid: '3ba88390-f449-43d9-9e19-b4468ae5f750',
    groupName: 'Ice Cream',
    image:
      'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_groups%2Fc7363c30-cce9-46ac-9653-b496b14bb8ee.jpg?alt=media&token=e12386a1-30e8-4ba8-b2fe-bd1a7c044ff5',
    showOn: true,
    createdAt: '29-09-2023 22:53:01:22',
    updatedAt: '29-09-2023 22:54:27:724',
    menus: [
      {
        menu: {
          uuid: 'efbfee75-ec75-4cb7-8c6e-471451bd89f0',
          menuCode: 'PRDCT22498PE33WSOWD',
          name: 'Chocolate Peanut Icecream',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Feb55aa53-bb36-4cee-a001-e55a7facddff.jpg?alt=media&token=c9d952c4-deac-4372-a433-8ba250934af1',
          contents: '-',
          price: 17500
        }
      },
      {
        menu: {
          uuid: '6c234ea2-2888-4c75-9ff3-142919463f6b',
          menuCode: 'PRDCT2250ULMUKBYKTY',
          name: 'Keto Coconut',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fcf5a1af4-df06-4715-90c3-308ecad7519d.jpg?alt=media&token=b03c7a1c-eb08-4ba3-a29c-beeb26259e88',
          contents: 'Coconut, Cream Vanilla',
          price: 16500
        }
      },
      {
        menu: {
          uuid: '54a4eabe-d74c-4421-a714-f3a62684ebbe',
          menuCode: 'PRDCT2250V30MDVKDKR',
          name: 'KitKat Icecream',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F8d0f1a9f-5877-4a97-9518-c612e16d7ef2.jpg?alt=media&token=59b4d681-8bab-45de-b558-be21d932b7a3',
          contents: 'KitKat, Chocolate Cream',
          price: 19000
        }
      },
      {
        menu: {
          uuid: '53b73cb1-ea48-41c1-8204-a883542b0352',
          menuCode: 'PRDCT2251TC8BSYG3HL',
          name: 'Matcha Icecream',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F46dfd057-4973-49d7-8543-d4a39e28da82.jpg?alt=media&token=537e6146-7817-4a49-a559-04c26957850f',
          contents: 'Matcha, Cream',
          price: 18000
        }
      },
      {
        menu: {
          uuid: '78b9580f-d35c-4e67-92b6-2cde3de5e134',
          menuCode: 'PRDCT2251KCR2URPGJE',
          name: 'Must Icecream',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F6936bd6d-c907-42a9-8be6-244316b9b4a9.jpg?alt=media&token=e034946b-29fe-4be0-945b-785e7ddcb754',
          contents: '-',
          price: 16000
        }
      },
      {
        menu: {
          uuid: '2e4325ae-ae9e-497d-98bd-6935615b58ee',
          menuCode: 'PRDCT22526BIXBRAKHJ',
          name: 'Tropical Banana Icecream',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F422bfde0-7fbc-43a8-85ce-aa5f91030b36.jpg?alt=media&token=fcf9fa60-d360-4394-9e1b-a195a0654d7e',
          contents: '-',
          price: 21500
        }
      }
    ]
  },
  {
    uuid: 'ef25e0a6-bb57-4ea0-b8ef-68123cfd0de1',
    groupName: 'Cupcake',
    image:
      'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_groups%2Fb485b351-0b1d-4b79-ac2c-ddd8f2c0d817.jpg?alt=media&token=e0566f15-c73b-4007-8663-24f4581c5a89',
    showOn: true,
    createdAt: '29-09-2023 23:08:15:761',
    updatedAt: '29-09-2023 23:08:19:490',
    menus: [
      {
        menu: {
          uuid: '7c97a83a-adcb-46c9-9d5d-d68f18c13569',
          menuCode: 'PRDCT2308HPGIII38CK',
          name: 'Berry Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Ff45aaa82-8cfe-411d-9d4a-95a46475eb01.jpg?alt=media&token=94667473-17a6-41ef-9064-48cd64635649',
          contents: '-',
          price: 14000
        }
      },
      {
        menu: {
          uuid: '9aa01a41-a419-4439-aee5-cb3df68bf335',
          menuCode: 'PRDCT2309V6TJ3RWVZO',
          name: 'Black Forest Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F374c3d69-cf7e-47d2-a2b8-4512672a5ef7.jpg?alt=media&token=7a337c8b-2aba-4c48-bfc2-5f7916e93604',
          contents: '-',
          price: 16500
        }
      },
      {
        menu: {
          uuid: '057acf64-7e9c-4a4e-8674-c989173de897',
          menuCode: 'PRDCT23097RTHGUIKVB',
          name: 'Flower Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F6d6e4622-fb1f-431d-9cf1-cc1cee648980.jpg?alt=media&token=36a3c135-5428-4136-a71d-5410fda121f7',
          contents: '-',
          price: 13500
        }
      },
      {
        menu: {
          uuid: '4b8ea8ed-d7a7-425b-a4e8-9a45d24c503d',
          menuCode: 'PRDCT23108ZXYYYJAKK',
          name: 'Galaxy Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fd54548ce-f326-4041-90bf-543df0fd1f56.jpg?alt=media&token=3e3fcc3f-2e2a-4e3d-b4c5-6265627ab82f',
          contents: '-',
          price: 17000
        }
      },
      {
        menu: {
          uuid: '1a017f24-c4fd-4d7a-8ec5-5a36b91a4318',
          menuCode: 'PRDCT23102BNXFRPTKY',
          name: 'Mint Aero Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F8846411b-4a13-465c-9057-b2b238e2af2c.jpg?alt=media&token=0aa52a39-7f6e-4a41-90f9-2fad464c95ca',
          contents: '-',
          price: 17000
        }
      },
      {
        menu: {
          uuid: '9b834e04-7ea0-431b-b580-3e2d941c862e',
          menuCode: 'PRDCT2310ODUDPXQUXN',
          name: 'Oreo Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F0a1e98de-d9db-4888-933f-482f40a99450.jpg?alt=media&token=8bb5c14e-2977-446d-94c1-7c4fe5bc1dfa',
          contents: '-',
          price: 18000
        }
      },
      {
        menu: {
          uuid: 'f1991147-97d6-449b-ba68-4b82efac40d4',
          menuCode: 'PRDCT2311VYTNBJICVJ',
          name: 'Red Velvet Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Fb5ea35ec-f7a2-4744-9777-a9d2641796e6.jpg?alt=media&token=710cdf04-9fc8-4990-bafc-8ad3587c1ba8',
          contents: '-',
          price: 16000
        }
      },
      {
        menu: {
          uuid: 'a253abfc-b0e5-417b-8dbc-dcdc5c984505',
          menuCode: 'PRDCT2311VMKSJSQPHO',
          name: 'Spring Chick Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F1604e5cf-a20b-4932-b6cf-db48e64e6377.jpg?alt=media&token=9dbf8fad-78b9-4969-8f4c-cc1d614f4c35',
          contents: '-',
          price: 17500
        }
      },
      {
        menu: {
          uuid: '21a5b98f-2188-4694-938b-258b8eb4ab9e',
          menuCode: 'PRDCT2312TUOI5ONZDJ',
          name: 'Strawberry Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F5b99d5fe-6d9c-4d23-98b8-6f0016f115b6.jpg?alt=media&token=1cbf6979-190b-4c63-908c-b913487aef4d',
          contents: '-',
          price: 16500
        }
      },
      {
        menu: {
          uuid: '8e9d4f08-0d28-4ab8-b96d-da3928c37a3c',
          menuCode: 'PRDCT2312OC4QV4FNYS',
          name: 'Vegan Tiramisu Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F90134474-b186-4da3-a77d-8e7eb7d39135.jpg?alt=media&token=e214aa64-7922-48ee-8ebd-e0c7cf378912',
          contents: '-',
          price: 20500
        }
      },
      {
        menu: {
          uuid: '9d0aaf3d-8fd5-414e-aeab-250a2f4b6075',
          menuCode: 'PRDCT2313LVSZAUHVH3',
          name: 'Vegan Vanilla Cupcake',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F5c291c80-4a08-46d6-8c4d-70ef3cfed331.jpg?alt=media&token=c6213ce2-a3f5-423e-a042-4c8fe9d92b45',
          contents: '-',
          price: 15000
        }
      }
    ]
  },
  {
    uuid: 'e1a8c304-ab43-482e-862d-f79a540e34cf',
    groupName: 'Cake',
    image:
      'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_groups%2F00bbca20-be4b-47e3-b0cb-91fb53e4c35c.jpg?alt=media&token=ae4330e6-c475-4e84-8a03-862cf49fcbd3',
    showOn: true,
    createdAt: '30-09-2023 00:02:36:546',
    updatedAt: '30-09-2023 00:03:04:357',
    menus: [
      {
        menu: {
          uuid: '8b97781c-b55e-404a-9404-506caa199861',
          menuCode: 'PRDCT1955DCQNRHVOCM',
          name: 'Black Forest',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F398784dc-1a67-4496-ae35-c6cf2950212f.jpg?alt=media&token=43b4e65e-ff85-4b31-93fb-122be6909644',
          contents: '-',
          price: 18000
        }
      },
      {
        menu: {
          uuid: '82f0ab92-bcd8-4c5a-8d8d-33b6ea7e6786',
          menuCode: 'PRDCT1957CKNI3L9YGW',
          name: 'Choco Powder',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2Ff1af085a-430d-41f2-94b4-459048827e31.jpg?alt=media&token=3f3539b3-46ee-4f2a-8040-d87bf9654983',
          contents: '-',
          price: 24000
        }
      },
      {
        menu: {
          uuid: '6175affa-4b97-4004-a8d6-2490b8318890',
          menuCode: 'PRDCT1957XHQLBSMPKX',
          name: 'Chocolate Piece',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F8eccc89a-b4ed-42fa-9492-a33ca56003a2.jpg?alt=media&token=e6ad832a-619a-4a8d-8b68-97de7b51d9bc',
          contents: '-',
          price: 15000
        }
      },
      {
        menu: {
          uuid: 'a2e7cf88-5972-44cb-ab31-856b8f539a12',
          menuCode: 'PRDCT1958P8PGBQSTK9',
          name: 'Red Velvet',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F414c2bb1-ec26-4268-9d80-48e270011d74.jpg?alt=media&token=36e73481-2dcc-4a99-b09e-311867d00fd8',
          contents: '-',
          price: 18500
        }
      },
      {
        menu: {
          uuid: '6e4d268e-7aa0-41e9-b2aa-93feecc8d0b4',
          menuCode: 'PRDCT1958B87JWSTXSM',
          name: 'White Chocolate Mocha',
          image:
            'https://firebasestorage.googleapis.com/v0/b/cafecbnupload.appspot.com/o/img%2Fmenu_images%2F44e91356-2163-4ae2-b46c-63e4571c33d6.jpg?alt=media&token=b64d430c-4c76-4ce4-a0c8-e64dd4dd6cdc',
          contents: '-',
          price: 25000
        }
      }
    ]
  }
]
