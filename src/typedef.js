/**
 * A single char of a word
 * @typedef {String} Letter
 */
type Letter = 'A' | 'B' | 'C'
| 'D' | 'E' | 'F' | 'G' | 'H'
| 'I' | 'J' | 'K' | 'L' | 'M'
| 'N' | 'O' | 'P' | 'Q' | 'R'
| 'S' | 'T' | 'U' | 'V' | 'W'
| 'X' | 'Y' | 'Z';

/**
 * A single char of a guess, allowing ' ' for blank
 * @typedef {String} Guess
 */
type Guess = Letter | ' ';

/**
 * A tuple representing a location on the grid
 * @type {Array}
 */
type Pos = [number, number];

/**
 * A string representation of a pos for keying in a pos
 * PosKey === Pos.join(',')
 * @typedef {String} PosKey
 */
type PosKey = string;

/**
 * A set containing all the wall locations for a puzzle
 * @typedef {Set} Walls
 */
type Walls = Set<PosKey>;

/**
 * A number corresponding to a Word
 * @typedef {Number} HintKey
 */
type WordKey = number;

/**
 * A map of locKeys to hintKeys
 * @typedef {Map} WordKeys
 */
type WordKeyMap = Map<PosKey, WordKey>;

/**
 * A hint and answer combination with the key included
 * @typedef {Object} Word
 */
type Word = {|
	key: WordKey,
	hint: string,
	answer: Array<Letter>,
|};

/**
 * A set of words searchable by key
 * @typedef {Map} WordMap
 */
type WordMap = Map<WordKey, Word>;

/**
 * All words in a puzzle, associated by their direction
 * @typedef {Object} PuzzleWords
 * @property {WordMap} down
 * @property {WordMap} across
 */
type PuzzleWords = {|
	down: WordMap,
	across: WordMap,
|};

/**
 * An object containing all data about a single puzzle
 * @typedef {Object} Puzzle
 * @property {String} title - User friendly title of puzzle
 * @property {String} author - Original creator of puzzle
 * @property {String} publisher - Group responsable for publishing puzzle
 * @property {Date} published - A date object representing the day of publish
 * @property {Array} size - A tuple descibing width, height of the puzzle
 * @property {Walls} walls
 * @property {WordKeyMap} keys
 * @property {PuzzleWords} words
 */
type Puzzle = {|
	title: string,
	author: string,
	publisher: string,
	published: date,
	size: [number, number],
	walls: Walls,
  keys: WordKeyMap,
	words: PuzzleWords,
|};

const monthPuzzle = (month, startIdx, length) => {
	const wallsAndKeys = (i = 0, walls = [], keys = {}) => {
		const x = i % 7;
		const y = Math.floor(i / 7);
		const posKey = `${x},${y}`;

		if (x === 0 && y * 7 >= startIdx + length) { return { walls, keys }; }

		return (i - startIdx < 0 || length <= i - startIdx)
			? wallsAndKeys(i + 1, [...walls, posKey], keys)
			: wallsAndKeys(i + 1, walls, Object.assign({}, keys, { [posKey]: i - startIdx + 1 }));
	};

	const { walls, keys } = wallsAndKeys();

	return {
		title: month,
		author: 'Tyler Torola',
		publisher: 'TJT.Codes',
		published: new Date(),
		size: [7, Math.ceil((startIdx + length) / 7)],
		walls,
		keys,
	};
}

/**
 * An object containing changable properties of a cell
 * @typedef {Object} CellState
 * @property {Guess} guess - The guessed (and rendered) letter in the cell
 * @property {Number} guessCount - The amount of guesses made on this cell
 */
type CellState = {|
	guess: Guess,
	guessCount: number,
|};

/**
 * An object representing selected location on a puzzle
 * @typedef {Object} Cursor
 * @property {Pos} focus
 * @property {string} direction
 */
type Cursor = {|
	focus: Pos,
	direction: 'DOWN' | 'ACROSS';
|};

/**
 * [PuzzleSource description]
 * @type {[type]}
 */
type PuzzleSource = Date => Array<Puzzle>;
