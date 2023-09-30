export default function getImage(imageString, blankImage = 'noavatar') {
  if (typeof imageString !== 'string') return console.error('Error: getImageMenu = imageString must be a string')
  if (typeof blankImage !== 'string') return console.error('Error: getImageMenu = blankImage must be a string')
  return `${imageString !== blankImage ? imageString : `/img/${blankImage}.jpg`}`
}
