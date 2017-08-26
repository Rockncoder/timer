// eslint-disable-next-line
import React from 'react';
import {connect} from 'react-redux';
import {Timer} from './components';
import * as actions from './actions';
import {getFormattedTime, getStatus} from './reducer';

export {default as reducer} from './reducer';
export {default as saga} from './saga';


export const View = connect(
  state => ({
    time: getFormattedTime(state.timer),
    status: getStatus(state.timer)
  }),
  actions
)(Timer);
