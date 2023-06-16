- A chatbot with the ability to answer question specific to a company
- if it does not know the answer rather than hallucinate, it will advice user to email or phone

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


     openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> -m <BASE_MODEL> # to create a new fine-tuning model
      openai api fine_tunes.follow -i <TRAIN_FILE_ID_OR_PATH> -t # to follow the progress of the fine-tuning model
     ```

3. upload data: to upload our data to OpenAI and start fine-tune
4. code: adjust our code to use the new model
