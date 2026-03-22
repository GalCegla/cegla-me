// hooks/useAdminAuth.ts
import { useCallback, useState } from "react";

const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(event.target.value),
    [],
  );

  const handlePasswordSubmit = useCallback(async () => {
    const res = await fetch("/api/auth/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  }, [password]);

  return {
    isAuthenticated,
    password,
    error,
    handlePasswordChange,
    handlePasswordSubmit,
  };
};

export default useAdminAuth;
