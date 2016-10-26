# pokerhand
Evaluates a poker hand - can include options such as wild cards or whether Ace can act as a low card

{aceCanBeLow:false, wildCards:[], cardsToEvaluate:5, dontAllow:[]}; 

# Usage

The exposed function from this library is `EvaluateHand` which will return a string saying what the hand represents

```
EvaluateHand(cards options)
```

The arguments to  `EvaluateHand` are:

 * cards - an array of strings representing the hand.  Strings should be a 2 or 3 character string representing the rank 
            and suit (for example, "10S" for 10 of spades or "QD" for Queen of diamonds)
 * options - an array of options for evaluating the hand as noted below
 
The options structure is composed of the following fields with the following default values:

```
{
    aceCanBeLow:false,   // Whether Ace can be considered as a low card in a straight
    wildCards:[],        // An array of strings representing wild cards.  This can either be a rank
                         //   (e.g. "2") to indicate all cards of a rank are wild, or specific cards
                         //   (e.g. ["JH", "JS"] to indicate the one-eyed jacks - jack of hearts and spades)
    cardsToEvaluate:5,   // The number of cards to consider when evaluating the hand.  If set greater than 5
                         //   or more than the number of cards passed in, only 5 (or the number of cards in
                         //   the hand) will be used and this field will be ignored
    dontAllow:[]         // An array of hand types that sholud be ignored - for example, if you want a 3-card
                         //   hand to be evaluated but don't want it to be considered a straight or flush, you
                         //   would set this field to ["straight", "flush", "straightflush"]
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
 * `pair`
 * `nothing`
