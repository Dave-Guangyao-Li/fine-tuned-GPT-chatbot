// import { Configuration, OpenAIApi } from 'openai'
// // import { process } from './env'

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })
// // delete configuration.baseOptions.headers['User-Agent'];
// const openai = new OpenAIApi(configuration)

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





// 1. Make a fetch request to the url using the 
// following details. 
// - The method should be 'POST'
// - In the headers, the 'content-type' should 
//   be 'text/plain'
// - The body should hold conversationStr
// 2. Save the response to a const and log it out. 
// 3. Copy and paste the updated fetchReply function 
// to VS Code and delete any unnecessary code from 
// index.js
// 4. Push the changes to GitHub to trigger a
// redeploy.
// 5. Navigate to your Netlify site, hit send 
// and see what you get in the console. (You 
// should see "Hello World" in an object).
async function fetchReply() {
    const url = "https://magenta-naiad-ffe3de.netlify.app/.netlify/functions/fetchAI"; // serverless function url 
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'text/plain'
        },
        body: conversationStr
    })
    const data = await response.json() // convert the response to json
    // const response = await openai.createCompletion({
    //     model: "davinci:ft-dave-gy-li-2023-06-16-07-11-13",
    //     prompt: conversationStr,
    //     presence_penalty: 0,
    //     frequency_penalty: 0.3,
    //     max_tokens: 100,
    //     stop: ['\n', '->']
    // })
    console.log(data)
    // conversationArr.push(response.data.choices[0].message)
    // renderTypewriterText(response.data.choices[0].message.content)
    conversationStr += ` ${data.reply.choices[0].text} \n` // \n indicate the end of the response completion
    renderTypewriterText(data.reply.choices[0].text)
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