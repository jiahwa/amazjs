import chalk from 'chalk';

/*

Intro:

    We are starting a small community of users. For performance
    reasons we have decided to store all users right in the code.
    This way we can provide our developers with more
    user-interaction opportunities. With user-related data, at least.
    All the GDPR-related issues we will solved some other day.
    This would be the base for our future experiments during
    this workshop.

Exercise:

    Given the data, define the interface "User" and use it accordingly.

Run this exercise:

    npm run 0

    - OR -

    yarn -s 0

*/

const users: User[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    },
    // If has other type
    {
        name: 'Kate Müller',
        age: 23,
        brightPoint: 'Appearence'
    }
];

function logPerson(user: User) {
    console.log(` - ${chalk.green(user.name)}, ${user.age}`);
}

// Via extends method to solve issue like users unit type is more than one kind interface, 
interface User extends Leader{
    name: string,
    age: number,
    occupation?: string
}

// If this is needed
interface Leader {
    name: string,
    age: number,
    brightPoint?: string
}

console.log(chalk.yellow('Users:'));
users.forEach(logPerson);

// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/interfaces.html#introduction
