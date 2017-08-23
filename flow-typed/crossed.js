/**
 * A single char of a word
 * @typedef {String} Letter
 */
// prettier-ignore
declare type Letter = 'A' | 'B'
  | 'C' | 'D' | 'E' | 'F' | 'G'
  | 'H' | 'I' | 'J' | 'K' | 'L'
  | 'M' | 'N' | 'O' | 'P' | 'Q'
  | 'R' | 'S' | 'T' | 'U' | 'V'
  | 'W' | 'X' | 'Y' | 'Z';

/**
 * A single char of a guess, allowing ' ' for blank
 * @typedef {String} Guess
 */
declare type Guess = Letter | " "

/**
 * A tuple representing a location on the grid
 * @type {Array}
 */
declare type Pos = [number, number]

/**
 * A string representation of a pos for keying in a pos
 * PosKey === Pos.join(',')
 * @typedef {String} PosKey
 */
declare type PosKey = string

/**
 * A set containing all the wall locations for a puzzle
 * @typedef {Set} Walls
 */
declare type Walls = Array<PosKey>

/**
 * A number corresponding to a Word
 * @typedef {Number} HintKey
 */
declare type WordKey = number

/**
 * A map of locKeys to hintKeys
 * @typedef {Map} WordKeys
 */
declare type WordKeyMap = {
  [posKey: PosKey]: WordKey,
}

/**
 * A hint and answer combination with the key included
 * @typedef {Object} Word
 */
declare type Word = {|
  key: WordKey,
  hint: string,
  answer: Array<Letter>,
|}

/**
 * A set of words searchable by key
 * @typedef {Map} WordMap
 */
declare type WordMap = {
  [wordKey: WordKey]: Word,
}

/**
 * All words in a puzzle, associated by their direction
 * @typedef {Object} PuzzleWords
 * @property {WordMap} down
 * @property {WordMap} across
 */
declare type PuzzleWords = {|
  down: WordMap,
  across: WordMap,
|}

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
declare type Puzzle = {|
  title: string,
  author: string,
  publisher: string,
  published: Date,
  size: [number, number],
  walls: Walls,
  keys: WordKeyMap,
  words: PuzzleWords,
|}

/**
 * An object containing changable properties of a cell
 * @typedef {Object} CellState
 * @property {Guess} guess - The guessed (and rendered) letter in the cell
 * @property {Number} guessCount - The amount of guesses made on this cell
 */
declare type CellState = {|
  guess: Guess,
  guessCount: number,
|}

/**
 * An object representing selected location on a puzzle
 * @typedef {Object} Cursor
 * @property {Pos} focus
 * @property {string} direction
 */
declare type Cursor = {|
  focus: Pos,
  direction: "DOWN" | "ACROSS",
|}

/**
 * [PuzzleSource description]
 * @type {[type]}
 */
declare type PuzzleSource = (Date) => Array<Puzzle>
