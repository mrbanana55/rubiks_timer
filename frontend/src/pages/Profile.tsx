import React, { useEffect, useState, useMemo } from "react";
import Layout from "../layouts/layout";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import { calculateAoN } from "../utils/stats";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Solve {
  id: string;
  time: number;
  scramble: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [solves, setSolves] = useState<Solve[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/signup");
      return;
    }

    const fetchSolves = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile/times", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.times) {
          setSolves(data.times);
        }
      } catch (error) {
        console.error("Failed to fetch solves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolves();
  }, [token, navigate]);

  const stats = useMemo(() => {
    if (solves.length === 0) return null;
    const times = solves.map((s) => s.time);
    const best = Math.min(...times);
    
    // Solves are fetched DESC, so we need to reverse or slice from start for "recent" averages
    return {
      pb: best,
      ao3: calculateAoN(times, 3),
      ao5: calculateAoN(times, 5),
      ao10: calculateAoN(times, 10),
    };
  }, [solves]);

  const chartData = useMemo(() => {
    return [...solves].reverse().map((s, index) => ({
      index: index + 1,
      time: s.time / 1000,
      formattedTime: formatTime(s.time),
    }));
  }, [solves]);

  if (loading) return <Layout><div>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        {/* Stats Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Best Time</p>
            <p className="text-3xl font-bold text-blue-600">{stats ? formatTime(stats.pb) : "--"}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Avg of 3</p>
            <p className="text-3xl font-bold text-gray-800">{stats?.ao3 ? formatTime(stats.ao3) : "--"}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Avg of 5</p>
            <p className="text-3xl font-bold text-gray-800">{stats?.ao5 ? formatTime(stats.ao5) : "--"}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Avg of 10</p>
            <p className="text-3xl font-bold text-gray-800">{stats?.ao10 ? formatTime(stats.ao10) : "--"}</p>
          </div>
        </div>

        {/* Graph */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-gray-800">Progress Graph</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="index" hide />
                <YAxis 
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => val.toFixed(1)}
                  stroke="#9ca3af"
                />
                <Tooltip 
                  formatter={(value: any) => [formatTime(Number(value) * 1000), "Time"]}
                  labelFormatter={() => ""}
                />
                <Line 
                  type="monotone" 
                  dataKey="time" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2563eb" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Solve History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="px-6 py-4 font-semibold">Time</th>
                  <th className="px-6 py-4 font-semibold">Scramble</th>
                  <th className="px-6 py-4 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {solves.map((solve) => (
                  <tr key={solve.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-blue-600">
                      {formatTime(solve.time)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                      {solve.scramble}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right">
                      {new Date(solve.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {solves.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-gray-400">
                      No solves yet. Start practicing!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
