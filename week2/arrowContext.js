var userName = 'Vasanth';
const profile = {
  userName: 'Vasanth',
  greet: () => {
    console.log(`Hi, I'm ${this.userName}`);
  },
  welcome: function() {
    console.log(`Welcome, ${this.userName}`);
  }
};

const friend = { userName: 'Candidate' };

profile.greet.call(friend); 
profile.welcome.call(friend);

// "Hi I'm undefined
// "Welcome, Candidate"
// Object literal dont create a new scope. They inherit from their enclosing scope which is global
// There is no "name" property in the global scope, so this.userName is undefined in the greet method.
// The welcome method is a regular function, so this refers to the object that called it, which is profile. 
// When we use call(friend), it changes the context of this to friend, so it correctly accesses friend.userName.
// Arrow functions don't have their own this — they always use the this from their lexical (definition-time) scope, making them unsuitable as object methods when you need this to refer to the object.