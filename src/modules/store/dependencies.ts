import { IIdProvider } from '@ratatouille/modules/core/id-provider';
import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway';
import { IMealGateway } from '@ratatouille/modules/order/core/gateway/meal.gateway';
import { IReservationGateway } from '@ratatouille/modules/order/core/gateway/reservation.gateway';

export type Dependencies = {
  idProvider: IIdProvider;
  tableGateway: ITableGateway;
  mealGateway: IMealGateway;
  reservationGateway: IReservationGateway;
};
