'use strict';

class Similarity {

	/**
	 * Basic preparation
	 */
	constructor(input, patterns) {
		this.input = input;
		this.patterns = patterns;
		this.matchList = {};

		this.excessMaxCo = 0;
		this.exposeMethods = ['DifferentSymbols', 'Reduplication', 'AbsenceSymbols'];
	}


	/**
	 * Starting class
	 */
	init() {
		this.splitDataOnBlocks();
		this.splittedInput.forEach((input, key) => {
			this.compare(input, key)
		});

		/**
		 * We need to regularize keys of gotten object
		 */
		var maxKey = Math.max.apply(null, Object.keys(this.matchList).map(e => +e));
		return Array.prototype.filter.call((this.matchList.length = maxKey + 1, this.matchList), e => e);
	}


	/**
	 * Primary method to compare input with pattern
	 */
	compare(input, keyInput) {
		/**
		 * Max. acceptable count of words coincidental on pattern
		 */
		this.maxCoPattern = Math.floor(input.length / 2.661);

		/**
		 * Pluck array of splitted patterns
		 */
		this.splittedPatterns.forEach((pattern, keyPattern) => {

			// Temporary variables
			var escape = false;
			var countAllowableMatch = 0;

			/**
			 * Use generator to obtain laconic code
			 */
			function* Gen(scope) {
				yield input.length !== pattern.length;

				/**
				 * Make compare each word of input with patterns
				 */
				input.forEach((inputWord, key) => {
					var patternWord = pattern[key];
					if (Object.is(patternWord, inputWord) || escape) return;

					var isMatch = scope.exposeMethods.some(method => {
						return scope['expose' + method](inputWord, patternWord);
					});

					if ((countAllowableMatch += (isMatch ? 1 : 2)) > scope.maxCoPattern) {
						escape = true;
					}
				});

				// If escape == true then given pattern do not match with input
				yield escape;

				scope.addPatternToMatch(
					scope.input[keyInput], scope.patterns[keyPattern], keyInput
				);
			}

			/**
			 * Go generator's events
			 */
			for (let value of Gen(this)) {
				if (value) {
					return;
				}
			}
		});
	}

	/**
	 * Add found pattern to array of input
	 */
	addPatternToMatch(i, p, keyInput) {

		if (!this.matchList.hasOwnProperty(keyInput)) {
			this.matchList[keyInput] = {
				input: i,
				patterns: []
			};
		}		
		this.matchList[keyInput].patterns.push(p);
	}


	/**
	 * Reveal whether two words match differing only several symbols
	 */
	exposeDifferentSymbols(i, p) {
		if (i.length !== p.length) return false;

		// Max. mismatch symbols
	 	var maxMS = Math.ceil(i.length / 10);

		var res = i
			.split('')
			.filter((symbol, key) => Object.is(symbol, p[key]))
			.length;

		return res <= p.length && res >= (i.length - maxMS);
	}

	/**
	 * Sometimes pattern can consists from repeating symbols
	 */
	exposeReduplication(i, p) {
		if (i.length === p.length) return false;

		var splitedI = i.split('');
		var splitedP = p.split('');
		var indicator = false;
		var moreThen = 0;
		var catchedSymbol = null;
		var res = 	
		
		splitedP
			.reduce((prev, curr, key) => {
				if (prev === 0) prev = '';

				if (curr == splitedI[key - moreThen] && !indicator) {
					prev += curr;
				} 
				else {
					if (!indicator) {
						catchedSymbol = curr;
						moreThen++;
						indicator = true;
					}
					else {
						if (curr === catchedSymbol) moreThen++;
						else {
							indicator = false;
							prev += curr;
						}
					}
				}

				return prev;
			}, 0);

		return Object.is(res, i);
	}


	/**
	 * Find out the fact of absence at least one symbol between two indeed identical words
	 */
	exposeAbsenceSymbols(i, p) {
		
		// Max. absent symbols
	 	var maxAS = Math.ceil(i.length / 10);

	 	if (i.length < 3 || i.length > (p.length + maxAS) || i.length <= p.length) {
	 		return false;
	 	}

		var res = i.split('').filter(function(symbol, key) {				
				if (symbol === p[key - this.indent]) {
					return true;
				}
				else {
					this.indent++;
				}
			}, {indent: 0});

		return Object.is(res.join(''), p);
	}


	/**
	 * Split strings of input and pattern on array representation
	 */
	splitDataOnBlocks() {
		['Input', 'Patterns'].forEach((elem) => {
			var propName = 'splitted' + elem;
			this[propName] = [];

			this[elem.toLowerCase()].forEach((string) => {
				var blocks = string.split(/[^\da-z\-_]/i).filter(el => el.length);
				if (blocks.length > 0) {
					this[propName].push(blocks);
				}
			});
		});
	}
}

module.exports = Similarity;