import { MockReservationGateway } from '@ratatouille/modules/order/core/testing/mock.reservation-gateway';
import { createTestStore } from '@ratatouille/modules/testing/tests-environment';
import { reserve } from '@ratatouille/modules/order/core/usecases/reserve.usecase';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory';
import { OrderingState } from '@ratatouille/modules/order/core/store/ordering.slice';
import { FailingReservationGateway } from '@ratatouille/modules/order/core/testing/failing.reservation-gateway';

const orderForm: OrderingDomainModel.Form = {
  organizerId: '1',
  tableId: '1',
  guests: [
    GuestFactory.create({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: 21,
      meals: {
        entry: null,
        mainCourse: '1',
        dessert: null,
        drink: null,
      },
    }),
  ],
};

// État initial du module ordering
const orderingState: OrderingState = {
  step: OrderingDomainModel.Step.SUMMARY,
  form: orderForm,
  availableTables: {
    status: 'idle',
    error: null,
    data: [],
  },
  availableMeals: {
    status: 'idle',
    error: null,
    data: [],
  },
  reservation: { status: 'idle' },
};

describe('Reserve', () => {
  it('should reserve successfully', async () => {
    const reservationGateway = new MockReservationGateway();
    const store = createTestStore({
      initialState: { ordering: orderingState },
      dependencies: { reservationGateway },
    });

    const promise = store.dispatch(reserve());
    expect(store.getState().ordering.reservation.status).toEqual('loading');
    await promise;
    expect(store.getState().ordering.reservation.status).toEqual('success');

    reservationGateway.expectReserveWasCalledWith({
      tableId: '1',
      guests: [
        {
          firstName: 'John',
          lastName: 'Doe',
          age: 21,
          isOrganizer: true,
          meals: {
            entry: null,
            mainCourse: '1',
            dessert: null,
            drink: null,
          },
        },
      ],
    });

    expect(store.getState().ordering.step).toEqual(
      OrderingDomainModel.Step.RESERVED
    );
  });

  it('should failed to reserve', async () => {
    const reservationGateway = new FailingReservationGateway();
    const store = createTestStore({
      initialState: { ordering: orderingState },
      dependencies: { reservationGateway },
    });

    const promise = store.dispatch(reserve());
    expect(store.getState().ordering.reservation.status).toEqual('loading');
    await promise;
    expect(store.getState().ordering.reservation.status).toEqual('error');
    expect((store.getState().ordering.reservation as any).error).toEqual(
      'Reservation failed'
    );
  });
});
