import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AuthResponse {
  credential: string;
}

interface UseAuthReturn {
  loading: boolean;
  error: string;
  handleAuth: (response: AuthResponse, provider: "google" | "microsoft") => Promise<void>;
}

const useAuth = (url: string): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (response: AuthResponse, provider: "google" | "microsoft"): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
          provider,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data?.user) {
        sessionStorage.setItem(`${provider}_user`, JSON.stringify(data.user)); // Store in sessionStorage
        window.location.reload();
      } else {
        throw new Error(data?.message || "Authentication failed");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message); // Show error using toast
    }
  };

  return { loading, error, handleAuth };
};

export default useAuth;
