import streamlit as st

def render_login_page():
    """
    Render the Login/Signup page UI with tabs for Login and Signup forms.
    No backend logic - just UI placeholders for form submission.
    """

    # Center the login card
    col1, col2, col3 = st.columns([1, 2, 1])

    with col2:
        # Add custom HTML for better styling
        st.markdown("""
            <div class="login-card fade-in">
                <h1 class="login-title">📖 Story Co-Writer</h1>
            </div>
        """, unsafe_allow_html=True)

        # Create tabs for Login and Signup
        tab1, tab2 = st.tabs(["🔑 Login", "✍️ Signup"])

        # Login Tab
        with tab1:
            st.markdown("### Welcome Back!")

            # Login form fields
            login_username = st.text_input(
                "Username",
                key="login_username",
                placeholder="Enter your username"
            )

            login_password = st.text_input(
                "Password",
                type="password",
                key="login_password",
                placeholder="Enter your password"
            )

            # Login button
            if st.button("Login", key="login_btn", use_container_width=True):
                # Placeholder for login logic
                if login_username and login_password:
                    st.session_state.logged_in = True
                    st.session_state.username = login_username
                    st.markdown(
                        '<div class="success-message">✅ Login successful! Redirecting...</div>',
                        unsafe_allow_html=True
                    )
                    st.rerun()
                else:
                    st.markdown(
                        '<div class="error-message">❌ Please fill in all fields</div>',
                        unsafe_allow_html=True
                    )

        # Signup Tab
        with tab2:
            st.markdown("### Create Your Account")

            # Signup form fields
            signup_username = st.text_input(
                "Username",
                key="signup_username",
                placeholder="Choose a username"
            )

            signup_email = st.text_input(
                "Email",
                key="signup_email",
                placeholder="Enter your email"
            )

            signup_password = st.text_input(
                "Password",
                type="password",
                key="signup_password",
                placeholder="Create a password"
            )

            signup_confirm_password = st.text_input(
                "Confirm Password",
                type="password",
                key="signup_confirm_password",
                placeholder="Re-enter your password"
            )

            # Signup button
            if st.button("Sign Up", key="signup_btn", use_container_width=True):
                # Placeholder for signup logic
                if signup_username and signup_email and signup_password and signup_confirm_password:
                    if signup_password == signup_confirm_password:
                        st.markdown(
                            '<div class="success-message">✅ Account created successfully! Please login.</div>',
                            unsafe_allow_html=True
                        )
                    else:
                        st.markdown(
                            '<div class="error-message">❌ Passwords do not match</div>',
                            unsafe_allow_html=True
                        )
                else:
                    st.markdown(
                        '<div class="error-message">❌ Please fill in all fields</div>',
                        unsafe_allow_html=True
                    )

        # Footer text
        st.markdown("---")
        st.markdown(
            "<p style='text-align: center; color: #666;'>Start your creative journey today!</p>",
            unsafe_allow_html=True
        )
