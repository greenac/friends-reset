'use strict';

const queries = {
  createUser: 'INSERT INTO public.user ("firstName", "lastName", "dateCreated") VALUES($1, $2, $3)',
  getUserById: 'SELECT * FROM public.user where id=$1',
  getFriendsForUser: 'SELECT * FROM public.friends WHERE userId=$1 OR friedId=$1',
  getAllUsers: 'SELECT * FROM public.users',
  saveFriend: 'INSERT INTO public.friend ("userId", "friendId", "dateCreated", "status") VALUES($1, $2, $3, $4)',
  getFriend: 'SELECT * FROM public.friend WHERE public.friend_pkey=%1'
};

module.exports = {...queries};
