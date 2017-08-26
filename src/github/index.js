import React from 'react';
import {call, put, takeLatest} from 'redux-saga/effects';
import {connect} from 'react-redux';

// GitHub API
const gitHubApi = (username) => {
  return fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      return response.json().then(({login, avatar_url, html_url}) => ({login, avatar_url, html_url}));
    })
    .catch(error => {
      throw error;
    })
};

// Action
const getUserDetails = (payload) => {
  return {
    type: 'LOAD_USER_REQUEST',
    payload
  }
};

// Reducer
export const userReducer = (state = {}, action) => {
  if (action === undefined) {
    return state;
  }

  switch (action.type) {
    case 'LOAD_USER_SUCCESS':
      return action.user;
    default:
      return state;
  }
};

// Saga
function* loadUserDetails({payload}) {
  try {
    const user = yield call(gitHubApi, payload);
    // waits until user load completes
    yield put({type: 'LOAD_USER_SUCCESS', user});
  } catch (error) {
    // or fails
    throw error;
  }
}

export function* watchRequest() {
  yield takeLatest('LOAD_USER_REQUEST', loadUserDetails);
}

export class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUserDetails('rockncoder');
  }

  render() {
    const {user} = this.props;
    return (
      <div>
        {user ?
          <div>
            <h1> User Profile </h1>
            <img src={user.avatar_url} alt={'The avatar of ' + user.login}/>
            <p><a href={user.html_url} target="_blank">{user.login}</a></p>
          </div> :
          '...loading'}
      </div>
    )
  }
}

// Map the store's state to component's props.
const mapStateToProps = (state) => ({user: state.userReducer});
const mapDispatchToProps = (dispatch) => ({getUserDetails: (username) => dispatch(getUserDetails(username))})
export const UserProfilePage = connect(mapStateToProps, mapDispatchToProps)(UserProfile);
