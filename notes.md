- A chatbot with the ability to answer question specific to a company
- if it does not know the answer rather than hallucinate, it will advice user to email or phone
- to avoid jibberish, Add the ' ->' separator to the end of our prompt as it is added to conversationStr.Add a whitespace before the prompt.
- stop_sequence: to tell the model where the completion ends, it is an array, so we can add multiple stop sequences, the completion will not contain the stop sequence, usually use new line character as stop sequence. Add the newline character '\n' and separator '->' as a stop sequence.
- about n_epochs: the number of epochs to train for, the more epochs the better the model will be, but it will take longer to train and more cost. 3-5 epochs is a good starting point. it defaults to 4. set epochs higher to avoid hallucination.
- about cross domain request to serverless function

```
When making fetch requests from a browser, there are restrictions on cross-origin requests for security reasons. By default, browsers enforce the same-origin policy, which means that a fetch request can only be made to the same domain from which the code was served.

In the case of serverless functions, the URL you see in the frontend code points to the serverless function hosted on a different domain or subdomain. Therefore, if the serverless function is properly configured, it should only accept requests from trusted sources, such as your frontend code or specific domains that you have allowed access to.

By setting appropriate CORS (Cross-Origin Resource Sharing) headers on your serverless function, you can control which domains are allowed to make cross-origin requests to it. You can specify specific domains or use wildcard configurations to limit access.

In summary, as long as you have properly configured CORS settings on your serverless function and only allowed trusted domains to make requests, potential abuse from unauthorized sources should be mitigated.
```

## Data

1. get data: as much as possible in JSON/CSV format

   - get data for fine-tuning, advise by openAI: provide at least a few hundreds high-quality examples, ideally vetted by human experts, increasing the number of examples will increase the quality of the model performance
   - [JSONL format](https://jsonlines.org/) format: each line is a JSON object, each line is a training example

2. prep data: use OpenAI's CLI tool to process data to make sure it is in the right format

   - format of our data: each prompt should end with a separator to show where the prompt ends and the completion begins; each completion should start with a whitespace; each completion should end with a stop sequence to inform the model where the completion ends. use OpenAI tool to do the formatting
   - install OpenAI CLI tool and set up API key
     (https://platform.openai.com/docs/guides/fine-tuning)

     ```bash
     pip install openai
     EXPORT OPENAI_API_KEY=<your key>
     openai tools fine_tunes.prepare_data -f <LOCAL_FILE> # to convert to JSONL format


     openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL> --n_epochs 16 # to create a new fine-tuning model
      openai api fine_tunes.follow -i <TRAIN_FILE_ID_OR_PATH> -t # to follow the progress of the fine-tuning model
     ```

3. upload data: to upload our data to OpenAI and start fine-tune
4. code: adjust our code to use the new model

## Deployment

- keep API key secret, send request to Netlify servless function who has access to API key in secure store, then send request to OpenAI API. otherwise API key will be exposed to the public by devtools under network tab in request header.
- To install the Netlify cli
  `npm install netlify-cli -g`

- To initialise a netlify site
  `netlify init`
- create netlify serverless function
  `netlify functions:create <function name>`
- The url of your serverless function
  https://<YOUR-SITE-URL>.netlify.app/.netlify/functions/fetchAI
