# poker-ranking
Evaluates a poker hand - can include options such as wild cards or whether Ace can act as a low card

# Usage

The exposed function from this library is `evaluateHand` which will return a string saying what the hand represents

```
evaluateHand(cards options)
```

The arguments to  `evaluateHand` are:

 * cards - an array of strings representing the hand.  Strings should be a 2 or 3 character string representing the rank 
            and suit (for example, '10S' for 10 of spades or 'QD' for Queen of diamonds).  The string can also be
            'joker' which represents a wild card (jokers are always wild and need not be specified in the wildCard array)
 * options - an array of options for evaluating the hand as noted below
 
The options structure is composed of the following fields with the following default values:

```
{
  aceCanBeLow:false,  // Whether Ace can be considered a low card in a straight
  wildCards:[],       // An array of strings representing wild cards.
                      // This can either be a rank (e.g. '2') to indicate
                      // all cards of a rank are wild, or specific cards
                      // (e.g. ['JH', 'JS'] to indicate one-eyed jacks)
  cardsToEvaluate:5,  // The number of cards to consider when evaluating the hand.
                      // Ignored if set more than 5 or number of cards in hand
  dontAllow:[],       // An array of hand types to ignore
                      // For example, to not consider a straight or flush for
                      // a 3-card hand, you would set this field to
                      // ['straight', 'flush', 'straightflush']
  minPair:undefined,  // A minimal value to consider for a pair
                      // If there is one pair and it meets or exceeds this
                      // minimum the return value will be `minpair`
                      // (e.g. set to 'J' for jacks or better)
}
```

The return value is one of the following strings, in order from highest-ranked to lowest-ranked hand:

 * `5ofakind`
 * `royalflush`
 * `straightflush`
 * `4ofakind`
 * `fullhouse`
 * `flush`
 * `straight`
 * `3ofakind`
 * `2pair`
 * `pair` (`minpair` if minpair option specified and pair meets or exceeds this)
 * `nothing`
