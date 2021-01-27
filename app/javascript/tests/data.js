import faker from 'faker';

let id = 0;

export const houseType = () => ({
  id: ++id,
  name: faker.name.findName(),
});

export const houseSnippet = () => ({
  id: ++id,
  name: faker.name.findName(),
  images: Array.from({ length: faker.random.number({ min: 1, max: 5 }) })
    .map(() => faker.image.imageUrl()),
  price_per_month: faker.random.number({ min: 10, max: 5000 }),
  house_type: houseType(),
});

export const house = () => ({
  ...houseSnippet(),
  description: faker.lorem.sentences(),
  favourited: faker.random.boolean(),
});

export const user = () => ({
  id: ++id,
  name: faker.name.findName(),
  email: faker.internet.email(),
  picture: faker.image.imageUrl(),
});
