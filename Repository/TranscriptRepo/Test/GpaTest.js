const transcript = require('../TranscriptRepo').classGradeConverter('A');
const assert = require('assert');

assert.equal(transcript, '4.0');

const transcriptB = require('../TranscriptRepo').classGradeConverter('B');

assert.equal(transcriptB, '3.0');

const transcriptC = require('../TranscriptRepo').classGradeConverter('C');

assert.equal(transcriptC, '2.0');

const transcriptD = require('../TranscriptRepo').classGradeConverter('D');

assert.equal(transcriptD, '1.0');
