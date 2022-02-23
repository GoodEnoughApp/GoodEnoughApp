import React from 'react';

const AppContext = React.createContext({
  api: null,
  db: null,
  host: '',
  appKey: '',
});

export default AppContext;
