import fly from '../utils/request.js'
// console.log(fly.get('/home/swiperdata'))
export function getBanners() {
  return fly.get('/home/swiperdata')
}

export function getNavs() {
  return fly.get('/home/catitems')
}

export function getFloorList() {
  return fly.get('/home/floordata')
}
