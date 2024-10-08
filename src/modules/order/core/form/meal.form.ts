import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { produce } from 'immer';

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

  getSelectableMainCourses(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter((meal) => {
      return !(
        !this.isMealType(meal, OrderingDomainModel.MealType.MAIN_COURSE) ||
        !this.hasRequiredAge(meal, guest)
      );
    });
  }

  getSelectableDesserts(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter((meal) => {
      return !(
        !this.isMealType(meal, OrderingDomainModel.MealType.DESSERT) ||
        !this.hasRequiredAge(meal, guest)
      );
    });
  }

  getSelectableDrinks(
    meals: OrderingDomainModel.Meal[],
    guest: OrderingDomainModel.Guest
  ): OrderingDomainModel.Meal[] {
    return meals.filter((meal) => {
      return !(
        !this.isMealType(meal, OrderingDomainModel.MealType.DRINK) ||
        !this.hasRequiredAge(meal, guest)
      );
    });
  }

  // Il vaut mieux un code ennuyeux et clair (répétition pour les assign)
  assignEntry(
    form: OrderingDomainModel.Form,
    guestId: string,
    mealId: OrderingDomainModel.MealId | null
  ) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((g) => g.id === guestId);
      if (!guest) {
        return;
      }
      guest.meals.entry = mealId;
    });
  }

  assignMainCourse(
    form: OrderingDomainModel.Form,
    guestId: string,
    mealId: OrderingDomainModel.MealId | null
  ) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((g) => g.id === guestId);
      if (!guest) {
        return;
      }
      guest.meals.mainCourse = mealId;
    });
  }

  assignDessert(
    form: OrderingDomainModel.Form,
    guestId: string,
    mealId: OrderingDomainModel.MealId | null
  ) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((g) => g.id === guestId);
      if (!guest) {
        return;
      }
      guest.meals.dessert = mealId;
    });
  }

  assignDrink(
    form: OrderingDomainModel.Form,
    guestId: string,
    mealId: OrderingDomainModel.MealId | null
  ) {
    return produce(form, (draft) => {
      const guest = draft.guests.find((g) => g.id === guestId);
      if (!guest) {
        return;
      }
      guest.meals.drink = mealId;
    });
  }

  isSubmittable(form: OrderingDomainModel.Form) {
    return form.guests.every((guest) => guest.meals.mainCourse !== null);
  }
}
