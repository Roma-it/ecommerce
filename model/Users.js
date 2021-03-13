const path = require ('path');
const fs = require ('fs');

const User = {
    dbPath: path.join(__dirname, '../data/users.json'),
    db: function (){
        return JSON.parse(fs.readFileSync(this.dbPath,'utf-8'));
    },
    generateID: function (){
        let allUsers = this.db();
        if (allUsers.length > 0){
            return allUsers.pop().id+1;   
        }
        return 1;
    },
    findByID: function (id) {
        let userFound= this.db().find(user => user.id == id);
        return userFound;
    },
    findByEmail: function(email){
        return this.db().find(user => user.email === email);
    },
    create: function(user){
        let allUsers = this.db();
        let newUser = {
            id: this.generateID(),
            ...user
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.dbPath,JSON.stringify(allUsers, null, 4));
        return newUser;
    },
    delete: function(id){
        const allUsers = this.db();
        let index = allUsers.findIndex(user => user.id == id);
        if (index > 0){
            allUsers.splice(index,1);
            fs.writeFileSync(this.dbPath,JSON.stringify(allUsers, null, 4));
            return `Usuario ${id} eliminado`
        }
    },
}
module.exports = User;