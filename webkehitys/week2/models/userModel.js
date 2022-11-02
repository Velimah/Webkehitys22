'use strict';
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getUser = (userId) => {
  return users.filter((user) => {
    if (userId === user.id) {
      delete user.password;
      return user;
    }
  }).pop();
};

module.exports = {
  users, getUser,
};
