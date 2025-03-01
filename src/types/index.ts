import type { Cliente } from "@prisma/client";

export type RequestUser = Pick<Cliente, "nombre" | "id">;
