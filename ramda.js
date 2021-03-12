const lensProp = require("ramda/src/lensProp");
const compose = require("ramda/src/compose");
const values = require("ramda/src/values");
const reduce = require("ramda/src/reduce");
const map = require("ramda/src/map");
const defaultTo = require("ramda/src/defaultTo");
const lensPath = require("ramda/src/lensPath");
const set = require("ramda/src/set");
const concat = require("ramda/src/concat");
const inc = require("ramda/src/inc");
const over = require("ramda/src/over");
const pipe = require("ramda/src/pipe");

const safeIncrement = pipe(defaultTo(0), inc);
const safeConcat = (xs) => pipe(defaultTo([]), concat([xs]));

const reducer = (object, { author: { id: currentId }, content, section }) => {
  const lenL = lensPath([section, "len"]);
  const userL = lensPath([section, "data", currentId]);
  const idL = compose(userL, lensProp("id"));
  const contentsL = compose(userL, lensProp("contents"));
  const headingL = compose(userL, lensProp("heading"));

  return pipe(
    over(lenL, safeIncrement),
    set(idL, currentId),
    over(contentsL, safeConcat(content)),
    set(headingL, "placeholder")
  )(object);
};

const ramdaFn = pipe(reduce(reducer, {}), map(over(lensProp("data"), values)));

module.exports = ramdaFn;
