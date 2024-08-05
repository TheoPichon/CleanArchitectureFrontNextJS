import { IIdProvider } from '@ratatouille/modules/core/id-provider';

export class StubIDProvider implements IIdProvider {
  generate(): string {
    return '1';
  }
}
