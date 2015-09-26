var main = require("../");

exports["test main"] = function(assert) {
    assert.strictEqual(20, main.genPass(20).length, "correct length");
    assert.strictEqual(16, main.genPass(16).length, "correct length");
    assert.strictEqual(1, main.genPass(1).length, "correct length");
    assert.strictEqual("", main.genPass(0), "zero length");
    assert.strictEqual("", main.genPass("string"), "zero length");
    assert.strictEqual("", main.genPass(NaN), "zero length");
    assert.strictEqual("", main.genPass("1"), "zero length");
};

require("sdk/test").run(exports);
