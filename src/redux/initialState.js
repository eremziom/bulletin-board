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
    user: '',
  },
};
