module.exports = function () {
  const faker = require('faker')
  const _ = require('lodash')
  return {
    products: _.times(30, function (n) {
      return {
        id: n,
        title: faker.commerce.productName(),
        cover: faker.image.cover(),
        source: faker.music.genre(),
        vote: faker.commerce.price()
      }
    }),
  }
}
