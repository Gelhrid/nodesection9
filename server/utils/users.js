class Users {
  constructor () {
    this.usersList = [];
  }
  addUser(id, name, room){
      var user = {id, name, room};
      this.usersList.push(user);
      return user;
  }
  removeUser(id){
    var user = this.getUser(id);

    if(user){
    this.usersList.splice(this.usersList.indexOf(user), 1);
    //alternatywa
    // mozna stworzyc przez filter nowa tablice gdzie nie zgadza sie id:
    // this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser(id){
    return this.usersList.filter((user) => {
      return user.id === id;
    })[0];
  }
  getUserList(room){
    var users = this.usersList.filter((user) => {
      return user.room === room;
    });

    var namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray;
  }
}

module.exports = {Users}
