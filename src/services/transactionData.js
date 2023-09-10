const orders = [
  {
    uuid: 'G4554HGRFGT564G-456455G45G646G4-65464645G',
    orderCode: 'TRNS67H56G57F',
    user: '8nd928n9y7f3q437q843q7bf45',
    customer: 'Rifaldi Arifin',
    orders: [
      { uuid: 'c22', qty: 1 },
      { uuid: 'c32', qty: 2 }
    ],
    createdAt: '05-09-2023 14:24:38:480',
    updatedAt: '05-09-2023 14:24:38:480',
    bill: 75000,
    orderStatus: 'Complete'
  },
  {
    uuid: 'H65H6J76UFFTTY65-5G65HYTRD5G5G56-54G54G6666H5EF3',
    orderCode: 'TRNS5H7E75456',
    user: '8nd928n9y7f3q437q843q7bf45',
    customer: 'Rifaldi Arifin',
    orders: [{ uuid: 'c13', qty: 1 }],
    createdAt: '05-09-2023 14:24:38:480',
    updatedAt: '05-09-2023 14:24:38:480',
    bill: 72000,
    orderStatus: 'Complete'
  },
  {
    uuid: 'F3453G45645H-34G34H6457HRTH-G456456H56',
    orderCode: 'TRNS4GTJ6UI76I',
    user: '8nd928n9y7f3q437q843q7bf45',
    customer: 'Rifaldi Arifin',
    orders: [
      { uuid: 'c22', qty: 1 },
      { uuid: 'c14', qty: 1 }
    ],
    createdAt: '05-09-2023 14:24:38:480',
    updatedAt: '05-09-2023 14:24:38:480',
    bill: 75000,
    orderStatus: 'Complete'
  },
  {
    uuid: '45H456H4545GRTYT-K766K8K8-654646443H3H3G5G',
    orderCode: 'TRNSESGT4565YG',
    user: '8nd928n9y7f3q437q843q7bf45',
    customer: 'Rifaldi Arifin',
    orders: [
      { uuid: 'c13', qty: 1 },
      { uuid: 'c42', qty: 1 },
      { uuid: 'c61', qty: 4 }
    ],
    createdAt: '05-09-2023 14:24:38:480',
    updatedAt: '05-09-2023 14:24:38:480',
    bill: 120000,
    orderStatus: 'Cooking'
  },
  {
    uuid: '34HA34GHIR67J56E6-43G57567J67JJ876-3G44KAJ',
    orderCode: 'TRN5HR7U6G67HU6',
    user: '8nd928n9y7f3q437q843q7bf45',
    customer: 'Rifaldi Arifin',
    orders: [
      { uuid: 'c21', qty: 1 },
      { uuid: 'c32', qty: 1 }
    ],
    createdAt: '05-09-2023 14:24:38:480',
    updatedAt: '05-09-2023 14:24:38:480',
    bill: 78000,
    orderStatus: 'Complete'
  },
  {
    uuid: '34G543G645HJ45HH64-H45W645H654WG456-EATTEJI6J8K',
    orderCode: 'TRNSYH7IOYT58O8',
    user: '8nd928n9y7f3q437q843q7bf45',
    customer: 'Rifaldi Arifin',
    orders: [
      { uuid: 'c11', qty: 1 },
      { uuid: 'c42', qty: 2 }
    ],
    createdAt: '05-09-2023 14:24:38:480',
    updatedAt: '05-09-2023 14:24:38:480',
    bill: 15000,
    orderStatus: 'Pending'
  },
  {
    uuid: '4G64WW456G4W6GW46-343F7G56H679J76J-6J7E65J66G',
    orderCode: 'TRNSA43A3S4ER4T',
    user: '8nd928n9y7f3q437q843q7bf45',
    customer: 'Rifaldi Arifin',
    orders: [
      { uuid: 'c51', qty: 1 },
      { uuid: 'c13', qty: 1 },
      { uuid: 'c14', qty: 1 }
    ],
    createdAt: '05-09-2023 14:24:38:480',
    updatedAt: '05-09-2023 14:24:38:480',
    bill: 40500,
    orderStatus: 'Waiting for Payment'
  }
]

const transactionData = new Promise((resolve) => {
  setTimeout(() => {
    resolve(orders)
  }, 1000)
})

export default transactionData
