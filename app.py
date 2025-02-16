import openai
from flask import Flask, request, jsonify

app = Flask(__name__)

openai.api_key = "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"

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    
    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    try:
       
        response = openai.Completion.create(
            model="gpt-4",
            prompt=user_input,
            max_tokens=100
        )
        return jsonify({"response": response.choices[0].text.strip()})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
