var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(firstName, lastName, type) {
        this.type = type;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(lastName, firstName, age, type) {
        var _this = _super.call(this, lastName, firstName, type) || this;
        _this.type = type;
        _this.fullName = firstName + " " + lastName;
        _this.age = age;
        return _this;
    }
    return Student;
}(Person));
function greeter(person) {
    return "Hello, this is " + person.firstName + " " + person.lastName + " " + person.type;
}
var user = new Student("Jones", "Dagrass", 10, 11);
console.log(greeter(user));
console.log(user.fullName);
