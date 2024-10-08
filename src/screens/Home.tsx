import React from "react";

interface User {
  email?: string;
}

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const logout = () => {
    sessionStorage.removeItem("google_user");
    sessionStorage.removeItem("microsoft_user");
    sessionStorage.removeItem("apple_user");
    window.location.reload();
  };

  return (
    <div style={{ textAlign: "center", margin: "3rem" }}>
      <h1>Dear {user?.email}</h1>
      <p>
        You are viewing this page because you are logged in or you just signed
        up
      </p>
      <div>
        <button
          onClick={logout}
          style={{
            color: "red",
            border: "1px solid gray",
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
