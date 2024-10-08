import { AppDispatch, AppGetState } from '@ratatouille/modules/store/store';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice';
import { extractErrorMessage } from '@ratatouille/modules/shared/errors.utils';

export const fetchMeals = async (
  dispatch: AppDispatch,
  _: AppGetState,
  dependencies: Dependencies
) => {
  dispatch(orderingSlice.actions.handleMealsLoading());
  try {
    const meals = await dependencies.mealGateway.getMeals();
    dispatch(orderingSlice.actions.storeMeals(meals));
  } catch (error) {
    dispatch(
      orderingSlice.actions.handleMealsError(extractErrorMessage(error))
    );
  }
};
