import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv(override=True)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-pro-latest")

chat = model.start_chat(history=[])

prompt = input("Esperando prompt: ")

while prompt != "exit":
    response = chat.send_message(prompt)
    print(response.text)
    prompt = input("Esperando prompt: ")
