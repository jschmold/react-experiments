import Redux from '@reduxjs/toolkit';
import account from './account/store';


export default Redux.configureStore({
  reducer: { account },
});
