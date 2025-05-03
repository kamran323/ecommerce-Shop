import streamlit as st

# Set page title
st.set_page_config(page_title="EcoShop Dashboard", page_icon="🛍️")

# Add title
st.title("EcoShop Dashboard")

# Add sidebar
st.sidebar.header("Navigation")
page = st.sidebar.selectbox("Select Page", ["Home", "Products", "Analytics", "Settings"])

# Main content based on selected page
if page == "Home":
    st.header("Welcome to EcoShop Dashboard")
    st.write("""
    This is your EcoShop dashboard. Use the sidebar to navigate between different sections.
    
    Features:
    - Product Management
    - Sales Analytics
    - Inventory Tracking
    - Settings
    """)

elif page == "Products":
    st.header("Products Management")
    st.write("Manage your products here")

elif page == "Analytics":
    st.header("Sales Analytics")
    st.write("View your sales analytics and trends")

elif page == "Settings":
    st.header("Settings")
    st.write("Configure your shop settings")

# Add footer
st.markdown("---")
footer = """
<div style='text-align: center; margin-top: 20px;'>
    <p>Powered by Streamlit</p>
</div>
"""
st.markdown(footer, unsafe_allow_html=True)
