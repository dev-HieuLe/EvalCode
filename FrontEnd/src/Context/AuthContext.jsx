// AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [authCheckedOnce, setAuthCheckedOnce] = useState(false);
  const [wasLoggedInBefore, setWasLoggedInBefore] = useState(false);

  //refresh token if access token expired
  const tryRefreshToken = async () => {
    try {
      const res = await axios.post(
        "/api/refresh-token",
        {},
        { withCredentials: true }
      );
      if (res.data.status === "Success") {
        console.log("✅ Access token refreshed");
        return true;
      }
    } catch (err) {
      if (err.response?.data?.error !== "No refresh token") return;
      console.error("❌ Failed to refresh token", err.response?.data || err.message);
    }
    return false;
  };

  //Check token Session
  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/user", { withCredentials: true });
      if (res.status === 200 && res.data?.name) {
        setAuth(true);
        setUser({
          name: res.data.name,
          email: res.data.email,
          id: res.data.id,
          credits: res.data.credits
        });
        setWasLoggedInBefore(true);
      } else {
        setAuth(false);
        setUser({});
      }
    } catch (err) {
      console.warn("⚠️ Token might be expired, trying refresh...");
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        return await checkAuth(); 
      } else {
        setAuth(false);
        setUser({});
      }
    } finally {
      setAuthCheckedOnce(true);
      setLoading(false);
    }
  };

  // ✅ Check once on load
  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Re-check every 5 minutes
  useEffect(() => {
    if (!wasLoggedInBefore) return;

    const interval = setInterval(() => {
      checkAuth();
    }, 1 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);


  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        user,
        setUser,
        loading,
        authCheckedOnce,
        wasLoggedInBefore,
        setWasLoggedInBefore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
