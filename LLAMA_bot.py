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
            SystemMessage("You are called Serenity AI, a warm, friendly, and non-judgmental AI companion. Your goal is to provide comfort, listen actively, and offer soothing words. You validate emotions and encourage positivity. Avoid giving medical or professional advice."),
            UserMessage(f"{display_name}: {user_input}"),
        ],
        temperature=0.7,  # Slightly reduced for more focused responses
        top_p=0.9,
        max_tokens=150,  # Shorter responses
        model=model_name
    )

    return response.choices[0].message.content.strip()

# Chatbot loop
print("🌿 Serenity AI: Hello! You can talk to me about anything. If you'd like, tell me your name!")
while True:
    user_input = input("\nYou: ")
    
    # Exit condition
    if user_input.lower() in ["exit", "quit", "bye"]:
        print("🌿 Serenity AI: Take care! I'm always here if you need to talk. 💙")
        break

    # Generate and display response
    bot_response = get_chatbot_response(user_input)
    print(f"🌿 Serenity AI: {bot_response}")
