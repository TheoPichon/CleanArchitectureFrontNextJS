import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { TableFactory } from '@ratatouille/modules/order/core/model/table.factory';
import { useState } from 'react';

export const useTable = () => {
  function assignTable(tableId: string) {
    setAssignedTableId(tableId);
  }

  function onNext() {
    console.log('onNext');
  }

  function onPrevious() {
    console.log('onPrevious');
  }

  function isSubmittable() {
    return false;
  }

  const [assignedTableId, setAssignedTableId] = useState<string | null>(null);

  const availableTables: OrderingDomainModel.Table[] = [
    TableFactory.create(),
    TableFactory.create({
      id: 'table-2',
      title: 'centre de la pièce',
      capacity: 2,
    }),
  ];

  return {
    assignTable,
    onNext,
    onPrevious,
    isSubmittable: isSubmittable(),
    availableTables,
    assignedTableId,
  };
};
