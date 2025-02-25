import { NextRequest, NextResponse } from "next/server"
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

interface ReqbodyProps {
    context: string, 
    prompt: string,
    documentUrl: string
}


export async function POST(req: NextRequest){

    const {context, prompt, documentUrl}: ReqbodyProps = await req.json();

    // const systemPrompt = `You will be provided with a context. First, answer the question based SOLELY on the information given in the context. Then, in a separate and distinct response, answer the same question with detailed explanation based on your intelligence, general knowledge and understanding of the world. You should clearly indicate the source of each answer. Finally, explain any discrepancies or differences between your answers and why they might exist.
    // START CONTEXT BLOCK
    //     ${context}
    // END OF CONTEXT BLOCK
    // `

    const systemPrompt = `You will act as a dual-mode AI. First, provide an answer to the following question, solely based on the provided context. Do not use any external knowledge or make any assumptions beyond what is explicitly stated in the text. 
    
    If the context does not provide the answer to question, then just say, "I'm sorry, I don't know the answer to that question, the document doesn't provide enough relevant information to that question". 
    
    Then, separately, and formatted differently, provide a comprehensive answer to the same question, drawing on your general knowledge, intelligence, understanding of the world and ability to reason. Include detailed explanations, relevant background information, and any potential nuances or complexities that are not addressed in the context.

    Provide answers in proper HTML format. The generated HTML should be semantic, accessible (consider ARIA attributes where necessary), well-formatted, and should adhere to current HTML5 standards.

    Clearly mention which answer is context-based and which is knowledge-based in <h2></h2> tag.
    
    START CONTEXT BLOCK
        ${context}
    END OF CONTEXT BLOCK
    `
    if(context !== ""){
        const {text} = await generateText({
            model: google("gemini-2.0-flash-lite-preview-02-05"),
            system: systemPrompt,
            prompt: prompt
        })
        
        return NextResponse.json({ data: text });
    }

    const {text} = await generateText({
        model: google("gemini-2.0-flash-lite-preview-02-05"),
        system: systemPrompt,
        messages: [
            {
                role: "user",
                content: [
                    {type: "text", text: prompt},
                    {type: "file", mimeType: "application/pdf", data: documentUrl}
                ]
            }
        ]
    })

    return NextResponse.json({ data: text });

}