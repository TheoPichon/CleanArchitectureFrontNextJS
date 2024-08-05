import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory';
import { createTestStore } from '@ratatouille/modules/testing/tests-environment';
import { ChooseMeal } from '@ratatouille/modules/order/core/usecases/choose-meal.usecase';

const guestForm: OrderingDomainModel.Form = {
  guests: [
    GuestFactory.create({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: 24,
      meals: {
        entry: '1',
        mainCourse: '1',
        dessert: '1',
        drink: '1',
      },
    }),
  ],
  organizerId: '1',
  tableId: '1',
};

describe('Feature: choosing a meal', () => {
  it('should choose a meal', () => {
    const store = createTestStore();
    store.dispatch(ChooseMeal(guestForm));
    expect(store.getState().ordering.form.guests).toEqual(guestForm.guests);
    expect(store.getState().ordering.step).toEqual(
      OrderingDomainModel.Step.SUMMARY
    );
  });
});
