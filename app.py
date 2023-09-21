from flask import Flask, request, jsonify
import openai


# Initialize Flask app
app = Flask(__name__)


# Set up OpenAI API key
openai.api_key = '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'


@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json.get('message')
    response = openai.Completion.create(
      model="text-davinci-002",
      prompt=user_message,
      max_tokens=150
    )
    return jsonify(response=response.choices[0].text.strip())


if __name__ == '__main__':
    app.run(debug=True)
