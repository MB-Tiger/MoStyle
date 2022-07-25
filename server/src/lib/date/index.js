


export const getTimeDifference = (date1, date2) => {

  print('*******************************')
  print(new Date(date1).getTime())
  print(new Date(date2).getTime())
  print(Math.abs(new Date(date1).getTime() - new Date(date2).getTime()))
  print('*******************************')

  return Math.abs(new Date(date1).getTime() - new Date(date2).getTime())
}
  
