const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.usersList = [{
      id: '1',
      name: 'Kasia',
      room: 'Pokoj112'
    },
    {
      id: '2',
      name: 'Michal',
      room: 'Pokoj222'
    },
    {
      id: '3',
      name: 'Jacek',
      room: 'Pokoj112'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Michal',
      room: 'Pokoj112'
    };

    var returnedUser = users.addUser(user.id, user.name, user.room);
    expect(users.usersList).toEqual([user]);
  });

  it('should return names for Pokoj112', () => {
    var returnedUsers = users.getUserList('Pokoj112');

    expect(returnedUsers.length).toBe(2);
    expect(returnedUsers).toEqual(['Kasia','Jacek']);
  });

  it('should return names for Pokoj222', () => {
    var returnedUsers = users.getUserList('Pokoj222');

    expect(returnedUsers.length).toBe(1);
    expect(returnedUsers).toEqual(['Michal']);
  });

  it('should remove a user', () => {
      var removedUser = users.removeUser('1');
      expect(users.usersList.length).toBe(2);
      expect(removedUser.name).toBe('Kasia');
  });

  it('should not remove user with wrong id provided', () => {
      var removedUser = users.removeUser('11d');
      expect(users.usersList.length).toBe(3);
  });

  it('should find user', () => {
      var findedUser = users.getUser('1');
      expect(findedUser).toBe(users.usersList[0]);
  });

  it('should not find user with wrong id provided', () => {
    var findedUser = users.getUser('11');
    expect(findedUser).toNotExist();
  });
});
