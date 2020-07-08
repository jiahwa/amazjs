class Person implements Animal{
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName:string, public type:number){
        this.firstName=firstName;
        this.lastName=lastName;
    }
}

class Student extends Person{
    //implements Person
    fullName: string;
    age: number;

    constructor( lastName: string, firstName: string, age: number,public type: number) {
        super(lastName, firstName, type);
        this.fullName = firstName + " " + lastName;
        this.age=age;
    }
}


interface Animal {
    type: number;
}

function greeter(person: Person) {
    return "Hello, this is " + person.firstName + " " + person.lastName + " " + person.type;
}

let user = new Student("Jones", "Dagrass", 10, 11);

console.log(greeter(user));
console.log(user.fullName);
