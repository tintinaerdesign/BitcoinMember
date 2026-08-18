import { NextResponse } from "next/server";

const ALLOWED_HEADERS = "Authorization, Content-Type, x-api-key";
const ALLOWED_METHODS = "GET, POST, OPTIONS";

export function withMobileCors(response: NextResponse) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS);
    response.headers.set("Access-Control-Allow-Methods", ALLOWED_METHODS);
    return response;
}

export function mobileCorsPreflight() {
    return withMobileCors(new NextResponse(null, { status: 204 }));
}
