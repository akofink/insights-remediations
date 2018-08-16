'use strict';

const _ = require('lodash');
const errors = require('../../errors');
const config = require('../../config');

const HANDLERS = _([
    require('./AdvisorHandler'),
    require('./ComplianceHandler'),
    require('./VulnerabilityHandler'),
    require('./TestHandler')
]).keyBy(handler => handler.application)
.pickBy((value, key) => config.env !== 'production' || key !== 'test') // disable test handler in prod
.value();

exports.createPlay = async function (issue) {
    if (issue.id.app in HANDLERS) {
        return await HANDLERS[issue.id.app].createPlay(issue);
    }

    throw errors.unknownIssue(issue);
};