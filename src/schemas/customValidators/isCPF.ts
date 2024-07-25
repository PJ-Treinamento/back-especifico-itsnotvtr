export default function isCPF(input: string): boolean {
    let sum = 0;
    let rest;
  
    if (input.length !== 11) {
      throw new Error('Invalid CPF');
    }
  
    if (input === '00000000000') {
      throw new Error('Invalid CPF');
    }
  
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(input.substring(i - 1, i), 10) * (11 - i);
    }
    rest = (sum * 10) % 11;
  
    if (rest === 10 || rest === 11) {
      rest = 0;
    }
  
    if (rest !== parseInt(input.substring(9, 10), 10)) {
      throw new Error('Invalid CPF');
    }
  
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(input.substring(i - 1, i), 10) * (12 - i);
    }
    rest = (sum * 10) % 11;
  
    if (rest === 10 || rest === 11) {
      rest = 0;
    }
  
    if (rest !== parseInt(input.substring(10, 11), 10)) {
      throw new Error('Invalid CPF');
    }
  
    return true;
  }