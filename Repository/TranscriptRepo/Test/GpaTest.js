const transcript = require('../TranscriptRepo').classGradeConverter('A');
const assert = require('assert');

assert.equal(transcript, '4.0');

const transcriptB = require('../TranscriptRepo').classGradeConverter('A');

assert.equal(transcriptB, '3.0');

