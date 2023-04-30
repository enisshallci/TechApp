const bcrypt = require("bcryptjs")     

const users = [
      {
    name: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
  },
  {
    name: 'enis',
    lastName: 'shallci',
    email: 'enis@shallci.com',
    password: bcrypt.hashSync('enis@shallci.com', 10),
  },
]

module.exports = users


