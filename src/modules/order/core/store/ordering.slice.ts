import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderingState = {
  step: OrderingDomainModel.Step;
  form: OrderingDomainModel.Form;
  availableTables: {
    data: OrderingDomainModel.Table[];
    status: 'idle' | 'loading' | 'success' | 'error';
    error: null | string;
  };
  availableMeals: {
    data: OrderingDomainModel.Meal[];
    status: 'idle' | 'loading' | 'success' | 'error';
    error: null | string;
  };
};

export const initialState: OrderingState = {
  step: OrderingDomainModel.Step.GUESTS,
  form: {
    guests: [],
    organizerId: null,
    tableId: null,
  },
  availableTables: {
    status: 'idle',
    error: null,
    data: [],
  },
  availableMeals: {
    status: 'idle',
    error: null,
    data: [],
  },
};

export const orderingSlice = createSlice({
  name: 'ordering',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<OrderingDomainModel.Step>) => {
      state.step = action.payload;
    },
    handleTablesError: (state, action: PayloadAction<string>) => {
      state.availableTables.status = 'error';
      state.availableTables.error = action.payload;
    },
    handleTablesLoading: (state) => {
      state.availableTables.status = 'loading';
      state.availableTables.error = null;
    },
    storeTables: (
      state,
      action: PayloadAction<OrderingDomainModel.Table[]>
    ) => {
      state.availableTables.data = action.payload;
      state.availableTables.status = 'success';
    },
    handleMealsError: (state, action: PayloadAction<string>) => {
      state.availableMeals.status = 'error';
      state.availableMeals.error = action.payload;
    },
    handleMealsLoading: (state) => {
      state.availableMeals.status = 'loading';
      state.availableMeals.error = null;
    },
    storeMeals: (state, action: PayloadAction<OrderingDomainModel.Meal[]>) => {
      state.availableMeals.data = action.payload;
      state.availableMeals.status = 'success';
    },
    chooseGuests: (state, action: PayloadAction<OrderingDomainModel.Form>) => {
      state.form = action.payload;
    },
    chooseTable: (
      state,
      action: PayloadAction<OrderingDomainModel.Form['tableId']>
    ) => {
      state.form.tableId = action.payload;
    },
  },
});

export const orderingReducer = orderingSlice.reducer;
export const orderingActions = orderingSlice.actions;
