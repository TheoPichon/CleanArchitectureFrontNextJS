import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { IIdProvider } from '@ratatouille/modules/core/id-provider';
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory';

class StubIDProvider implements IIdProvider {
  generate(): string {
    return '1';
  }
}

const idProvider = new StubIDProvider();

const emptyInitialState: OrderingDomainModel.Form = {
  guests: [],
  organizerId: null,
  tableId: null,
};

const johnDoe = GuestFactory.create({
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  age: 24,
  meals: {
    entry: null,
    mainCourse: null,
    dessert: null,
    drink: null,
  },
});

const janeDoe = GuestFactory.create({
  id: '2',
  firstName: 'Jane',
  lastName: 'Doe',
  age: 24,
  meals: {
    entry: null,
    mainCourse: null,
    dessert: null,
    drink: null,
  },
});

const stateWithOneUser: OrderingDomainModel.Form = {
  guests: [johnDoe],
  organizerId: null,
  tableId: null,
};

const stateWithTwoUsers: OrderingDomainModel.Form = {
  guests: [johnDoe, janeDoe],
  organizerId: null,
  tableId: null,
};
const form = new GuestForm(idProvider);

describe('Add a guest', () => {
  it('should add a guest', () => {
    const state = form.addGuest(emptyInitialState);
    expect(state.guests).toEqual([johnDoe]);
  });

  it('should add a guest when there is already one', () => {
    const state = form.addGuest(stateWithOneUser);
    expect(state.guests).toEqual([johnDoe, johnDoe]);
  });

  it('should add a guest when there are already two', () => {
    const state = form.addGuest(stateWithTwoUsers);
    expect(state.guests).toEqual([johnDoe, janeDoe, johnDoe]);
  });
});

describe('Remove a guest', () => {
  it('when there is no user, the remove should do nothing', () => {
    const state = form.removeGuest(emptyInitialState, '1');
    expect(state.guests).toEqual([]);
  });

  it('when there is a user with ID 1, the user with ID 1 should be removed', () => {
    const state = form.removeGuest(stateWithOneUser, '1');
    expect(state.guests).toEqual([]);
  });

  it('when there is two user, on`y the user with ID 1 should be removed', () => {
    const state = form.removeGuest(stateWithTwoUsers, '1');
    expect(state.guests).toEqual([janeDoe]);
  });

  it('when I remove an organizer, the organizer ID should be set to null', () => {
    const state = form.removeGuest(stateWithOneUser, '1');
    expect(state.organizerId).toEqual(null);
  });
});

describe('Add an organizer', () => {
  it('set organizer ID when the user does not exist', () => {
    const state = form.changeOrganizer(emptyInitialState, '1');
    expect(state.organizerId).toEqual(null);
  });

  it('set organizer ID when the user exist', () => {
    const state = form.changeOrganizer(stateWithOneUser, '1');
    expect(state.organizerId).toEqual('1');
  });
});

describe('Is submittable', () => {
  it.each([
    {
      firstname: '',
    },
    {
      lastname: '',
    },
    {
      age: 0,
    },
  ])(
    'when a guest has an invalid %s, it should not be submittable',
    (guest) => {
      const withInvalidGuestState: OrderingDomainModel.Form = {
        ...stateWithOneUser,
        guests: [
          {
            ...johnDoe,
            ...guest,
          },
        ],
      };
      const isSubmittable = form.isSubmittable(withInvalidGuestState);
      expect(isSubmittable).toEqual(false);
    }
  );
});

describe('Update guest', () => {
  it.each([
    {
      key: 'firstName' as keyof OrderingDomainModel.Guest,
      value: 'Jane',
    },
    {
      key: 'lastName' as keyof OrderingDomainModel.Guest,
      value: 'Wick',
    },
    {
      key: 'age' as keyof OrderingDomainModel.Guest,
      value: 23,
    },
  ])('should update the %s name of the guest', ({ key, value }) => {
    const state = form.updateGuest(stateWithOneUser, '1', key, value);
    expect(state.guests[0][key]).toEqual(value);
  });

  it('should do nothing if the id is not assigned', () => {
    const state = form.updateGuest(stateWithOneUser, '2', 'firstName', 'Jane');
    expect(state).toEqual(stateWithOneUser);
  });
});
