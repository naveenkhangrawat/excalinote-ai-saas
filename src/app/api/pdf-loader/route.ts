import { NextRequest, NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";



export async function GET(req: NextRequest){

    const searchParams = req.nextUrl.searchParams;
    const documentUrl = searchParams.get("documentUrl")

    // 1. Load the document
    const response = await fetch(documentUrl as string);
    const documentBlob = await response.blob();
    const loader = new WebPDFLoader(documentBlob);
    const docs =  await loader.load();

    let documentContent = "";
    docs.forEach((doc) => {
        documentContent = documentContent + doc.pageContent;
    })

    // 2. splitting text into small chunks (chunking)
    const splitter = new RecursiveCharacterTextSplitter();
    const output = await splitter.createDocuments([documentContent]);
    const textChunks = output.map((chunk) => chunk.pageContent);

    return NextResponse.json({data: textChunks, documentContent});
}