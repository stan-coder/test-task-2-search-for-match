'use strict';

class Similarity {

	constructor(input, patterns) {
		this.input = input;
		this.patterns = patterns;
	}

	init() {
		this.splitInputOnBlocks();
		this.patterns.forEach((pattern) => {

			this.splitedInput.forEach((blocks) => {

				var matchProbability = 0;
				console.log(blocks);
			});
		});
	}

	splitInputOnBlocks() {
		this.splitedInput = [];
		this.input.forEach((string) => {

			this.splitedInput.push(
				string.split(/[^\da-z]/i).filter(el => el.length)
			);
		});
	}
}

module.exports = Similarity;