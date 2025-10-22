const colors = [
  '#be8a15',
  '#59006d',
  '#007f3d',
  '#676b6f',
  '#940000',
  '#23a509',
  '#097ea5',
  '#2309a5',
  '#681cd9',
  '#d91cd2',
  '#ac166d',
  '#ac9316',
  '#ac5e16',
  '#004fc4',
  '#36a50d'
]
export const randomColorHex = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}
