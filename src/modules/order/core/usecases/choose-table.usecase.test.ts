import { createTestStore } from '@ratatouille/modules/testing/tests-environment';
import { chooseTable } from '@ratatouille/modules/order/core/usecases/choose-table.usecase';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

describe('Choose table', () => {
  it('should choose a table', () => {
    const store = createTestStore();

    store.dispatch(chooseTable('1'));

    expect(store.getState().ordering.form.tableId).toEqual('1');
    expect(store.getState().ordering.step).toEqual(
      OrderingDomainModel.Step.MEALS
    );
  });
});
