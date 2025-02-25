import axios from "axios";


const debounce = () => {
    let timeOutId: any;
    return function(cb: () => void, delay: number) {
        if(timeOutId){
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(cb, delay);

    }
}

export const saveOnDelay = debounce();


export const getGeminiResponse = async (
    {context, prompt, documentUrl}: {context: string, prompt: string, documentUrl: string}
) => {
    const response = await axios.post('/api/chat/gemini', {
        context, 
        prompt, 
        documentUrl
    })

    return response.data.data;
}

export const getOtherModelResponse = async (
    {context, prompt, modelName}: {context: string, prompt: string, modelName: string}
) => {
    const response = await axios.post('/api/chat/open-router', {
        context, 
        prompt, 
        modelName
    })

    return response.data.data;
}


export const isSubscriptionCanceled = async (
    {stripeSubscriptionId, isSubscribed} : {stripeSubscriptionId: string , isSubscribed: boolean}
) => {
    const res = await axios.get(`/api/subscription?isSubscribed=${isSubscribed}&stripeSubscriptionId=${stripeSubscriptionId}`)

    const isCanceled = res.data.data;
    return isCanceled;
}