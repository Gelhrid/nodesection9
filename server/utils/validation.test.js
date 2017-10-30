const expect = require('expect');

//import isRealString
const {isRealString} = require('./validation');


//isRealString
describe('isRealString', () => {
  it('should reject nont-string values', () => {
    var str = new Date();
    var result = isRealString(str);
    expect(result).toBeA('boolean');
    expect(result).toBe(false);
  });
  it('should reject string with only spaces', () => {
    var str = '             ';
    var result = isRealString(str);
    expect(result).toBeA('boolean');
    expect(result).toBe(false);
  });

  it('should allow string with non-space charactes', () => {
    var str = '      sadsad       ';
    var result = isRealString(str);
    expect(result).toBeA('boolean');
    expect(result).toBe(true);
  });
});
