import {NextRequest, NextResponse} from "next/server";
import {Client} from "@notionhq/client";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    if (req.nextUrl.searchParams.get("id") === null) {
        return NextResponse.json({error: "No id provided"});
    }
    try {
        const id = req.nextUrl.searchParams.get("id") as string

        const notion = new Client({
            auth: cookies().get('tokenCode')?.value,
        })

        const response: any = await notion.databases.retrieve({
            database_id: id.trim().toString()
        }).catch((error) => {
            console.log(error)
        });
        // //this code for gets user retrieves and will be used in the future
        // notion.users.retrieve({ user_id: response.properties.Author.people }).then((user) => {
        //   console.log(user);
        // });

        const properties = response.properties;

        return NextResponse.json(await properties);
    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}

export async function PUT(req: NextRequest) {
    if (req.nextUrl.searchParams.get("id") === null) {
        return NextResponse.json({error: "No id provided"});
    }

    const body = await req.json();
    const properties = body.properties;

    try {
        const notion = new Client({
            auth: cookies().get('tokenCode')?.value,
        })

        const response: any = await notion.pages.create({
            parent: {
                database_id: req.nextUrl.searchParams.get("id") as string,
            },
            properties: properties,
        });

        return NextResponse.json(await response);
    } catch (error: any) {
        return NextResponse.json({error: error.message});
    }
}
