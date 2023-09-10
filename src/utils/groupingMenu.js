const groupingMenu = (menuData) => {
  const group = []
  // const category = Object.keys(menuData)
  // return category
  const checkCategory = (category) => {
    const find = group.findIndex((cate) => cate.menu.title === category)
    return find >= 0 ? find : false
  }
  const checkSubCategory = (subCategory, indexCategory) => {
    const find = group[indexCategory].subMenu.findIndex((cate) => cate.title === subCategory)
    return find >= 0 ? find : false
  }

  // Loop all menu
  menuData.map((menu) => {
    const { category, subCategory } = menu.menuType

    // Check Category
    const indexCategory = checkCategory(category.name)

    // If category not found, create category and subcategory, and push this menu in subCategory.data
    if (indexCategory === false) {
      group.push({
        menu: {
          title: category.name,
          img: menu.image
        },
        subMenu: [
          {
            title: subCategory.name,
            img: subCategory.image,
            data: [
              {
                uuid: menu.uuid,
                name: menu.name,
                price: menu.price,
                img: menu.image
              }
            ]
          }
        ]
      })
      // Exit Looping on this menu
      return
    }

    // Check SubCategory
    const indexSubCategory = checkSubCategory(subCategory.name, indexCategory)

    // If Sub Category not found, create a sub category in the previously created category, and push this menu in subCategory.data
    if (indexSubCategory === false) {
      group[indexCategory].subMenu.push({
        title: subCategory.name,
        img: subCategory.image,
        data: [
          {
            uuid: menu.uuid,
            name: menu.name,
            price: menu.price,
            img: menu.image
          }
        ]
      })
      // Exit Looping on this menu
      return
    }

    // if Sub Category exists, push this menu in subCategory.data
    group[indexCategory].subMenu[indexSubCategory].data.push({
      uuid: menu.uuid,
      name: menu.name,
      price: menu.price,
      img: menu.image
    })
  })
  return group
}

export default groupingMenu
