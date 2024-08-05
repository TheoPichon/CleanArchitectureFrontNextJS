// getSelectableEntries
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

import { MealForm } from '@ratatouille/modules/order/core/form/meal.form';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { MealFactory } from '@ratatouille/modules/order/core/model/meal.factory';

const regularEntry = MealFactory.create({
  id: 'entry-1',
  type: OrderingDomainModel.MealType.ENTRY,
});

const adultEntry: OrderingDomainModel.Meal = MealFactory.create({
  id: 'entry-2',
  type: OrderingDomainModel.MealType.ENTRY,
  requiredAge: 18,
});

const regularMainCourse: OrderingDomainModel.Meal = MealFactory.create({
  id: 'main-course-1',
  type: OrderingDomainModel.MealType.MAIN_COURSE,
});

const adultMainCourse: OrderingDomainModel.Meal = MealFactory.create({
  id: 'main-course-2',
  type: OrderingDomainModel.MealType.MAIN_COURSE,
  requiredAge: 18,
});

const regularDessert: OrderingDomainModel.Meal = MealFactory.create({
  id: 'dessert-1',
  type: OrderingDomainModel.MealType.DESSERT,
});

const adultDessert: OrderingDomainModel.Meal = MealFactory.create({
  id: 'dessert-2',
  type: OrderingDomainModel.MealType.DESSERT,
  requiredAge: 18,
});

const regularDrink: OrderingDomainModel.Meal = MealFactory.create({
  id: 'drink-1',
  type: OrderingDomainModel.MealType.DRINK,
});

const adultDrink: OrderingDomainModel.Meal = MealFactory.create({
  id: 'drink-2',
  type: OrderingDomainModel.MealType.DRINK,
  requiredAge: 18,
});

const adult: OrderingDomainModel.Guest = GuestFactory.create({
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
});

const children = GuestFactory.create({
  id: '2',
  firstName: 'Jane',
  lastName: 'Doe',
  age: 10,
});

const meals: OrderingDomainModel.Meal[] = [
  regularEntry,
  adultEntry,
  regularMainCourse,
  adultMainCourse,
  regularDessert,
  adultDessert,
  regularDrink,
  adultDrink,
];

const mealForm = new MealForm();
describe('Selecting meals', () => {
  describe('selecting entries', () => {
    it('should return an empty array if there are no meals available', () => {
      const result = mealForm.getSelectableEntries([], adult);
      expect(result).toEqual([]);
    });
    it('when meals are available, it should return adult meals', () => {
      const result = mealForm.getSelectableEntries(meals, adult);
      expect(result).toEqual([regularEntry, adultEntry]);
    });
    it('when meals are available, it should return children only meals', () => {
      const result = mealForm.getSelectableEntries(meals, children);
      expect(result).toEqual([regularEntry]);
    });
  });
});
