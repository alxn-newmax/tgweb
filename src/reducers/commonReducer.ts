import { WebApp } from '@grammyjs/web-app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

export interface CommonState {
  snackbar: boolean;
  messageModal: boolean;
}

const initialState: CommonState = {
  snackbar: false,
  messageModal: false,
};

const handleClose = (state: CommonState) => {
  console.log('sec')
  WebApp.BackButton.hide();
  state.messageModal = false;
};

const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    changeSnackbarStatus: (state: CommonState, action: PayloadAction) => {
      state.snackbar = !state.snackbar;
    },
    changeMessageModalStatus: (state: CommonState, action: PayloadAction) => {
      if (!state.messageModal) {
        WebApp.BackButton.show();
        WebApp.BackButton.onClick(() => handleClose(state));
        state.messageModal = true;
      } else {
        state.messageModal = !state.messageModal;
      }
    },
  },
});

export const { changeSnackbarStatus, changeMessageModalStatus } = commonReducer.actions;

export const commmonSelector = (state: RootState) => {
  return state.common;
};

export default commonReducer.reducer;
