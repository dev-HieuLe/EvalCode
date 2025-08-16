import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import GradingDashboard from "./GradeDashboard";
import Sidebar from "./Sidebar";
import { useParams, useNavigate, Navigate } from "react-router-dom";


const Dashboard = () => {
  const { auth, user, loading } = useContext(AuthContext);
  const { id, batchId } = useParams();

  // Show loading spinner or blank while checking
  if (loading) return null;

  // Not authenticated
  if (!auth) return <Navigate to="/" />;

  // Authenticated, but wrong user trying to access another dashboard
  if (parseInt(user.id) !== parseInt(id)) return <Navigate to="/" />;

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-white p-6">
        <GradingDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
