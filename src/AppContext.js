import React from 'react';

const AppContext = React.createContext({
  api: null,
  db: null,
  host: '',
  appKey: '',
});

// TODO Example

export default AppContext;
