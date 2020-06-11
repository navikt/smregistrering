import * as iots from 'io-ts';

export const RuleHit = iots.type({
    messageForSender: iots.string,
    messageForUser: iots.string,
    ruleName: iots.string,
    ruleStatus: iots.string,
});
export type RuleHit = iots.TypeOf<typeof RuleHit>;

export const RuleHitErrors = iots.type({
    status: iots.string,
    ruleHits: iots.array(RuleHit),
});
export type RuleHitErrors = iots.TypeOf<typeof RuleHitErrors>;
