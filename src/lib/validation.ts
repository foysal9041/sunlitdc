import { z } from "zod";

export const popStatusSchema = z.enum(["ACTIVE", "DISABLED"]);

export const popInputSchema = z.object({
  district: z.string().trim().min(2).max(60),
  generalArea: z.string().trim().min(2).max(80),
  status: popStatusSchema.default("ACTIVE"),
  name: z.string().trim().max(120).optional().nullable(),
  btrcPopId: z.string().trim().max(60).optional().nullable(),
  exactAddress: z.string().trim().max(200).optional().nullable(),
  latitude: z.coerce.number().min(-90).max(90).optional().nullable(),
  longitude: z.coerce.number().min(-180).max(180).optional().nullable(),
  nttnProvider: z.string().trim().max(80).optional().nullable(),
  linkId: z.string().trim().max(60).optional().nullable(),
  vlan: z.string().trim().max(40).optional().nullable(),
  ipAddress: z.string().trim().max(60).optional().nullable(),
  oltInfo: z.string().trim().max(160).optional().nullable(),
  routerSwitchInfo: z.string().trim().max(160).optional().nullable(),
  internalCapacityMbps: z.coerce.number().int().min(0).max(1_000_000).optional().nullable(),
  topologyNotes: z.string().trim().max(2000).optional().nullable(),
});

export const popUpdateSchema = popInputSchema.partial();

export const loginSchema = z.object({
  email: z.string().trim().email().max(160),
  password: z.string().min(1).max(200),
});

export type PopInput = z.infer<typeof popInputSchema>;
export type PopUpdateInput = z.infer<typeof popUpdateSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
