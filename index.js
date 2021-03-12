const Benchmark = require("benchmark");
const ramdaFn = require("./ramda.js");
const mergeDeep = require("./ramda_merge_deep.js");
const repeat = require("ramda/src/repeat");
const flatten = require("ramda/src/flatten");
const vanillaFn = require("./vanilla.js");

const date = Date.now();
const inputBase = [
  {
    section: "sI0tVh",
    author: { first_name: "foo", last_name: "bar", id: "123" },
    content: "dawdawdaw",
    modified_at: date,
  },
  {
    section: "sI0tVh",
    author: { first_name: "foo", last_name: "bar", id: "123" },
    content: "also this",
    modified_at: date,
  },
  {
    section: "foosection",
    author: { first_name: "bert", last_name: "bar", id: "223" },
    content: "hi hi ih hi",
    modified_at: date,
  },
];

const input = flatten(repeat(inputBase, 5000));

const suite = new Benchmark.Suite();

suite
  .add("ramda", () => {
    ramdaFn(input);
  })
  .add("ramda merge deep", () => {
    mergeDeep(input);
  })
  .add("vanilla", () => {
    vanillaFn(input);
  })
  .on("cycle", function (event) {
    // https://stackoverflow.com/questions/28524653/what-do-the-results-from-benchmark-js-mean
    // https://stackoverflow.com/questions/32629779/define-number-of-cycles-benchmark-js
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`${this[0].name}:\t\t${this[0].stats.mean}`);
    console.log(`${this[1].name}:\t${this[1].stats.mean}`);
    console.log(`${this[2].name}:\t${this[2].stats.mean}`);
  })
  .run();
