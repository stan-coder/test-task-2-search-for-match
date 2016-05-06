'use strict';

class Similarity {

	constructor(input, patterns) {
		this.input = input;
		this.patterns = patterns;
		this.matchList = {
			1: {
				input: 'another',
				patterns: ['anoother', 'azother']
			}
		};
	}

	init() {
		this.splitDataOnBlocks();
		this.splittedInput.forEach((input, key) => {
			this.compare(input, key)
		});
	}

	compare(input, keyInput) {
		/**
		 * Max. acceptable count of words coincidental on pattern
		 */
		var maxCoPattern = Math.floor(input.length / 2.661);

		/**
		 * Max. acceptable count of words that is allowed to absent in a sentence
		 * or do not math with pattern
		 */
		var maxAbsent = Math.floor(maxCoPattern / 2);

		this.splittedPatterns.forEach((pattern) => {

			function* Gen(scope) {
				yield !scope.exposeBasicLength(maxAbsent, input.length, pattern.length);

				console.log([input, pattern]);
				yield false;
			}

			for (let value of Gen(this)) {
				if (value) {
					return;
				}
			}
		});
	}

	exposeBasicLength(maxAbsent, i, p) {
		return p <= i && p >= (i - maxAbsent);
	}

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