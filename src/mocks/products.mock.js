import { faker } from "@faker-js/faker";

export const mockProducts = (qtyMockProducts) => {
    
  const products = [];
  for (let i = 0; i < qtyMockProducts; i++) {
    const product = {
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      thumbnail: faker.internet.url(),
      code: faker.string.uuid(),
      stock: faker.number.int({ max: 990 }),
      status: faker.datatype.boolean(),
      category: faker.commerce.department(),
    };
    products.push(product)
  }
  return products
};
