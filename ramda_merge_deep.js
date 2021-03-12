const mergeDeepWithKey = require("ramda/src/mergeDeepWithKey");
const pipe = require("ramda/src/pipe");
const concat = require("ramda/src/concat");
const transduce = require("ramda/src/transduce");
const map = require("ramda/src/map");
const over = require("ramda/src/over");
const lensProp = require("ramda/src/lensProp");
const values = require("ramda/src/values");

const mapper = ({ author: { id: currentId }, content, section }) => ({
  [section]: {
    len: 1,
    data: {
      [currentId]: {
        heading: "placeholder",
        contents: [content],
        id: currentId,
      },
    },
  },
});

const merger = (key, left, right) => {
  switch (key) {
    case "len":
      return left + right;
    case "heading":
      return left;
    case "id":
      return left;
    case "contents":
      return concat(left, right);
  }
};

const ramdaFn = pipe(
  transduce(map(mapper), mergeDeepWithKey(merger), {}),
  map(over(lensProp("data"), values))
);

module.exports = ramdaFn;
