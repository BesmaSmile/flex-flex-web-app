import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from 'routes';

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch({
        type: 'user/GET_INFO',
      });
    }
  }, [isLoggedIn]);
  return <Routes />;
}
export default App;
