import { PrismaClient } from "@prisma/client";
import { IEvent } from "./types";
import { ErrorBase } from "@/utils/ErrorHandler";

const prisma = new PrismaClient();

export async function getAll() {
  const events = await prisma.event.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });

  return events;
}

export async function create(event: IEvent) {
  try {
    const create = await prisma.event.create({
      data: {
        ...event,
      },
    });

    return create;
  } catch (err) {
    throw new ErrorBase({
      errors: ["Error on create Event"],
      message: "Error",
    });
  }
}

export async function edit(id: IEvent["id"], event: Omit<Event, "id">) {
  try {
    const eventUpdate = await prisma.event.update({
      where: {
        id,
      },
      data: {
        ...event,
      },
    });

    return eventUpdate;
  } catch (err) {
    throw new ErrorBase({
      errors: ["Error on edit Event"],
      message: "Error",
    });
  }
}

export async function destroy(id: IEvent["id"]) {
  try {
    await prisma.event.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    throw new ErrorBase({
      errors: ["Error on delete Event"],
      message: "Error",
    });
  }
}
