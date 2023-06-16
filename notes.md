- A chatbot with the ability to answer question specific to a company
- if it does not know the answer rather than hallucinate, it will advice user to email or phone
- to avoid jibberish, Add the ' ->' separator to the end of our prompt as it is added to conversationStr.Add a whitespace before the prompt.
- stop_sequence: to tell the model where the completion ends, it is an array, so we can add multiple stop sequences, the completion will not contain the stop sequence, usually use new line character as stop sequence. Add the newline character '\n' and separator '->' as a stop sequence.
- about n_epochs: the number of epochs to train for, the more epochs the better the model will be, but it will take longer to train and more cost. 3-5 epochs is a good starting point. it defaults to 4. set epochs higher to avoid hallucination.

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
