import { foo, bar } from '../../pages/api/hello';
import {expect, jest, test} from '@jest/globals';



describe('Foo', () => {
  it('mocks bar', () => {
    const bar = jest.fn()
    foo(bar);

    expect(bar).toHaveBeenCalled();

  });
});