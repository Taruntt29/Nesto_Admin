import { configureStore, createSlice } from '@reduxjs/toolkit';

const builderSlice = createSlice({
  name: 'builder',
  initialState: {
    builderId: null,
    builderOnBoardingStep: false,
    builderPastPropertyStep: false,
  },
  reducers: {
    setBuilderId(state, action) {
      state.builderId = action.payload;
    },
    setBuilderOnBoardingStep(state, action) {
      state.builderOnBoardingStep = action.payload;
    },
    setBuilderPastPropertyStep(state, action) {
      state.builderPastPropertyStep = action.payload;
    },
  },
});

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    propertyTypeString: 'commercial space',
  },
  reducers: {
    setPropertyTypeString(state, action) {
      state.propertyTypeString = action.payload;
    },
  },
});

export const {
  setBuilderId,
  setBuilderOnBoardingStep,
  setBuilderPastPropertyStep,
} = builderSlice.actions;

export const { setPropertyTypeString } = propertySlice.actions;

const store = configureStore({
  reducer: {
    builder: builderSlice.reducer,
    property: propertySlice.reducer,
  },
});

export default store;
