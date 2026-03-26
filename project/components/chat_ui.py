import streamlit as st
import ollama
from components.sidebar_ui import apply_genre_theme


# ---------------- GUARDRAILS ---------------- #

def check_prompt_length(prompt):
    if len(prompt) > 500:
        return False, "Prompt too long. Please keep it under 500 characters."
    return True, ""


def check_prohibited_content(prompt):
    banned_words = ["violence", "hate", "kill", "terrorism", "drugs"]

    for word in banned_words:
        if word in prompt.lower():
            return False, f"Prompt contains restricted word: {word}"

    return True, ""


# Guardrail for irrelevant input
def check_irrelevant_input(prompt):

    prompt_lower = prompt.lower().strip()

    irrelevant_inputs = [
        "hi", "hello", "how are you", "what is",
        "who is", "weather", "tell me a joke",
        "python", "java"
    ]

    if len(prompt.split()) < 3:
        return False, "Prompt is too short to create a story idea."

    for phrase in irrelevant_inputs:
        if phrase in prompt_lower:
            return False, "Input does not look like a story idea."

    return True, ""


def is_prompt_appropriate(prompt, genre):

    prompt_lower = prompt.lower()

    inappropriate_keywords = {
        "Fantasy": ["horror", "sci-fi", "scifi", "comedy"],
        "Sci-Fi": ["fantasy", "horror", "comedy"],
        "Horror": ["fantasy", "sci-fi", "scifi", "comedy"],
        "Comedy": ["fantasy", "horror", "sci-fi", "scifi"]
    }

    for keyword in inappropriate_keywords.get(genre, []):
        if keyword in prompt_lower:
            return False

    return True


def validate_prompt(prompt, genre):

    valid, message = check_prompt_length(prompt)
    if not valid:
        return False, message

    valid, message = check_prohibited_content(prompt)
    if not valid:
        return False, message

    valid, message = check_irrelevant_input(prompt)
    if not valid:
        return False, message

    if not is_prompt_appropriate(prompt, genre):
        return False, "Prompt does not match the selected genre."

    return True, ""


# ---------------- CHAT AREA ---------------- #

def render_chat_area():

    apply_genre_theme(st.session_state.genre)

    st.markdown("## 📖 Narrative Story Co-Writer")


    # Initialize Story History
    if "story_history" not in st.session_state:
        st.session_state.story_history = []


    # ---------------- STORY HISTORY ---------------- #

    if st.session_state.story_history:

        st.markdown("### 📚 Story History")

        for i, story in enumerate(st.session_state.story_history):

            st.markdown(f"**Prompt:** {story['prompt']}")
            st.markdown(story["story"])

            # Delete button for each story
            if st.button("🗑 Delete", key=f"delete_{i}"):

                st.session_state.story_history.pop(i)
                st.rerun()

            st.markdown("---")


    # ---------------- PROMPT AREA ---------------- #

    st.markdown("### ✍️ Your Story Prompt")

    story_prompt = st.text_area(
        "Enter your story idea",
        placeholder=f"Write a {st.session_state.genre.lower()} story about...",
        height=120
    )


    col1, col2 = st.columns(2)

    generate_clicked = col1.button("🎨 Generate Story")
    new_story_clicked = col2.button("🆕 New Story")


    # New Story Button
    if new_story_clicked:
        st.rerun()


    # ---------------- GENERATE STORY ---------------- #

    if generate_clicked:

        if story_prompt.strip():

            valid, message = validate_prompt(story_prompt, st.session_state.genre)

            if not valid:

                st.error(f"Guardrail Triggered: {message}")

            else:

                with st.spinner("Generating story..."):

                    try:

                        prompt = f"Write a {st.session_state.genre} story based on this prompt: {story_prompt}. Make it engaging and detailed."

                        response = ollama.chat(
                            model="llama3:latest",
                            messages=[{"role": "user", "content": prompt}],
                            options={"temperature": 0.7, "num_predict": 500}
                        )

                        ai_content = response["message"]["content"]

                    except Exception as e:

                        ai_content = f"Error generating story: {str(e)}. Make sure Ollama is running."


                # Store generated story in Story History
                st.session_state.story_history.append({
                    "prompt": story_prompt,
                    "story": ai_content
                })


                st.success("Story generated successfully and added to history!")

                # Refresh UI so history updates immediately
                st.rerun()