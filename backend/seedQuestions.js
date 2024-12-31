const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const questions = [
    {
        question: "Which of the following is not a principle of OOP?",
        options: ["Encapsulation", "Polymorphism", "Inheritance", "Compilation"],
        correctOption: 3
    },
    {
        question: "What is encapsulation in OOP?",
        options: [
            "Hiding internal details and showing functionality only",
            "The ability to take many forms",
            "The ability to inherit methods from a parent class",
            "Combining data and methods into a single unit"
        ],
        correctOption: 3
    },
    {
        question: "Which of the following feature of OOP allows reusability of code?",
        options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
        correctOption: 0
    },
    {
        question: "Which of the following best defines polymorphism?",
        options: [
            "Ability of a function to behave differently based on input",
            "Hiding internal details of an object",
            "Restricting access to methods",
            "None of the above"
        ],
        correctOption: 0
    },
    {
        question: "What is abstraction in OOP?",
        options: [
            "Hiding internal implementation details and showing only functionality",
            "Ability to inherit properties",
            "Restricting access to methods",
            "Combining data and methods"
        ],
        correctOption: 0
    },
    {
        question: "What is the main advantage of inheritance in OOP?",
        options: [
            "Allows for code reusability",
            "Hides implementation details",
            "Provides access control to data",
            "Encapsulates methods and data"
        ],
        correctOption: 0
    },
    {
        question: "Which of the following is an example of polymorphism in OOP?",
        options: [
            "A class inheriting methods from another class",
            "A class containing private data members",
            "A method with the same name behaving differently based on input",
            "A class combining multiple objects"
        ],
        correctOption: 2
    },
    {
        question: "Which OOP principle is used to hide the internal details of an object?",
        options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
        correctOption: 0
    },
    {
        question: "What does the term 'method overriding' refer to in OOP?",
        options: [
            "A child class providing a specific implementation for a method inherited from the parent class",
            "A child class inheriting methods from the parent class",
            "A method being overloaded with different parameters",
            "None of the above"
        ],
        correctOption: 0
    },
    {
        question: "Which of the following is true about interfaces in OOP?",
        options: [
            "An interface cannot have any method implementations",
            "An interface is a concrete class",
            "An interface can have both abstract and concrete methods",
            "None of the above"
        ],
        correctOption: 0
    }
];

const seedQuestions = async () => {
    try {
        await Question.insertMany(questions);
        console.log('Questions seeded successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding questions:', err);
        mongoose.connection.close();
    }
};

seedQuestions();
