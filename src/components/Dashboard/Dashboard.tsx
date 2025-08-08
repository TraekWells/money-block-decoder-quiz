import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { Users, Mail, Download, Search } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db, DB_COLLECTIONS } from "../../firebase/config";
import Container from "../../layout/Container";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Dashboard.module.scss";

type QuizData = {
  email: string;
  archetype: string;
};

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      percentage: string;
      emoji: string;
      color: string;
    };
  }>;
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterArchetype, setFilterArchetype] = React.useState("All");
  const [quizData, setQuizData] = React.useState<QuizData[]>([]);

  const { signOut } = useAuth();

  const archetypeInfo: Record<string, { emoji: string; color: string }> = {
    "Invisible Earner": { emoji: "🕵️‍♀️", color: "#8b5cf6" },
    Prover: { emoji: "💪", color: "#ec4899" },
    "Worthiness Wobbler": { emoji: "😬", color: "#06b6d4" },
    "Ancestral Loyalist": { emoji: "🧬", color: "#10b981" },
    "Scarcity Keeper": { emoji: "🪙", color: "#f59e0b" },
    "Martyr Manifestor": { emoji: "🧎‍♀️", color: "#ef4444" },
    "Avoidant Dreamer": { emoji: "☁️", color: "#6366f1" },
    "Control Keeper": { emoji: "🧠", color: "#8b5cf6" },
  };

  // Calculate pie chart data
  const archetypeCounts = quizData.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.archetype] = (acc[item.archetype] || 0) + 1;
      return acc;
    },
    {}
  );

  const archetypeData = Object.entries(archetypeCounts).map(
    ([archetype, count]) => ({
      name: archetype,
      value: count,
      percentage: ((count / quizData.length) * 100).toFixed(1),
      color: archetypeInfo[archetype].color,
      emoji: archetypeInfo[archetype].emoji,
    })
  );

  // Filter data based on search and archetype filter
  const filteredData = quizData.filter((item) => {
    const matchesSearch = item.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterArchetype === "All" || item.archetype === filterArchetype;
    return matchesSearch && matchesFilter;
  });

  const totalUsers = quizData.length;

  const topArchetype = archetypeData.sort((a, b) => b.value - a.value)[0];

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
          }}
        >
          <p style={{ margin: 0, fontWeight: "600" }}>
            {data.emoji} {data.name}
          </p>
          <p style={{ margin: 0, fontSize: "14px" }}>
            Count: {data.value} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const exportData = () => {
    const csvContent = [
      ["Email", "Archetype"],
      ...filteredData.map((item) => [item.email, item.archetype]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "money-block-quiz-results.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(
        collection(db, DB_COLLECTIONS.quizSubmissions)
      );
      const data = snapshot.docs.map((doc) => doc.data()) as QuizData[];
      setQuizData(data);
    };

    fetchData();
  }, []);

  if (!quizData.length) {
    return;
  }

  return (
    <Container>
      <div>
        <div className={styles.header}>
          <button onClick={signOut}>Sign Out</button>
          <h1 className={styles.title}>Money Block Archetypes Dashboard</h1>
          <p className={styles.subtitle}>
            Analytics and insights from quiz participants
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ fontSize: "32px" }}>
              {topArchetype.emoji}
            </div>
            <div className={styles.statValue}>{topArchetype.value}</div>
            <div className={styles.statLabel}>
              Most Common: {topArchetype.name}
            </div>
          </div>
          <div className={styles.statCard}>
            <Users size={32} className={styles.statIcon} />
            <div className={styles.statValue}>{totalUsers}</div>
            <div className={styles.statLabel}>Total Participants</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className={styles.chartsGrid}>
          {/* Pie Chart */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Archetype Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={archetypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ percentage }) => `${percentage}%`}
                  labelLine={false}
                >
                  {archetypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.legendContainer}>
              {archetypeData.map((item, index) => (
                <div key={index} className={styles.legendItem}>
                  <div
                    className={styles.legendColor}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={styles.legendText}>
                    {item.emoji} {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Archetype Counts</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={archetypeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "white", fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fill: "white" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3 className={styles.tableTitle}>Participant Results</h3>
            <div className={styles.filtersContainer}>
              <div style={{ position: "relative" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#c4b5fd",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  style={{ paddingLeft: "40px" }}
                />
              </div>
              <select
                value={filterArchetype}
                onChange={(e) => setFilterArchetype(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="All">All Archetypes</option>
                {Object.keys(archetypeInfo).map((archetype) => (
                  <option key={archetype} value={archetype}>
                    {archetype}
                  </option>
                ))}
              </select>
              <button onClick={exportData} className={styles.exportButton}>
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>

          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.tableHeaderCell}>Email</th>
                <th className={styles.tableHeaderCell}>Archetype</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Mail size={16} style={{ color: "#c4b5fd" }} />
                      {item.email}
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.archetypeCell}>
                      <span className={styles.archetypeEmoji}>
                        {archetypeInfo[item.archetype].emoji}
                      </span>
                      <span
                        className={styles.archetypeBadge}
                        style={{
                          backgroundColor: archetypeInfo[item.archetype].color,
                          color: "white",
                        }}
                      >
                        {item.archetype}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "#c4b5fd",
              }}
            >
              No results found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
