import 'mocha';
import {expect} from 'chai';
import {add} from '../src/prueba';

describe('add function test', () => {
  it('add(1,8) returns value 9', () => {
    expect(add(1, 8)).to.be.equal(9);
  });
  it('add(-1,8) returns value 7', () => {
    expect(add(-1, 8)).to.be.equal(7);
  });
});
