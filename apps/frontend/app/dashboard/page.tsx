"use client";
import withProtectedRoute from "@/utils/withProtectedRoute";

function Dashboard() {
  return <div>This is dashboard</div>;
}

export default withProtectedRoute(Dashboard);
