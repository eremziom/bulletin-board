import db from '../db';

export const initialState = {
  posts: {
    data: db.notes,
    loading: {
      active: false,
      error: false,
    },
  },
  login: {
    logged: false,
    user: {
      admin: false,
      name: 'Jan',
      email: 'jan@example.com',
    },
  },
};
