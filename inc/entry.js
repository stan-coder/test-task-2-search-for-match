'use strict';

class Entry {

	/**
	 * Beginning
	 */
	constructor(input, patterns) {
		this.input = input;
		this.patterns = patterns;
		this.matchList = [];
	}

	/**
	 * Initialize class
	 */
	init(mode) {

		this.input.forEach((inputSentence, keyInput) => {

			this.patterns.forEach((pattern) => {

				/**
				 * Make search on match
				 */
				if (this.checkMatch(mode, inputSentence, pattern)) {
					this.addPatternToMatch(keyInput, inputSentence, pattern);
				}
			});
		});

		return this.matchList.filter(e => e);
	}


	/**
	 * Checking on match
	 */
	checkMatch(mode, i, p) {
		return (mode === 1 ? 
			(Object.is(i, p)) :
			(i.search(p) > -1)
		);
	}


	/**
	 * Add found pattern to input
	 */
	addPatternToMatch(key, i, p) {
		this.matchList[key] =
			(this.matchList[key] !== undefined ? 
				(this.matchList[key].patterns.push(p), this.matchList[key]) :
				{input: i, patterns: [p]}
			);
	}
}

module.exports = Entry;