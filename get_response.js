const axios = require('axios');


exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }


  const { message } = JSON.parse(event.body);


  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: message,
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        }
      }
    );


    return {
      statusCode: 200,
      body: JSON.stringify({ response: response.data.choices[0].text.trim() })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }
};