/**
 * Ce fichier fournit une configuration pour tester l'application
 * de manière isolée et controlée en utilisant des dépendances simulées et
 * des états de store spécifiques.
 * @param dependencies
 * @returns
 */

import { AppState, createStore } from '@ratatouille/modules/store/store';
import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { StubMealGateway } from '@ratatouille/modules/order/core/testing/stub.meal-gateway';
import { StubTableGateway } from '@ratatouille/modules/order/core/testing/stub.table-gateway';
import { StubIDProvider } from '@ratatouille/modules/core/stub.id-provider';
import { MockReservationGateway } from '@ratatouille/modules/order/core/testing/mock.reservation-gateway';

/**
 * Create testing dependencies with provided defaults
 * @param dependencies
 * @returns
 */
const createDependencies = (
  dependencies?: Partial<Dependencies>
): Dependencies => ({
  idProvider: new StubIDProvider(),
  tableGateway: new StubTableGateway(),
  mealGateway: new StubMealGateway(),
  reservationGateway: new MockReservationGateway(),
  ...dependencies,
});

/**
 * Creates store initialized with a partial state
 * @param config
 * @returns
 */
export const createTestStore = (config?: {
  initialState?: Partial<AppState>;
  dependencies?: Partial<Dependencies>;
}) => {
  const initialStore = createStore({
    dependencies: createDependencies(config?.dependencies),
  });

  const initialState = {
    ...initialStore.getState(),
    ...config?.initialState,
  };

  return createStore({
    initialState,
    dependencies: createDependencies(config?.dependencies),
  });
};

/**
 * Useful for testing selectors without setting redux up
 * @param partialState
 * @returns
 */
export const createTestState = (partialState?: Partial<AppState>) => {
  const store = createStore({
    dependencies: createDependencies(),
  });

  const storeInitialState = store.getState();

  const merged = {
    ...storeInitialState,
    ...partialState,
  };

  return createTestStore({ initialState: merged }).getState();
};
