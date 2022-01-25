import { z } from 'zod';

const TokenSets = z.object({
    self: z.any().optional(),
    proxy: z.any().optional(),
    graph: z.any().optional(),
});

export const User = z.object({
    claims: z.any(),
    tokenSets: TokenSets,
});

export type User = z.infer<typeof User>;
