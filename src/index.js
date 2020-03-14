function eval() {
    // Do not use eval!!!
    return;
}




const calc = {
    '+':{
        priority: 1,
        do : (a,b) => a + b,
    },
    '-': {
        priority: 1,
        do : (a,b) => a - b,
    },
    '*': {
        priority: 2,
        do : (a,b) => a * b,
    },
    '/': {
        priority: 2,
        do : (a,b) => a / b,
    }
}


function expressionCalculator(expr) {
    let stackOfNumbers = [],
        stackOfExpr = [],
        arr = [],
        str = '',
        numbers = /[0-9]/g,
        res,
        x,
        y;
    
    for (let i = 0; i < expr.length; i++) {
        if (expr[i].match(numbers)) {
            str += expr[i];
            if (i === expr.length -1) {
                arr.push(str);
            }
        } else {
            arr.push(str);
            arr.push(expr[i]);
            str = '';
        }
    }

    arr = arr.filter(e => e !== ' ' && e !== '');
    let openBrackets = arr.filter(e => e == '(');
        closeBrackets = arr.filter(e => e == ')');
    if (openBrackets.length !== closeBrackets.length) {
        throw 'ExpressionError: Brackets must be paired';
    }


    for (let i = 0; i < arr.length; i++) {
        if (arr[i].match(numbers)) {
            if (i != arr.length-1){
                stackOfNumbers.push(arr[i]);
                continue;
            } else {
                stackOfNumbers.push(arr[i]);
            }
        }

        if (arr[i] === '+') {
            if (stackOfExpr.length === 0) {
                stackOfExpr.push(arr[i]);
                continue;
            }
            if (stackOfExpr[stackOfExpr.length-1] === '(') {
                stackOfExpr.push(arr[i]);
                continue;
            }
            if (calc[stackOfExpr[stackOfExpr.length-1]].priority < calc[arr[i]].priority) {
                stackOfExpr.push(arr[i]);
            } else {
                calculate(stackOfExpr,stackOfNumbers,calc);
                    if (stackOfExpr.length != 0 && stackOfExpr[stackOfExpr.length-1] !== '(') {
                        if (calc[stackOfExpr[stackOfExpr.length-1]].priority <= calc[arr[i]].priority) {
                            calculate(stackOfExpr,stackOfNumbers,calc);
                            stackOfExpr.push(arr[i]);
                        } else {
                            stackOfExpr.push(arr[i]);
                        }
                    } else {
                        stackOfExpr.push(arr[i]);
                    }  
            }
        }

        if (arr[i] === '-') {
            if (stackOfExpr.length === 0) {
                stackOfExpr.push(arr[i]);
                continue;
            }
            if (stackOfExpr[stackOfExpr.length-1] === '(') {
                stackOfExpr.push(arr[i]);
                continue;
            }
            if (calc[stackOfExpr[stackOfExpr.length-1]].priority < calc[arr[i]].priority) {
                stackOfExpr.push(arr[i]);
            } else {
                calculate(stackOfExpr,stackOfNumbers,calc);
                    if (stackOfExpr.length != 0 && stackOfExpr[stackOfExpr.length-1] != '(') {
                        if (calc[stackOfExpr[stackOfExpr.length-1]].priority <= calc[arr[i]].priority) {
                            calculate(stackOfExpr,stackOfNumbers,calc);
                            stackOfExpr.push(arr[i]);
                        } else {
                            stackOfExpr.push(arr[i]);
                        }
                    } else {
                        stackOfExpr.push(arr[i]);
                    }
            }

        }

        if (arr[i] === '*') {
            if (stackOfExpr.length === 0) {
                stackOfExpr.push(arr[i]);
                continue;
            }  
            if (stackOfExpr[stackOfExpr.length-1] === '(') {
                stackOfExpr.push(arr[i]);
                continue;
            }
            if (calc[stackOfExpr[stackOfExpr.length-1]].priority === calc[arr[i]].priority) {
                calculate(stackOfExpr,stackOfNumbers,calc);
                    if (stackOfExpr.length != 0 && stackOfExpr[stackOfExpr.length-1] !== '(') {
                        if(calc[stackOfExpr[stackOfExpr.length-1]].priority === calc[arr[i]].priority) {
                            calculate(stackOfExpr,stackOfNumbers,calc);
                            stackOfExpr.push(arr[i]);
                        } else {
                            stackOfExpr.push(arr[i]);
                        }
                    } else {
                        stackOfExpr.push(arr[i]);
                    }
            } else {
                stackOfExpr.push(arr[i]);
                continue;
            }
            
        }

        if (arr[i] === '/') {
            if (stackOfExpr.length === 0) {
                stackOfExpr.push(arr[i]);
                continue;
            }  
            if (stackOfExpr[stackOfExpr.length-1] === '(') {
                stackOfExpr.push(arr[i]);
                continue;
            }
            if (calc[stackOfExpr[stackOfExpr.length-1]].priority === calc[arr[i]].priority) {
                calculate(stackOfExpr,stackOfNumbers,calc);
                    if (stackOfExpr.length != 0 && stackOfExpr[stackOfExpr.length-1] !== '(') {
                        if(calc[stackOfExpr[stackOfExpr.length-1]].priority === calc[arr[i]].priority) {
                            calculate(stackOfExpr,stackOfNumbers,calc);
                            stackOfExpr.push(arr[i]);
                        } else {
                            stackOfExpr.push(arr[i]);
                        }
                    } else {
                        stackOfExpr.push(arr[i]);
                    }
            } else {
                stackOfExpr.push(arr[i]);
                continue;
            }
            
        }

    if (arr[i] === '(') {
        stackOfExpr.push(arr[i]);
        continue;
    }


    if (arr[i] === ')') {
        while (stackOfExpr[stackOfExpr.length -1] != '(') {
            calculate(stackOfExpr,stackOfNumbers,calc);
        }
        stackOfExpr.pop();
    }



        if (i === arr.length - 1) {
            x = stackOfExpr.pop();
            y = stackOfNumbers.pop();
            if (x === '/' && y === '0') {
                throw 'TypeError: Division by zero.';
            } else {
                res = calc[x].do(+stackOfNumbers[stackOfNumbers.length - 1], +y);
                stackOfNumbers.pop();
                stackOfNumbers.push(res);

                while (stackOfExpr.length > 0) {
                        x = stackOfExpr.pop();
                        y = stackOfNumbers.pop();
                        res = calc[x].do(+stackOfNumbers[stackOfNumbers.length - 1], +y);
                }
            }
        }
    }

   
    return res;
}



function calculate(arr, arr1, obj) {
    let x = arr.pop(),
        y = arr1.pop(),
        el;
    if (x === '/' && y === '0') {
        throw 'TypeError: Division by zero.';
    } else {
        el = obj[x].do(+arr1[arr1.length - 1], +y);
    }
    arr1.pop();
    arr1.push(el);
}

module.exports = {
    expressionCalculator
}