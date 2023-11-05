import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/users";

const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`);

  const user = await res.json();

  if (!user.id) return NextResponse.json({ message: "User not found" });

  return NextResponse.json(user);
}
export async function PUT(request: Request) {
  try {
    const { name, salary, age, profileImage }: any = request;
    const id = request.url.slice(request.url.lastIndexOf("/") + 1);

    if (!name || !salary || !age) {
      return NextResponse.json({ message: "Missing required data" });
    }
    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
      method: "PUT",
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
      return NextResponse.json({ message: "Data successfully Updated" });
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
export async function DELETE(request: any) {
  const { id } = request;

  if (!id) return NextResponse.json({ message: "User id required" });

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
  });

  return NextResponse.json({ message: `User ${id} deleted` });
}
