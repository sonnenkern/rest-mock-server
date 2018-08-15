const fs = require('fs');
const faker = require('faker');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

//database file
const adapter = new FileSync('db.json');
const db = low(adapter);


if(process.argv[2] === 'dynamic') {
    initDB();
} else {
    // destination.txt will be created or overwritten by default.
    fs.copyFile('db-reset.json', 'db.json', (err) => {
        if (err) throw err;
        console.log('db-reset.json was copied to db.json');
    });
}

function initDB() {
    db.assign({
        company: {
            name: faker.company.companyName(),
            city: faker.address.city(),
            adress: faker.address.streetName() + faker.address.streetAddress(),
            country: faker.address.country()
        },
        customers: [
            {
                id: faker.random.uuid(),
                name: faker.name.findName(),
                jobTitle: faker.name.jobTitle(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber()
            },
            {
                id: faker.random.uuid(),
                name: faker.name.findName(),
                jobTitle: faker.name.jobTitle(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber()
            },
            {
                id: faker.random.uuid(),
                name: faker.name.findName(),
                jobTitle: faker.name.jobTitle(),
                email: faker.internet.email(),
                phone: faker.phone.phoneNumber()
            }],
        count: 0 })
        .write();

    console.log('db.json was successfully reseted');
}
