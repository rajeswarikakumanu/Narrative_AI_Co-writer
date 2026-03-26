import streamlit as st

def render_sidebar():
    """
    Render the sidebar UI with:
    - User info
    - Story settings (Genre selection)
    - Story history with delete buttons
    - Logout button
    """

    with st.sidebar:
        # User Info Section
        st.markdown(f"""
            <div style='text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px; margin-bottom: 20px;'>
                <h2 style='color: white; margin: 0;'>👤 {st.session_state.username}</h2>
            </div>
        """, unsafe_allow_html=True)

        # Story Settings Section
        st.markdown('<div class="sidebar-header">⚙️ Story Settings</div>', unsafe_allow_html=True)

        # Genre Selection Dropdown
        genres = ["Fantasy", "Sci-Fi", "Horror", "Comedy"]
        selected_genre = st.selectbox(
            "Choose Genre",
            genres,
            index=genres.index(st.session_state.genre),
            key="genre_selector"
        )

        # Update genre in session state
        if selected_genre != st.session_state.genre:
            st.session_state.genre = selected_genre
            st.rerun()

        # Display current theme info
        genre_emojis = {
            "Fantasy": "🏰",
            "Sci-Fi": "🚀",
            "Horror": "👻",
            "Comedy": "😂"
        }

        st.markdown(f"""
            <div style='background: #f8f9fa; padding: 10px; border-radius: 8px; margin-top: 10px;'>
                <p style='margin: 0; text-align: center;'>
                    Current Theme: <strong>{genre_emojis[selected_genre]} {selected_genre}</strong>
                </p>
            </div>
        """, unsafe_allow_html=True)

        # Story History Section
        st.markdown("---")
        st.markdown('<div class="sidebar-header">📚 Story History</div>', unsafe_allow_html=True)

        # Display story history items
        if st.session_state.story_history:
            for story in st.session_state.story_history:
                with st.container():
                    st.markdown(f"""
                        <div class='story-item'>
                            <strong>{genre_emojis.get(story['genre'], '📖')} {story['title']}</strong>
                            <br><small style='color: #666;'>Genre: {story['genre']}</small>
                        </div>
                    """, unsafe_allow_html=True)

                    # Delete button for each story
                    if st.button(
                        "🗑️ Delete",
                        key=f"delete_{story['id']}",
                        use_container_width=True
                    ):
                        # Placeholder for delete logic
                        st.session_state.story_history = [
                            s for s in st.session_state.story_history if s['id'] != story['id']
                        ]
                        st.rerun()

                    st.markdown("<br>", unsafe_allow_html=True)
        else:
            st.markdown("""
                <div style='text-align: center; color: #999; padding: 20px;'>
                    <p>No stories yet.<br>Start creating!</p>
                </div>
            """, unsafe_allow_html=True)

        # Logout Button
        st.markdown("---")
        if st.button("🚪 Logout", key="logout_btn", use_container_width=True):
            # Clear session state on logout
            st.session_state.logged_in = False
            st.session_state.username = ""
            st.session_state.chat_history = []
            st.rerun()

        # Footer
        st.markdown("---")
        st.markdown("""
            <div style='text-align: center; font-size: 12px; color: #999; padding: 10px;'>
                <p>Story Co-Writer v1.0<br>Create amazing stories!</p>
            </div>
        """, unsafe_allow_html=True)


def apply_genre_theme(genre):
    """
    Apply background theme based on selected genre.
    This function adds CSS classes to change the app's background.
    """
    theme_classes = {
        "Fantasy": "fantasy-theme",
        "Sci-Fi": "scifi-theme",
        "Horror": "horror-theme",
        "Comedy": "comedy-theme"
    }

    theme_class = theme_classes.get(genre, "fantasy-theme")

    # Apply theme using custom CSS
    st.markdown(f"""
        <style>
            .stApp {{
                background: {'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' if genre == 'Fantasy' else
                            'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' if genre == 'Sci-Fi' else
                            'linear-gradient(135deg, #1a0000 0%, #3d0000 50%, #000000 100%)' if genre == 'Horror' else
                            'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ffd876 100%)'};
                transition: background 0.5s ease;
            }}
        </style>
    """, unsafe_allow_html=True)
