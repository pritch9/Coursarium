import {AlphaNumericPipe} from './alpha-numeric.pipe';

describe('AlphaNumericPipe', () => {
  it('create an instance', () => {
    const pipe = new AlphaNumericPipe();
    expect(pipe).toBeTruthy();
  });
});
