import { NextRequest, NextResponse } from "next/server";
import { ErrorBase } from "@/utils/ErrorHandler";

import { create, getAll, destroy, edit } from "@/domain/event/actions";

import { z } from "zod";

export const revalidate = 0;

const schema = z.object({
  name: z.string(),
  date: z.coerce.date(),
  description: z.string(),
});

const validateSchema = (data: JSON) => {
  const validate = schema.safeParse(data);

  if (!validate.success) {
    const { errors } = validate.error;

    return NextResponse.json(
      new ErrorBase({ errors, message: "Invalid Request!" }),
      { status: 400 }
    );
  }

  return true;
};

export async function GET() {
  const allEvents = await getAll();

  return NextResponse.json(allEvents);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (validateSchema(data)) {
    const eventCreated = await create(data);

    return NextResponse.json(eventCreated, { status: 201 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const id = body.id;

  if (!id) {
    return NextResponse.json(
      new ErrorBase({ errors: ["id is missing"], message: "Invalid Request!" }),
      { status: 400 }
    );
  }

  await destroy(body.id);

  return NextResponse.json({ message: "Ok" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const id = body.id;

  if (!id) {
    return NextResponse.json(
      new ErrorBase({ errors: ["id is missing"], message: "Invalid Request!" }),
      { status: 400 }
    );
  }

  if (validateSchema(body)) {
    const { id, ...rest } = body;

    const response = await edit(id, rest);

    return NextResponse.json(response, { status: 200 });
  }
}
