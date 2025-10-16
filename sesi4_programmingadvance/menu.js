import { calculator } from './rumus.js';
import readline from 'readline';

const inputUser = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

inputUser.question('Enter the first number: ', num1 => {
  inputUser.question('Enter the second number: ', num2 => {
    inputUser.question('Enter operator (+, -, *, /): ', operator => {
      console.log(`Result: ${calculator(parseFloat(num1), parseFloat(num2), operator)}`);
      inputUser.close();
    });
  });
});
