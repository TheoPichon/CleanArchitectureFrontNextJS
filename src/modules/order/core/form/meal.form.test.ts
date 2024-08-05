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
  it.each([
    {
      meals: [],
      guest: adult,
      expected: [],
    },
    {
      meals: meals,
      guest: adult,
      expected: [regularEntry, adultEntry],
    },
    {
      meals: meals,
      guest: children,
      expected: [regularEntry],
    },
  ])('should get selectable entries', ({ meals, guest, expected }) => {
    const result = mealForm.getSelectableEntries(meals, guest);
    expect(result).toEqual(expected);
  });

  it.each([
    {
      meals: [],
      guest: adult,
      expected: [],
    },
    {
      meals: meals,
      guest: adult,
      expected: [regularMainCourse, adultMainCourse],
    },
    {
      meals: meals,
      guest: children,
      expected: [regularMainCourse],
    },
  ])('should get selectable main courses', ({ meals, guest, expected }) => {
    const result = mealForm.getSelectableMainCourses(meals, guest);
    expect(result).toEqual(expected);
  });

  it.each([
    {
      meals: [],
      guest: adult,
      expected: [],
    },
    {
      meals: meals,
      guest: adult,
      expected: [regularDessert, adultDessert],
    },
    {
      meals: meals,
      guest: children,
      expected: [regularDessert],
    },
  ])('should get selectable desserts', ({ meals, guest, expected }) => {
    const result = mealForm.getSelectableDesserts(meals, guest);
    expect(result).toEqual(expected);
  });

  it.each([
    {
      meals: [],
      guest: adult,
      expected: [],
    },
    {
      meals: meals,
      guest: adult,
      expected: [regularDrink, adultDrink],
    },
    {
      meals: meals,
      guest: children,
      expected: [regularDrink],
    },
  ])('should get selectable drinks', ({ meals, guest, expected }) => {
    const result = mealForm.getSelectableDrinks(meals, guest);
    expect(result).toEqual(expected);
  });
});
