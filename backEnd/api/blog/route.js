const { NextResponse } = require("next/server");

export async function GET(request){

console.log("blog get hit");
return  NextResponse.json({message:"API working"});


}