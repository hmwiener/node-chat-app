const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('Generate Message', () => {
  it('should generate a message object', () => {
    var from = 'Howard';
    var text = 'Test message text';

    var res = generateMessage(from, text);
    expect((res) => {
      expect(res.from).toBe(from)
      expect(res.text).toBe(text)
      expect(typeof res.completedAt).toBe('number')
    });
  });
});

describe('Generate location message', () => {

  it('should generate correct location object', () => {

    var from = 'Admin';
    var lat = 40.9772032;
    var long = -73.7763328;
    var msg = generateLocationMessage(from, lat, long);
    
    expect((msg) => {
      expect(msg.from).toBe('Admin')
      expect(msg.url).toBe('https://www.google.com/maps?q=40.9772032,-73.7763328')
      expect(typeof res.completedAt).toBe('number')
    });
  });
});
