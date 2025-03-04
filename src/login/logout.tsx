import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // トークンがなければログインページへ
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:5000/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem("token"); // ローカルストレージのトークン削除
          navigate("/login"); // ログインページへリダイレクト
        } else {
          console.error("ログアウト失敗");
        }
      } catch (error) {
        console.error("通信エラー:", error);
      }
    };

    logout();
  }, [navigate]);

  return null;
};

export default Logout;
