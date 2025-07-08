def get_bot_response(user_input: str) -> str:
    user_input = user_input.lower()

    if "hello" in user_input or "hi" in user_input:
        return "Hello! I'm your health assistant 🤖"
    elif "glucose" in user_input:
        return "Your recent glucose readings are stable. Need a full summary?"
    elif "bye" in user_input:
        return "Take care! 🩺"
    else:
        return f"I heard: {user_input}. Want to ask about something specific like medication or diet?"
