import { Product } from './stock.model';

describe('Stock', () => {
  it('should create an instance', () => {
    expect(new Product()).toBeTruthy();
  });
});
