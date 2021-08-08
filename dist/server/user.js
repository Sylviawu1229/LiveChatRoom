"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class getUsername {
    constructor() {
        this.users = [];
    }
    userJoin(id, username) {
        let user = { id, username };
        this.users.push(user);
        return user;
    }
    getCurrentUser(id) {
        return this.users.find(user => user.id === id);
    }
    userLeave(id) {
        let index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            return this.users.splice(index, 1)[0];
        }
    }
}
exports.default = getUsername;
//# sourceMappingURL=user.js.map