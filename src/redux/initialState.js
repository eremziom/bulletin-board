export const initialState = {
  posts: {
    data: '',
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
