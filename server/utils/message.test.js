var expect = require('expect');

const {generateMessage} = require('./message');
const www = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'michal';
    var text = 'some msg';
    var result = generateMessage(from, text);
    expect(result.createdAt).toBeA('number');
    expect(result).toInclude({from, text});
  });

  // it('should generate correct message object', () => {
  //   var from = 'michal';
  //   var text = 'some msg';
  //   var result = www.generateMessage(from, text);
  //   expect(result.createdAt).toBeA('number');
  //   expect(result).toInclude({from, text});
  // });
});
