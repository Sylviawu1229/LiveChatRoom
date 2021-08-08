export default class getUsername {
    private users = [];

    public userJoin(id, username) {
        let user = { id, username};
        this.users.push(user);
        return user;
      }

    public getCurrentUser(id) {
      return this.users.find(user => user.id === id);
    }

    public userLeave(id) {
        let index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            return this.users.splice(index, 1)[0];
          }
      }
}
