/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

export const RuleHit = z.object({
    messageForSender: z.string(),
    messageForUser: z.string(),
    ruleName: z.string(),
    ruleStatus: z.string(),
})
export type RuleHit = z.infer<typeof RuleHit>

export const RuleHitErrors = z.object({
    status: z.string(),
    ruleHits: z.array(RuleHit),
})
export type RuleHitErrors = z.infer<typeof RuleHitErrors>
