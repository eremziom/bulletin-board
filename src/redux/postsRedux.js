import Axios from 'axios';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getLoadingState = ({posts}) => posts.loading;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const FETCH_DEL_SUCCESS = createActionName('FETCH_DEL_SUCCESS');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addNewPost = payload => ({ payload, type: ADD_POST });
export const editPost = payload => ({ payload, type: EDIT_POST });
export const fetchDelSuccess = payload => ({ payload, type: FETCH_DEL_SUCCESS });

/* THUNK */
export const fetchAllPosts = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchSinglePost = ( id ) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const sendSinglePost = (newNote) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .post('http://localhost:8000/api/posts', newNote)
      .then(res => {
        dispatch(fetchSuccess(newNote));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const delSinglePost = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchDelSuccess());
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const updateSinglePost = (id, editNote) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .put(`http://localhost:8000/api/posts/${id}`, editNote)
      .then(res => {
        dispatch(fetchSuccess(editNote));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data, action.payload,
        ],
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: action.payload,
      };
    }
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_DEL_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [],
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
}
