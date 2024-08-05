import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { IMealGateway } from '@ratatouille/modules/order/core/gateway/meal.gateway';

export class StubMealGateway implements IMealGateway {
  constructor(private data: OrderingDomainModel.Meal[] = []) {}

  async getMeals(): Promise<OrderingDomainModel.Meal[]> {
    return this.data;
  }
}
