import { useRef, useState } from 'react';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';
import { chooseGuests } from '@ratatouille/modules/order/core/usecases/choose-guests.usecase';
import { useAppDispatch } from '@ratatouille/modules/store/store';

export const useGuestsSection = () => {
  function addGuest() {
    const newState = guestForm.current.addGuest(form);
    setForm(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(form, id);
    setForm(newState);
  }

  function updateGuest<T extends keyof OrderingDomainModel.Guest>(
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    const newState = guestForm.current.updateGuest(form, id, key, value);
    setForm(newState);
  }

  function changeOrganizer(id: string) {
    const newState = guestForm.current.changeOrganizer(form, id);
    setForm(newState);
  }

  function onNext() {
    dispatch(chooseGuests(form)).then((r) => console.log(r));
  }

  function isSubmittable(): boolean {
    return guestForm.current.isSubmittable(form);
  }

  const dispatch = useAppDispatch();
  const { idProvider } = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));
  const [form, setForm] = useState<OrderingDomainModel.Form>({
    guests: [],
    organizerId: null,
  });

  return {
    form,
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmittable: isSubmittable(),
  };
};
