import streamlit as st
from components.login_ui import render_login_page
from components.sidebar_ui import render_sidebar
from components.chat_ui import render_chat_area

st.set_page_config(
    page_title="Narrative Story Co-Writer",
    page_icon="📖",
    layout="wide"
)


def load_css():
    try:
        with open("styles.css") as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
    except:
        pass


def initialize_session():

    if "logged_in" not in st.session_state:
        st.session_state.logged_in = False

    if "username" not in st.session_state:
        st.session_state.username = ""

    if "genre" not in st.session_state:
        st.session_state.genre = "Fantasy"

    if "chat_history" not in st.session_state:
        st.session_state.chat_history = []

    if "story_history" not in st.session_state:
        st.session_state.story_history = []


def main():

    load_css()
    initialize_session()

    if not st.session_state.logged_in:
        render_login_page()
    else:
        render_sidebar()
        render_chat_area()


if __name__ == "__main__":
    main()