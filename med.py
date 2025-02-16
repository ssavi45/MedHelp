import openai

openai.api_key = "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"

def test_openai():
    try:
        client = openai.OpenAI()
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": "Hello"}]
        )
        print("\n API Test Successful!")
        print("Response:", response.choices[0].message.content)
    except Exception as e:
        print("\n API Test Failed!")
        print("Error:", e)

test_openai()
