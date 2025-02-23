from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

# Azure AI credentials
endpoint = "https://models.inference.ai.azure.com"
model_name = "Llama-3.3-70B-Instruct"
token = os.environ["GITHUB_TOKEN"]

# Initialize chatbot client
client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

# Create Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Store user data (name memory)
user_name = None

# Function to generate chatbot response
def get_chatbot_response(user_input):
    global user_name
    
    # Detect if user introduces their name
    if "my name is" in user_input.lower():
        user_name = user_input.split("my name is")[-1].strip().capitalize()
        return f"Nice to meet you, {user_name}! I'm here to listen and support you."

    # Personalize messages with name if available
    display_name = user_name if user_name else "friend"

    response = client.complete(
        messages=[
            SystemMessage("You are called Serenity, a warm, friendly, and non-judgmental AI companion. Your goal is to provide comfort, listen actively, and offer soothing words. You validate emotions and encourage positivity. Avoid giving medical or professional advice."),
            UserMessage(f"{display_name}: {user_input}"),
        ],
        temperature=0.7,  # Slightly reduced for more focused responses
        top_p=0.9,
        max_tokens=100,  # Shorter responses
        model=model_name
    )

    return response.choices[0].message.content.strip()

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json.get('message')
    if user_input:
        response = get_chatbot_response(user_input)
        return jsonify({'response': response})
    return jsonify({'error': 'No message provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
