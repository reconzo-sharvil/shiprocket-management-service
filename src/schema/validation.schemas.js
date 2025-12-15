import { z } from "zod";

// Custom IP address validation regex
const ipAddressRegex =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Platform Schemas
export const createPlatformSchema = z.object({
  body: z.object({
    resource_name: z.string().min(1, "Resource name is required").trim(),
    auth_name: z.string().min(1, "Auth name is required").trim(),
    auth_url: z.string().url("Invalid auth URL format"),
    resource_url: z.string().url("Invalid resource URL format"),
  }),
});

export const updatePlatformSchema = z.object({
  body: z
    .object({
      resource_name: z.string().min(1).trim().optional(),
      auth_name: z.string().min(1).trim().optional(),
      auth_url: z.string().url("Invalid auth URL format").optional(),
      resource_url: z.string().url("Invalid resource URL format").optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
  params: z.object({
    resourceName: z.string().min(1, "Resource name is required").trim(),
  }),
});

export const platformParamsSchema = z.object({
  params: z.object({
    resourceName: z.string().min(1, "Resource name is required").trim(),
  }),
});

// Client Schemas
export const createClientSchema = z.object({
  body: z.object({
    client_id: z.string().trim().optional(),
    client_secret: z.string().trim().optional(),
    username: z.string().trim().optional(),
    password: z.string().trim().optional(),
    primary_key: z.string().trim().optional(),
    secondary_key: z.string().trim().optional(),
    account_id: z.string().trim().optional(),
    token_expires_at: z.string().trim().optional(),
    ip_address: z
      .string()
      .regex(ipAddressRegex, "Invalid IP address format")
      .optional()
      .or(z.literal("")),
  }),
  params: z.object({
    ownerName: z.string().min(1, "Owner name is required").trim(),
    resourceName: z.string().min(1, "Resource name is required").trim(),
  }),
});

export const updateClientSchema = z.object({
  body: z
    .object({
      client_id: z.string().trim().optional(),
      client_secret: z.string().trim().optional(),
      username: z.string().trim().optional(),
      password: z.string().trim().optional(),
      primary_key: z.string().trim().optional(),
      secondary_key: z.string().trim().optional(),
      account_id: z.string().trim().optional(),
      token_expires_at: z.string().trim().optional(),
      resource_name: z.string().trim().optional(),
      ip_address: z
        .string()
        .regex(ipAddressRegex, "Invalid IP address format")
        .optional()
        .or(z.literal("")),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
  params: z.object({
    ownerName: z.string().min(1, "Owner name is required").trim(),
    resourceName: z.string().min(1, "Resource name is required").trim(),
  }),
});

export const clientByOwnerSchema = z.object({
  params: z.object({
    ownerName: z.string().min(1, "Owner name is required").trim(),
  }),
});

export const clientByOwnerAndResourceSchema = z.object({
  params: z.object({
    ownerName: z.string().min(1, "Owner name is required").trim(),
    resourceName: z.string().min(1, "Resource name is required").trim(),
  }),
});

//Client Platform Mapping Schemas
export const mappingParamsSchema = z.object({
  params: z.object({
    ownerName: z.string().min(1, "Owner name is required").trim(),
    resourceName: z.string().min(1, "Resource name is required").trim(),
  }),
});

export const mappingOwnerSchema = z.object({
  params: z.object({
    ownerName: z.string().min(1, "Owner name is required").trim(),
  }),
});
