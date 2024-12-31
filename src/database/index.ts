import { PrismaClient } from "@prisma/client";

export const database = new PrismaClient();

database.snippet.create({
  data: {
    title: "Title!",
    code: "const abs = () => {}",
  },
});
