import { AppDispatch, AppGetState } from '@ratatouille/modules/store/store';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';

export const chooseTable =
  (tableId: string) => (dispatch: AppDispatch, _: AppGetState) => {
    dispatch(orderingSlice.actions.chooseTable(tableId));
  };
