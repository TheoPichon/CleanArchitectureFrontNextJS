import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { IMealGateway } from '@ratatouille/modules/order/core/gateway/meal.gateway';
import { MealFactory } from '@ratatouille/modules/order/core/model/meal.factory';

export class InMemoryMealGateway implements IMealGateway {
  async getMeals(): Promise<OrderingDomainModel.Meal[]> {
    return [
      MealFactory.create({
        id: '1',
        title: 'Pizza',
        type: OrderingDomainModel.MealType.ENTRY,
        requiredAge: null,
      }),
      MealFactory.create({
        id: '2',
        title: 'Pasta',
        type: OrderingDomainModel.MealType.MAIN_COURSE,
        requiredAge: null,
      }),
      MealFactory.create({
        id: '3',
        title: 'Tiramisu',
        type: OrderingDomainModel.MealType.DESSERT,
        requiredAge: null,
      }),
      MealFactory.create({
        id: '4',
        title: 'Water',
        type: OrderingDomainModel.MealType.DRINK,
        requiredAge: null,
      }),
    ];
  }
}
