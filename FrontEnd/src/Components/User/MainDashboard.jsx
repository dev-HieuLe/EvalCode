// src/Components/User/Dashboard.jsx  (or wherever your file lives)
import React, { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../../Context/AuthContext";
import GradingDashboard from "./GradeDashboard";
import Sidebar from "./Sidebar";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { auth, user, loading } = useContext(AuthContext);
  const { id, batchId } = useParams();
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteBatch = async (batchIdToDelete) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/batches/${batchIdToDelete}`, {
        withCredentials: true,
      });

      setBatches((prev) => prev.filter((b) => b.id !== batchIdToDelete));

      // if user is currently viewing this deleted batch, redirect
      if (String(batchId) === String(batchIdToDelete)) {
        if (batches.length > 1) {
          // redirect to first remaining batch
          navigate(`/users/dashboard/${id}/batch/${batches[0].id}`);
        } else {
          // no batches left
          navigate(`/users/dashboard/${id}`);
        }
      }
    } catch (err) {
      console.error("❌ Error deleting batch:", err);
      await fetchBatches(); // fallback refresh
    }
  };

  // Fetch batches (single source of truth)
  const fetchBatches = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      // Use single endpoint that returns batches for the authenticated user.
      // (Backend should use req.id from verifyUser to filter).
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/batches`, { withCredentials: true });
      const fetchedBatches = Array.isArray(res.data) ? res.data : [];

      setBatches(fetchedBatches);
      setFetching(false);

      // If there's a batchId in the URL, validate it.
      if (batchId) {
        const exists = fetchedBatches.some(
          (b) => String(b.id) === String(batchId)
        );
        if (!exists) {
          // If requested batchId does not exist, redirect to first batch (if any)
          if (fetchedBatches.length > 0) {
            navigate(`/users/dashboard/${id}/batch/${fetchedBatches[0].id}`, {
              replace: true,
            });
          } else {
            // no batches at all — navigate to base dashboard (no batch)
            navigate(`/users/dashboard/${id}`, { replace: true });
          }
        }
      } else {
        // No batchId in url: if we have batches redirect to first
        if (fetchedBatches.length > 0) {
          navigate(`/users/dashboard/${id}/batch/${fetchedBatches[0].id}`, {
            replace: true,
          });
        }
      }
    } catch (err) {
      console.error("❌ Failed to fetch batches:", err);
      setError("Failed to load batches");
      setFetching(false);
    }
  }, [batchId, id, navigate]);

  useEffect(() => {
    if (auth) fetchBatches();
  }, [auth, fetchBatches]);

  // Create batch (call from Sidebar)
  const handleCreateBatch = async () => {
    try {
      const payload = {
        title: `Batch ${batches.length + 1}`,
        instructions: "Default instructions for this batch",
        grading_criteria: "Default grading criteria",
        language: "English",
        feedback_tone: "Neutral",
        total_points: 100,
      };

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/batches`, payload, {
        withCredentials: true,
      });

      // Expect backend to return the full created batch object (id, title, etc.)
      const newBatch = res.data;
      if (!newBatch || !newBatch.id) {
        console.warn("Unexpected create response:", res.data);
        // refetch to be safe
        await fetchBatches();
        return;
      }

      // Add to local state and navigate to it
      setBatches((prev) => [...prev, newBatch]);
      navigate(`/users/dashboard/${id}/batch/${newBatch.id}`);
    } catch (err) {
      console.error("❌ Error creating new batch:", err);
      // as fallback, refetch
      await fetchBatches();
    }
  };

  // Loading UI
  if (loading || fetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  // Auth guard
  if (!auth) return <Navigate to="/" replace />;
  if (parseInt(user.id, 10) !== parseInt(id, 10))
    return <Navigate to="/" replace />;

  return (
    <div className="flex h-screen">
      <Sidebar
        batches={batches}
        loadingBatches={fetching}
        onCreateBatch={handleCreateBatch}
        onDeleteBatch={handleDeleteBatch}
      />

      <main className="flex-1 overflow-y-auto bg-white p-6">
        {batches.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No batches yet. Click "New Grading" to create your first batch.
          </div>
        ) : (
          <GradingDashboard batchId={batchId} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
