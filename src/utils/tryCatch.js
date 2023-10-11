export const customTryCatch = async (trySomethingAsynchronous = async () => {}) => {
  try {
    return await trySomethingAsynchronous()
  } catch (error) {
    console.log(error)
    if (!error?.response) {
      console.error('Error: No Server Response! :(')
    } else if (error?.response?.data?.message) {
      console.error('Error: ', error?.response?.data?.message)
    } else {
      console.error('Error: ', error.message)
    }
  }
}
