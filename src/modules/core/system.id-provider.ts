import { IIdProvider } from '@ratatouille/modules/core/id-provider';
import { nanoid } from 'nanoid';

export class SystemIdProvider implements IIdProvider {
  generate(): string {
    return nanoid();
  }
}
