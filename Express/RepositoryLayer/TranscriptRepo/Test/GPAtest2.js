const assert = require('assert');

const transcript = require('../TranscriptRepo').gradePointAverage(['A']);
assert.equal(transcript, 4.0);


const transcript1 = require('../TranscriptRepo').gradePointAverage(['A', 'B']);
assert.equal(transcript1, 3.5);


const transcript2 = require('../TranscriptRepo').gradePointAverage(['A', 'B', 'B-', 'C']);
assert.equal(transcript2, 2.915);


const transcript4 = require('../TranscriptRepo').gradePointAverage(['A', 'B', 'C', 'B+', 'B-']);
assert.equal(transcript4, 2.998);


const transcript5 = require('../TranscriptRepo').gradePointAverage(['A-', 'B-', 'C+', 'B+', 'B', 'C']);
assert.equal(transcript5, 2.83);

const transcript6 = require('../TranscriptRepo').gradePointAverage(['A', 'B-', 'C-', 'B', 'B', 'C+', 'B+', 'A-', 'A']);
assert.equal(transcript6, 3.0711111111111107);
