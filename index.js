'use strict';

const moment = require('moment');
const UserController = require('./controllers/user-controller');


const MAX_DURATION = 365*24*3600;
const NUMBER_OF_USERS = 1000;

const initialDate = moment();
const users = [
  {
    firstName: 'Andre',
    lastName: 'Green'
  },
  {
    firstName: 'Harper',
    lastName: 'Green'
  },
  {
    firstName: 'Megan',
    lastName: 'Smith'
  }
];

const randomDate = () => {
  const duration = moment.duration(Math.floor(MAX_DURATION * Math.random()));
  return initialDate.subtract(duration);
};

const getUser = (index) => {
  const baseUser = users[Math.floor(Math.random() * users.length)];
  const user = {...baseUser};
  user.firstName += '-' + index.toString(16);
  user.lastName += '-' + index.toString(16);
  user.dateCreated = randomDate().format();

  return user;
};


let formattedUsers = [];
for (let i=0; i < NUMBER_OF_USERS; i++) {
  formattedUsers.push(getUser(i));
}

console.log('saving users');
const userController = new UserController(formattedUsers);
userController.saveUsers(() => {
  console.log('finished saving users');
});
