module.exports = () => {
  const { faker } = require('@faker-js/faker');

  /** quantities faker data */
  let users = 50;

  /** database */
  let database = {
    users: [],
  };

  /** generate data */
  for (let i = 0; i < users; i++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let newUser = {
      id: faker.datatype.uuid(),
      name: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName),
      phone: faker.phone.number('+##(###)###-##-##'),
      created: faker.date.past().getTime(),
      modified: faker.date.recent().getTime(),
      status: faker.helpers.arrayElement(['ENABLED', 'DISABLED']),
    };
    database.users.push(newUser);
  }

  return database;
};
