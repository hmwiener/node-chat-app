const expect = require('expect');
const {generateMessage} = require('./message');

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
