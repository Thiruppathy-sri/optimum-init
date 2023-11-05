import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/users";

const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const users = await res.json();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const { name, salary, age, profileImage }: any = request;
    console.log(request, "request0987");
    if (!name || !salary || !age) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    const res = await fetch(DATA_SOURCE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-Key": API_KEY,
      },
      body: JSON.stringify({
        name,
        salary,
        age,
        profileImage,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ message: "Data successfully posted" });
    } else {
      return NextResponse.json(
        { message: "Failed to post data" },
        { status: res.status }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: `${error} Internal server error` },
      { status: 500 }
    );
  }
}
