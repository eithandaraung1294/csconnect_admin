import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  photo: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  username: faker.name.fullName(),
  email: faker.internet.email(),
  isAdmin: sample(['admin', 'not admin']),
  createdAt: faker.internet.email(),
}));

export default users;
