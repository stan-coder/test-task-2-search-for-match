'use strict';

class Similarity {

	/**
	 * Basic preparation
	 */
	constructor(input, patterns) {
		this.input = input;
		this.patterns = patterns;
		this.matchList = {
			1: {
				input: 'another',
				patterns: ['anoother', 'azother']
			}
		};

		this.excessMaxCo = 0;
	}


	/**
	 * Starting class
	 */
	init() {
		this.splitDataOnBlocks();
		this.splittedInput.forEach((input, key) => {
			this.compare(input, key)
		});
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
		 * Max. acceptable count of words that is allowed to absent in a sentence
		 * or do not math with pattern
		 */
		this.maxAbsentWords = Math.floor(this.maxCoPattern / 2);




		this.splittedPatterns.forEach((pattern) => {

			// Temporary variables
			var escape = false;

			/**
			 * Use generator to obtain laconic code
			 */
			function* Gen(scope) {
				yield !scope.exposeBasicLength(input.length, pattern.length);

				/**
				 * Make compare each word of input with patterns
				 */
				input.forEach((inputWord, key) => {
					var patternWord = pattern[key];

					/**
					 * Expose input-word with appropriate pattern-word comparison
					 */
					if (Object.is(patternWord, inputWord)) return;

					//
				});

				// If escape == true, then given pattern do not match with input
				yield escape;

				console.log(input);
				yield false;
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
	 * Compare length of input and pattern 
	 * considering max. allowable count of absent words per sentence
	 */
	exposeBasicLength(i, p) {
		return p <= i && p >= (i - this.maxAbsentWords);
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
		//if (i.length === p.length) return false;

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