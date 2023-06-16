import { Configuration, OpenAIApi } from 'openai'
// import { process } from './env'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration)

const chatbotConversation = document.getElementById('chatbot-conversation')

// const conversationArr = [
//     {
//         role: 'system',
//         content: 'You are a highly knowledgeable assistant that keeps its answers short.'
//     }
// ] 

let conversationStr = ""

document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')
    // conversationArr.push({
    //     role: 'user',
    //     content: userInput.value
    // })
    conversationStr += ` ${userInput.value} ->` // need to explicitly add separator. -> indicate the end of the prompt
    fetchReply()
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
})






async function fetchReply() {
    const response = await openai.createCompletion({
        model: process.env.FINETUNED_MODEL,
        prompt: conversationStr,
        presence_penalty: 0,
        frequency_penalty: 0.3,
        max_tokens: 100,
        stop: ['\n', '->']
    })
    console.log(response.data)
    // conversationArr.push(response.data.choices[0].message)
    // renderTypewriterText(response.data.choices[0].message.content)
    conversationStr += ` ${response.data.choices[0].text} \n` // \n indicate the end of the response completion
    renderTypewriterText(response.data.choices[0].text)
}

function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i - 1, i)
        if (text.length === i) {
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    }, 50)
}