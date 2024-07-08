function greet() {

    let name = 'Justin';
    let age = 25;
    console.log('Hello' + name);

    sayGoodbye(name);
    sayGoodbye(age);
    sayGoodbye('Hans');
}

function sayGoodbye(name) {
    console.log('Bye, bye ' + name);
}

greet()