# Finding match between string and pattern

In this application there are three mode to find out match between input-string and pattern.

Installation and running
```bash
$ npm install
$ npm start
```

## Description

First mode fairly easy: it finds full match.
Second mode find at least partial match.

And third mode include following features:
- 1) Each side (input-string and pattern) must has equal count of words.
- 2) There is 3 variety of matches: 
- a) If pattern includes 1 and more repeating excessive symbol
- b) One symbol can be absent in word, but if count of symbols exceeds value = 10 then count of allowable symbols increase on 1. This operation is cyclical.
- c) 1 and more symbols can be not match in word. Regularity of increase allowoble count of symbols based on rule written one point before.
- 3) Maximum count of matches between words per sentence ~37% computed from count of senten's words.