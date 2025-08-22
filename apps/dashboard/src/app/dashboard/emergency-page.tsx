"use client";

// Emergency static dashboard to test if the issue is in the page content
export default function EmergencyDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Emergency Dashboard</h1>
      <p>This is a completely static dashboard to test React Error #130.</p>
      <div>
        <button onClick={() => (window.location.href = "/auth/signin")}>
          Sign Out
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Static Content</h2>
        <p>
          If you can see this without React Error #130, the issue is in the
          dynamic components.
        </p>
      </div>
    </div>
  );
}
