const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Alice',
      room: 'Node Nerds'
    }, {
      id: '2',
      name: 'Bob',
      room: 'Node Nerds'
    }, {
      id: '3',
      name: 'Charles',
      room: 'Node Afficionados'
    }];

  });

  it('should add new users', () => {
    var users = new Users();
    var user = {
      id: '321',
      name: 'Howard',
      room: 'Node Nerds'
    };
    var res = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return a list of users in Node Nerds', () => {
    var userList = users.getUserList('Node Nerds');
    expect(userList).toEqual(['Alice', 'Bob']);
  });

  it('should return a list of users in Node Afficionados', () => {
    var userList = users.getUserList('Node Afficionados');
    expect(userList).toEqual(['Charles']);
  });

  it('should return a list with one user if found', () => {
    var userId = '1';
    var userList = users.getUser(userId);
    expect(userList).toInclude({name: 'Alice'});
  });

  it('should return an undefined object if user not found', () => {
    var userId = '5';
    var userList = users.getUser(userId);
    expect(userList).toNotExist();
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2)
  });

  it('should not remove an invalid user', () => {
    var userId = '11';
    var user = users.removeUser(userId);
    expect(user).toNotExist;
    expect(users.users.length).toBe(3);
  });

});
