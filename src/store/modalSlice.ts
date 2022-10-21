import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpened: false,
  },
  reducers: {
    toggleModal(state) {
      state.isModalOpened = !state.isModalOpened;
    },

    setModal(state, action: PayloadAction<boolean>) {
      state.isModalOpened = action.payload;
    },
  },
});

export const { toggleModal, setModal } = modalSlice.actions;
export const selectIsModalOpened = (state: RootState) =>
  state.modal.isModalOpened;

export const modalReducer = modalSlice.reducer;
