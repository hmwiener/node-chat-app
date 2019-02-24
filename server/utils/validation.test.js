const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString tests', () => {

  it('should accept non-blank name and room', () => {
    var  joinInput = {
      name: 'myName',
      room: 'myRoom'
    }
    var res = (isRealString(joinInput.name) && isRealString(joinInput.room));
    expect(res).toBe(true);
  });

  it('should reject either string if it contains only spaces', () => {
    var  joinInput = {
      name: '      ',
      room: 'myRoom'
    }
    var res = (isRealString(joinInput.name) && isRealString(joinInput.room));
    expect(res).toBe(false);
  });

  it('should reject non-string values', () => {
    var  joinInput = {
      name: 77,
      room: 'myRoom'
    }
    var res = (isRealString(joinInput.name) && isRealString(joinInput.room));
    expect(res).toBe(false);
  });
});
