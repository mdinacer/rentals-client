import { Update } from 'history';
import React, { useLayoutEffect, useReducer } from 'react';
import { Router } from 'react-router-dom';
import { history } from '../..';

const reducer = (_: Update, action: Update) => action;

export const HistoryRouter: React.FC<{
  children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(dispatch), []);

  return (
    <Router
      navigationType={state.action}
      location={state.location}
      navigator={history}
    >
      {children}
    </Router>
  );
};
