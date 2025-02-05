import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";



const loadDb =  async () => {
    // connect to your database 
    await connectDB();

}

await loadDb();
export async function POST(request) {


const formData  = await request.formData();

const emailData = {

    email: formData.get('email')

}

await EmailModel.create(emailData);


return NextResponse.json({message:"Email added successfully"}, {status:200});

}


export async function GET(request) {

    await loadDb();

    const emails = await EmailModel.find({});

    return NextResponse.json({message:"All emails fetched successfully", emails:emails}, {status:200});

}


export async function DELETE(request) {
    await loadDb();

    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
        return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deletedEmail = await EmailModel.findByIdAndDelete(id);
    if (!deletedEmail) {
        return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Email deleted successfully" }, { status: 200 });
}


