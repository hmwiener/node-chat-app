var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, lat, long) => {
  console.log('New Loc Request');
  return{
    from,
    url: `https://www.google.com/maps?q=${lat},${long}`,
    createdAt:  moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};
