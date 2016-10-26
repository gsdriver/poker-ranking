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

const lib = require('../src/app');

var succeeded = 0;
var failed = 0;

function RunTest(testName, cards, options, expectedResult)
{
    const result = lib.EvaluateHand(cards, options);

    if (result == expectedResult)
    {
        console.log("SUCCESS: " + testName + " returned " + result);
        succeeded++;
    }
    else
    {
        console.log("FAIL: " + testName + " returned " + result + " rather than " + expectedResult);
        failed++;
    }
}

// Try a good hand and a bad hand
RunTest("Royal Flush", ["10S", "js", "KS", "qS", "AS"], null, "royalflush");
RunTest("Bad Input", ["LS", "12S"], null, "error");
RunTest("3-of-a-kind", ["10S", "10H", "2D", "6c", "10C"], null, "3ofakind");

// A-5 straight
RunTest("A-5 Low Straight", ["5C", "2d", "AC", "3S", "4H"], {aceCanBeLow: true}, "straight");

// Four of a kind
RunTest("Four of a kind", ["4C", "5D", "4D", "4H", "4S"], null, "4ofakind");
RunTest("Three of a kind", ["Ks", "kD", "KC", "4c", "2h"], null, "3ofakind");

// Full house
RunTest("Full House", ["3D", "AC", "3S", "AH", "AS"], null, "fullhouse");

// Two pair
RunTest("Two pair", ["JD", "6S", "8S", "6D", "Jc"], null, "2pair");

// One pair
RunTest("Pair of queens", ["Qc", "10S", "9c", "8d", "Qh"], null, "pair");

// Junk hand
RunTest("Junk hand", ["2d", "6S", "Jh", "qC", "10h"], null, "nothing");

// Wild card tests
RunTest("Four of a kind, twos are wild", ["4C", "2d", "4S", "4h", "10S"], {wildCards:["2"]}, "4ofakind");
RunTest("Straight Flush, one-eyed Jacks wild", ["2D", "JH", "4D", "6D", "JS"], {wildCards:["JH", "Js"]}, "straightflush");
RunTest("Ace-high straight, 4s are wild", ["4c", "As", "Qd", "Jc", "Ks"], {wildCards:["4"]}, "straight");
RunTest("Full house, 3s and 4s are wild", ["2C", "2D", "3s", "8c", "8d"], {wildCards:["3", "4"]}, "fullhouse");
RunTest("Pair, Kings are wild", ["3d", "9s", "5c", "Qh", "Ks"], {wildCards:["K"]}, "pair");

// 3-card hands
RunTest("3 card trips", ["3S", "3d", "3c"], null, "3ofakind");
RunTest("3 card straight", ["4d", "6h", "5s"], null, "straight");
RunTest("3 card straight - don't allow straight", ["4d", "6h", "5s"], {dontAllow:["straight", "flush"]}, "nothing");
RunTest("3 card trips - don't allow flush", ["3d", "3h", "3s"], {dontAllow:["straight", "flush"]}, "3ofakind");

// 7-card hands
RunTest("Two pair", ["2d", "5h", "9S", "2c", "9d", "5c", "jh"], null, "2pair");

// Final summary
console.log("\r\nRan " + (succeeded + failed) + " tests; " + succeeded + " passed and " + failed + " failed");