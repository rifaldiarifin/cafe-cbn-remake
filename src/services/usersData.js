const users = [
  {
    uuid: 'h6g453q44fg6-45g56g5g6g-66476hu76j87',
    firstname: 'Rifaldi',
    lastname: 'Arifin',
    username: 'rifaldi17',
    password: '98ny48ny9rw8nyd9renrskskdf',
    profileImage: '/me2.png',
    access: {
      role: 'Admin'
    },
    contact: {
      email: 'adrifaldiarifin@gmail.com',
      phone: '08123456789'
    },
    createdAt: '06-09-2023 13:47:40:120',
    updatedAt: '06-09-2023 13:47:40:120'
  },
  {
    uuid: 'h6g453q44fg6-45g56g5g6g-66476hu76j87',
    firstname: 'Rifaldi',
    lastname: 'Arifin',
    username: 'rifaldi17',
    password: '98ny48ny9rw8nyd9renrskskdf',
    profileImage: '/me2.png',
    access: {
      role: 'Admin'
    },
    contact: {
      email: 'adrifaldiarifin@gmail.com',
      phone: '08123456789'
    },
    createdAt: '06-09-2023 13:47:40:120',
    updatedAt: '06-09-2023 13:47:40:120'
  },
  {
    uuid: 'h6g453q44fg6-45g56g5g6g-66476hu76j87',
    firstname: 'Rifaldi',
    lastname: 'Arifin',
    username: 'rifaldi17',
    password: '98ny48ny9rw8nyd9renrskskdf',
    profileImage: '/me2.png',
    access: {
      role: 'Admin'
    },
    contact: {
      email: 'adrifaldiarifin@gmail.com',
      phone: '08123456789'
    },
    createdAt: '06-09-2023 13:47:40:120',
    updatedAt: '06-09-2023 13:47:40:120'
  }
]

const usersData = (response) => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(users)
    }, 1000)
  }).then((res) => response(res))
}

export default usersData
