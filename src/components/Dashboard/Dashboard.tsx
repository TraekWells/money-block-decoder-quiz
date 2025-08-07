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

type QuizData = {
  email: string;
  archetype: string;
}[];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterArchetype, setFilterArchetype] = React.useState("All");
  const [quizData, setQuizData] = React.useState<QuizData[]>([]);

  // Mock data - in a real app, this would come from your backend/database
  const mockData = [
    {
      email: "dwayne.johnson@email.com",
      archetype: "Invisible Earner",
    },
    {
      email: "sarah.johnson@email.com",
      archetype: "Invisible Earner",
    },
    {
      email: "mike.chen@company.com",
      archetype: "Prover",
    },
    {
      email: "emma.wilson@startup.co",
      archetype: "Worthiness Wobbler",
    },
    {
      email: "david.brown@freelance.net",
      archetype: "Ancestral Loyalist",
    },
    {
      email: "lisa.martinez@agency.com",
      archetype: "Scarcity Keeper",
    },
    {
      email: "james.taylor@consulting.biz",
      archetype: "Martyr Manifestor",
    },
    {
      email: "amy.davis@creative.studio",
      archetype: "Avoidant Dreamer",
    },
    {
      email: "robert.garcia@tech.io",
      archetype: "Control Keeper",
    },
    {
      email: "jessica.moore@design.co",
      archetype: "Invisible Earner",
    },
    {
      email: "kevin.lee@marketing.pro",
      archetype: "Prover",
    },
    {
      email: "melissa.clark@wellness.com",
      archetype: "Worthiness Wobbler",
    },
    {
      email: "daniel.white@finance.corp",
      archetype: "Scarcity Keeper",
    },
    {
      email: "rachel.adams@coach.life",
      archetype: "Martyr Manifestor",
    },
    {
      email: "chris.thompson@business.net",
      archetype: "Control Keeper",
    },
    {
      email: "natalie.jones@spiritual.guru",
      archetype: "Avoidant Dreamer",
    },
  ];

  const archetypeInfo = {
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
  const archetypeCounts = mockData.reduce((acc, item) => {
    acc[item.archetype] = (acc[item.archetype] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(archetypeCounts).map(([archetype, count]) => ({
    name: archetype,
    value: count,
    percentage: ((count / mockData.length) * 100).toFixed(1),
    color: archetypeInfo[archetype].color,
    emoji: archetypeInfo[archetype].emoji,
  }));

  // Filter data based on search and archetype filter
  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterArchetype === "All" || item.archetype === filterArchetype;
    return matchesSearch && matchesFilter;
  });

  const totalUsers = mockData.length;

  const topArchetype = pieData.sort((a, b) => b.value - a.value)[0];

  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #2d1b69 0%, #11052c 50%, #1e1b4b 100%)",
      padding: "20px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    dashboardContainer: {
      maxWidth: "1400px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      color: "white",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#c4b5fd",
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
      marginBottom: "40px",
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      textAlign: "center",
      color: "white",
    },
    statIcon: {
      marginBottom: "12px",
      color: "#8b5cf6",
    },
    statValue: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    statLabel: {
      fontSize: "14px",
      color: "#c4b5fd",
    },
    chartsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
      gap: "30px",
      marginBottom: "40px",
    },
    chartCard: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "30px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "white",
    },
    chartTitle: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "20px",
      textAlign: "center",
    },
    tableCard: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "30px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "white",
    },
    tableHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "15px",
    },
    tableTitle: {
      fontSize: "24px",
      fontWeight: "600",
    },
    filtersContainer: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
      flexWrap: "wrap",
    },
    searchInput: {
      padding: "10px 15px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      outline: "none",
      minWidth: "200px",
    },
    filterSelect: {
      padding: "10px 15px",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      outline: "none",
    },
    exportButton: {
      padding: "10px 20px",
      background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      fontWeight: "500",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeaderRow: {
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    },
    tableHeaderCell: {
      padding: "15px 10px",
      textAlign: "left",
      fontWeight: "600",
      color: "#c4b5fd",
      fontSize: "14px",
    },
    tableRow: {
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "background-color 0.2s ease",
    },
    tableCell: {
      padding: "15px 10px",
      fontSize: "14px",
    },
    archetypeCell: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    archetypeEmoji: {
      fontSize: "16px",
    },
    archetypeBadge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500",
    },
    scoreCell: {
      fontWeight: "600",
    },
    legendContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "10px",
      marginTop: "20px",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px",
      borderRadius: "8px",
      background: "rgba(255, 255, 255, 0.05)",
    },
    legendColor: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
    },
    legendText: {
      fontSize: "12px",
    },
  };

  const CustomTooltip = ({ active, payload }) => {
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
    <div style={styles.container}>
      <div style={styles.dashboardContainer}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Money Block Archetypes Dashboard</h1>
          <p style={styles.subtitle}>
            Analytics and insights from quiz participants
          </p>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>
              {topArchetype.emoji}
            </div>
            <div style={styles.statValue}>{topArchetype.value}</div>
            <div style={styles.statLabel}>Most Common: {topArchetype.name}</div>
          </div>
          <div style={styles.statCard}>
            <Users size={32} style={styles.statIcon} />
            <div style={styles.statValue}>{totalUsers}</div>
            <div style={styles.statLabel}>Total Participants</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={styles.chartsGrid}>
          {/* Pie Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Archetype Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percentage }) => `${percentage}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={styles.legendContainer}>
              {pieData.map((item, index) => (
                <div key={index} style={styles.legendItem}>
                  <div
                    style={{
                      ...styles.legendColor,
                      backgroundColor: item.color,
                    }}
                  />
                  <span style={styles.legendText}>
                    {item.emoji} {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div style={styles.chartCard}>
            <h3 style={styles.chartTitle}>Archetype Counts</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={pieData}
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
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h3 style={styles.tableTitle}>Participant Results</h3>
            <div style={styles.filtersContainer}>
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
                  style={{ ...styles.searchInput, paddingLeft: "40px" }}
                />
              </div>
              <select
                value={filterArchetype}
                onChange={(e) => setFilterArchetype(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="All">All Archetypes</option>
                {Object.keys(archetypeInfo).map((archetype) => (
                  <option key={archetype} value={archetype}>
                    {archetype}
                  </option>
                ))}
              </select>
              <button onClick={exportData} style={styles.exportButton}>
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>

          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.tableHeaderCell}>Email</th>
                <th style={styles.tableHeaderCell}>Archetype</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  style={styles.tableRow}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <td style={styles.tableCell}>
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
                  <td style={styles.tableCell}>
                    <div style={styles.archetypeCell}>
                      <span style={styles.archetypeEmoji}>
                        {archetypeInfo[item.archetype].emoji}
                      </span>
                      <span
                        style={{
                          ...styles.archetypeBadge,
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
              style={{ textAlign: "center", padding: "40px", color: "#c4b5fd" }}
            >
              No results found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
