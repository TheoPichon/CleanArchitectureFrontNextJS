import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { IIdProvider } from '@ratatouille/modules/core/id-provider';
// Amélioration de la lisibilité et de la maintenabilité du code en utilisant la librairie immer
// Simplifie la manipulation des objets immuables
import { produce } from 'immer';

export class GuestForm {
  constructor(private idProvider: IIdProvider) {}

  addGuest(state: OrderingDomainModel.Form): OrderingDomainModel.Form {
    return produce(state, (draft) => {
      draft.guests.push({
        id: this.idProvider.generate(),
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
    });
  }

  removeGuest(
    state: OrderingDomainModel.Form,
    id: string
  ): OrderingDomainModel.Form {
    return produce(state, (draft) => {
      const index = draft.guests.findIndex((guest) => guest.id === id);
      if (index < 0) {
        return;
      }
      draft.guests.splice(index, 1);
      if (draft.organizerId === id) {
        draft.organizerId = null;
      }
    });
  }

  changeOrganizer(
    state: OrderingDomainModel.Form,
    id: string
  ): OrderingDomainModel.Form {
    return produce(state, (draft) => {
      const exists = draft.guests.some((guest) => guest.id === id);
      // Defensive programming: if the organizer is not a guest, we don't set it
      draft.organizerId = exists ? id : null;
    });
  }

  isSubmittable(state: OrderingDomainModel.Form): boolean {
    return (
      state.organizerId !== null &&
      state.guests.length > 0 &&
      state.guests.every((guest) => guest.age > 0) &&
      state.guests.every((guest) => guest.firstName.length > 0) &&
      state.guests.every((guest) => guest.lastName.length > 0)
    );
  }

  updateGuest<T extends keyof OrderingDomainModel.Guest>(
    state: OrderingDomainModel.Form,
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ): OrderingDomainModel.Form {
    return produce(state, (draft) => {
      const guest = draft.guests.find((guest) => guest.id === id);
      if (!guest) {
        return;
      }
      guest[key] = value;
    });
  }
}
