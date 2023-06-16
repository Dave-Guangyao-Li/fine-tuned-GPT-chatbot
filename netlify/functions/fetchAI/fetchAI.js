import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // will fetch from netlify env variable
})
// delete configuration.baseOptions.headers['User-Agent'];
const openai = new OpenAIApi(configuration)

const handler = async (event) => {
  try {
    const response = await openai.createCompletion({
      model: "davinci:ft-dave-gy-li-2023-06-16-07-11-13",
      prompt: event.body, //conversationStr is being sent from the client side in the body of the fetch request, we can access it here using event.body
      presence_penalty: 0,
      frequency_penalty: 0.3,
      max_tokens: 100,
      stop: ['\n', '->']
    })
    return {
      statusCode: 200,
      body: JSON.stringify({
        //a dd a key value pair. The key should be 'reply' and the value should be response.data.
        reply: response.data,
      }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler } // this means we can import this function in other files