import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { AppDispatch } from '@ratatouille/modules/store/store';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';

export const ChooseMeal =
  (form: OrderingDomainModel.Form) => (dispatch: AppDispatch) => {
    dispatch(orderingSlice.actions.chooseMeal(form));
  };
