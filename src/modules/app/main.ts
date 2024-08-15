import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { AppStore, createStore } from '@ratatouille/modules/store/store';
import { SystemIdProvider } from '@ratatouille/modules/core/system.id-provider';
import { InMemoryTableGateway } from '@ratatouille/modules/order/core/gateway-infra/in-memory.table-gateway';
import { InMemoryMealGateway } from '@ratatouille/modules/order/core/gateway-infra/in-memory.meal-gateway';
import { InMemoryReservationGateway } from '@ratatouille/modules/order/core/gateway-infra/in-memory.reservation-gateway';

export class App {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  /**
   * Configure toutes les dépendances de l'application
   */
  setupDependencies(): Dependencies {
    return {
      idProvider: new SystemIdProvider(),
      tableGateway: new InMemoryTableGateway(),
      mealGateway: new InMemoryMealGateway(),
      reservationGateway: new InMemoryReservationGateway(),
    };
  }
}

export const app = new App();
