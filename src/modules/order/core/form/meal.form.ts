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
  private isMealType(
    meal: OrderingDomainModel.Meal,
    type: OrderingDomainModel.MealType
  ) {
    return meal.type === type;
  }

  private hasRequiredAge(
    meal: OrderingDomainModel.Meal,
    guest: OrderingDomainModel.Guest
  ): boolean {
    if (meal.requiredAge === null) {
      return true;
    }
    return guest.age >= meal.requiredAge;
  }

  getSelectableEntries(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter((meal) => {
      return !(
        !this.isMealType(meal, OrderingDomainModel.MealType.ENTRY) ||
        !this.hasRequiredAge(meal, guest)
      );
    });
  }
}
