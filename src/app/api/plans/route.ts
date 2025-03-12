
/*
<ai_context>
File is responsible for providing CRUD operations for Workout Plans via Prisma.
</ai_context>
*/

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.workoutPlan.findMany();
    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch plans" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Hardcode userId=1 for now, or accept from client
    const { userId = 1, name, goals, equipment, frequency, duration } = data;

    const newPlan = await prisma.workoutPlan.create({
      data: {
        userId,
        name,
        goals,
        equipment,
        frequency,
        duration,
      },
    });

    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create plan" }, { status: 500 });
  }
}
