"use client";
import axios from "axios";
import withProtectedRoute from "@/utils/withProtectedRoute";

function Dashboard() {
  const handleClick = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/test`,
      });
      console.log(res);
    } catch (err) {
      console.error("Error faced", err);
    }
  };
  return (
    <div>
      This is dashboard <button onClick={handleClick}>Make request</button>
    </div>
  );
}

export default withProtectedRoute(Dashboard);
