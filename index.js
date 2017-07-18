'use strict';

const moment = require('moment');
const UserController = require('./controllers/user-controller');
const FriendController = require('./controllers/friend-controller');
const _ = require('lodash');


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

const createUsers = () => {
  let formattedUsers = [];
  for (let i=0; i < NUMBER_OF_USERS; i++) {
    formattedUsers.push(getUser(i));
  }

  console.log('saving users');
  const userController = new UserController(formattedUsers);
  userController.saveUsers(() => {
    console.log('finished saving users');
  });
};

const createFriends = async () => {
  const userController = new UserController();
  let users = null;
  try {
    users = await userController.allUsers();
    console.log('got:', users.length, 'users');
  } catch (error) {
    console.log('Error: failed to fetch users with error:', error);
  }

  if (!!users) {
    const friendController = new FriendController(users);
    friendController.saveFriends((friends) => {
      console.log('Got:', friends.length, 'friends from the db');
    });
  }
};

const findUser = async (userId) => {
  const userController = new UserController();
  try {
    return await userController.getUser(userId);
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  const userController = new UserController();
  try {
    return await userController.getUsers(2, 4, 5);
  } catch (error) {
    throw error;
  }
};

const checkRepeatFriends = async (userId1, userId2) => {
  const userController = new UserController();
  const users = await userController.getUsers(userId1, userId2);
  if (!users || users.length < 2) {
    console.log('no users');
    throw new Error('Not enough users found');
  }

  const friend = {
    userId: users[0].id,
    friendId: users[1].id,
    status: 'whatevs'
  };

  const friendController = new FriendController(users);
  const sqlFriend = await friendController.createFriend(friend);

  return Promise.resolve(sqlFriend);
};

//createUsers();

// createFriends().then(() => {
//   console.log('Finished Creating friends')
// });

// const userId = 201;
// findUser(userId).then((user) => {
//   !!user ? console.log('found user:', user.dataValues) :
//     console.log('There is no user in the db with id:', userId);
// }).catch((error) => {
//   console.log('failed to grab user with id:', userId, 'error:', error);
// });

// getUsers().then((users) => {
//   const info = users.map((user) => {
//     return user.dataValues;
//   });
//
//   console.log('got users:', info);
// }).catch((error) => {
//   console.log('failed to get users:', error);
// });

checkRepeatFriends(5, 5).then((friend) => {
  console.log('created friend:', friend.dataValues);
}).catch((error) => {
  if (_.has(error, 'name') && error.name === 'SequelizeUniqueConstraintError') {
    console.log('Could not create friend. A friendship between the supplied users has already been created');
  } else {
    console.log('Failed to create friend with error:', error);
  }

  throw error;
});
