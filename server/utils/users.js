
//add User (name, room)
//remove User (id)
//fetch User (id)
//get user list (room)

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room}
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    console.log('Removing User');
    var user = this.getUser(id);

    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }

}

module.exports = {Users};
