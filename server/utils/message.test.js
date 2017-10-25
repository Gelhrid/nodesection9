var expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');
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

describe('generateLocationMessage', () => {
  it('should generate correct message object', () => {
    var from = 'michal';
    var latitude = 123;
    var longitude = 321;
    var url= `https://www.google.com/maps?q=${latitude},${longitude}`;
    var result = generateLocationMessage(from, latitude, longitude);
    expect(result.createdAt).toBeA('number');
    expect(result).toInclude({from, url});
    expect(result.url).toBe(url);
  });
});
