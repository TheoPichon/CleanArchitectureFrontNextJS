// getSelectableMainCourses
// getSelectableDesserts
// getSelectableDrinks
// assignEntry
// assignMainCourse
// assignDessert
// assignDrink
// onNext
// onPrevious

// isSubmittable

import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class MealForm {
  getSelectableEntries(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter((meal) => {
      if (meal.type !== OrderingDomainModel.MealType.ENTRY) {
        return false;
      }

      return !(meal.requiredAge && guest.age < meal.requiredAge);
    });
  }
}
