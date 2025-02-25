import { AIModels } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

interface ReqbodyProps {
    context: string, 
    modelName: "llama" | "deepseek", 
    prompt: string
}

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY as string
})

export async function POST(req: NextRequest){

    const {context, modelName, prompt}: ReqbodyProps = await req.json();

    const completePrompt = `You will act as a dual-mode AI. First, provide an answer to the following question, solely based on the provided context. Do not use any external knowledge or make any assumptions beyond what is explicitly stated in the text. 
    
    If the context does not provide the answer to question, then just say, "I'm sorry, I don't know the answer to that question, the document doesn't provide enough relevant information to that question". 
    
    Then, separately, and formatted differently, provide a comprehensive answer to the same question, drawing on your general knowledge, intelligence, understanding of the world and ability to reason. Include detailed explanations, relevant background information, and any potential nuances or complexities that are not addressed in the context. 
    
    
    Provide answers in proper HTML format. The generated HTML should be semantic, accessible (consider ARIA attributes where necessary), well-formatted, and should adhere to current HTML5 standards.
    
    Clearly mention which answer is context-based and which is knowledge-based in <h2></h2> tag.

    START CONTEXT BLOCK
        ${context}
    END OF CONTEXT BLOCK

    QUESTION : ${prompt}
    `

    const model = AIModels.find((item) => item.value === modelName)?.model

    
    const completion = await openai.chat.completions.create({
        model: model ? model : "deepseek/deepseek-r1-distill-llama-70b:free",
        messages: [ 
        {
            role: "user",
            content: completePrompt
        }]
    })

    return NextResponse.json({data: completion.choices[0].message.content});
    
}