import { connectDB } from "@/lib/config/db";



const loadDb =  async () => {
    // connect to your database 
    await connectDB();

}
export async function POST(request) {

const formData  = await request.formData();

const emailData = {

    email: formData.get('email')

}

}