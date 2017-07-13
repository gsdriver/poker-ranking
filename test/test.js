/*
 * MIT License

 * Copyright (c) 2016 Garrett Vargas

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const lib = require('../index');

let succeeded = 0;
let failed = 0;

function runTest(testName, cards, options, expectedResult) {
  const result = lib.evaluateHand(cards, options);

  if (result == expectedResult) {
    console.log('SUCCESS: ' + testName + ' returned ' + result);
    succeeded++;

    // getDetails test
    if (!options) {
      const details = lib.evaluateHand(cards, {getDetails: true});
      console.log(JSON.stringify(details));

    }
  } else {
    console.log('FAIL: ' + testName + ' returned ' + result + ' rather than ' + expectedResult);
    failed++;
  }
}

// Try a good hand and a bad hand
runTest('Royal Flush', ['10S', 'js', 'KS', 'qS', 'AS'], null, 'royalflush');
runTest('Bad Input', ['LS', '12S'], null, 'error');
runTest('3-of-a-kind', ['10S', '10H', '2D', '6c', '10C'], null, '3ofakind');

// A-5 straight
runTest('A-5 Low Straight', ['5C', '2d', 'AC', '3S', '4H'], {aceCanBeLow: true}, 'straight');

// Four of a kind
runTest('Four of a kind', ['4C', '5D', '4D', '4H', '4S'], null, '4ofakind');
runTest('Three of a kind', ['Ks', 'kD', 'KC', '4c', '2h'], null, '3ofakind');

// Full house
runTest('Full House', ['3D', 'AC', '3S', 'AH', 'AS'], null, 'fullhouse');

// Two pair
runTest('Two pair', ['JD', '6S', '8S', '6D', 'Jc'], null, '2pair');

// One pair
runTest('Pair of queens', ['Qc', '10S', '9c', '8d', 'Qh'], null, 'pair');

// Junk hand
runTest('Junk hand', ['2d', '6S', 'Jh', 'qC', '10h'], null, 'nothing');

// Wild card tests
runTest('Four of a kind, twos are wild', ['4C', '2d', '4S', '4h', '10S'], {wildCards: ['2']}, '4ofakind');
runTest('Four of a kind, with a joker', ['4C', '2d', '4S', '4h', 'joker'], null, '4ofakind');
runTest('Straight Flush, one-eyed Jacks wild', ['2D', 'JH', '4D', '6D', 'JS'], {wildCards: ['JH', 'Js']}, 'straightflush');
runTest('Ace-high straight, 4s are wild', ['4c', 'As', 'Qd', 'Jc', 'Ks'], {wildCards: ['4']}, 'straight');
runTest('Ace-high straight, 10s are wild', ['10c', 'As', 'Qd', 'Jc', 'Ks'], {wildCards: ['10']}, 'straight');
runTest('Full house, 3s and 4s are wild', ['2C', '2D', '3s', '8c', '8d'], {wildCards: ['3', '4']}, 'fullhouse');
runTest('Pair, Kings are wild', ['3d', '9s', '5c', 'Qh', 'Ks'], {wildCards: ['K']}, 'pair');

// Min pair tests
runTest('Jacks or better', ['3d', 'jd', '9S', '2c', '8d', '5c', 'jh'], {minPair: 'j'}, 'minpair');
runTest('10s or better, Kings are wild', ['3d', '9s', '5c', 'Qh', 'Ks'], {wildCards: ['K'], minPair: '10'}, 'minpair');
runTest('Jacks or better, pair of 10s', ['3d', '10d', '10S', '2c', '9d'], {minPair: 'j'}, 'pair');

// 3-card hands
runTest('3 card trips', ['3S', '3d', '3c'], null, '3ofakind');
runTest('3 card straight', ['4d', '6h', '5s'], null, 'straight');
runTest('3 card straight - don\'t allow straight', ['4d', '6h', '5s'], {dontAllow: ['straight', 'flush']}, 'nothing');
runTest('3 card trips - don\'t allow flush', ['3d', '3h', '3s'], {dontAllow: ['straight', 'flush']}, '3ofakind');

// 7-card hands
runTest('Two pair', ['2d', '5h', '9S', '2c', '9d', '5c', 'jh'], null, '2pair');

// Final summary
console.log('\r\nRan ' + (succeeded + failed) + ' tests; ' + succeeded + ' passed and ' + failed + ' failed');
