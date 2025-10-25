import { Chart } from "@/components/ui/chart"
// ============================================
// INCUBATOR MANAGEMENT SYSTEM - MAIN APP
// ============================================

// State Management
const appState = {
  currentUser: null,
  currentPage: "dashboard",
  startups: [],
  mentors: [],
  events: [],
  resources: [],
  fundingRounds: [],
  charts: {},
}

// Demo Users
const demoUsers = {
  admin: { id: "admin-1", name: "Admin User", role: "admin", email: "admin@incubator.com" },
  mentor: { id: "mentor-1", name: "Sarah Chen", role: "mentor", email: "sarah@mentors.com" },
  founder: { id: "founder-1", name: "John Doe", role: "founder", email: "john@startup.com" },
}

// Initialize App
function initApp() {
  initializeMockData()
  renderLoginPage()
}

// Initialize Mock Data
function initializeMockData() {
  appState.mentors = [
    {
      id: "mentor-1",
      name: "Sarah Chen",
      email: "sarah@mentors.com",
      expertise: ["Product Strategy", "Growth Marketing", "B2B SaaS"],
      assignedStartups: [],
      bio: "Former VP of Product at TechCorp",
    },
    {
      id: "mentor-2",
      name: "James Wilson",
      email: "james@mentors.com",
      expertise: ["Fundraising", "Finance", "Operations"],
      assignedStartups: [],
      bio: "Serial entrepreneur and investor",
    },
  ]

  appState.startups = [
    {
      id: "startup-1",
      name: "TechFlow",
      description: "AI-powered workflow automation",
      founderName: "John Doe",
      founderEmail: "john@techflow.com",
      industry: "SaaS",
      stage: "mvp",
      mentorId: "mentor-1",
      fundingNeeded: 100000,
      fundingReceived: 25000,
      progress: 65,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "startup-2",
      name: "GreenEnergy",
      description: "Sustainable energy solutions",
      founderName: "Jane Smith",
      founderEmail: "jane@greenenergy.com",
      industry: "CleanTech",
      stage: "idea",
      mentorId: null,
      fundingNeeded: 250000,
      fundingReceived: 0,
      progress: 20,
      createdAt: new Date("2024-02-01"),
    },
    {
      id: "startup-3",
      name: "HealthHub",
      description: "Telemedicine platform",
      founderName: "Mike Johnson",
      founderEmail: "mike@healthhub.com",
      industry: "HealthTech",
      stage: "growth",
      mentorId: "mentor-2",
      fundingNeeded: 500000,
      fundingReceived: 150000,
      progress: 45,
      createdAt: new Date("2023-12-10"),
    },
  ]

  appState.events = [
    {
      id: "event-1",
      title: "Pitch Day",
      description: "Monthly pitch competition",
      date: new Date("2024-03-15"),
      location: "Main Hall",
      type: "pitch",
      attendees: ["startup-1", "startup-2"],
    },
    {
      id: "event-2",
      title: "Networking Breakfast",
      description: "Meet other founders and mentors",
      date: new Date("2024-03-20"),
      location: "Cafe",
      type: "networking",
      attendees: ["startup-1", "startup-3"],
    },
  ]

  appState.resources = [
    {
      id: "res-1",
      name: "Office Space - Desk",
      type: "office-space",
      availability: 20,
      allocated: 5,
      description: "Dedicated desk in shared office",
    },
    {
      id: "res-2",
      name: "Meeting Room",
      type: "office-space",
      availability: 5,
      allocated: 2,
      description: "Private meeting room for 8 people",
    },
    {
      id: "res-3",
      name: "AWS Credits",
      type: "software",
      availability: 50000,
      allocated: 15000,
      description: "Cloud computing credits",
    },
  ]

  appState.fundingRounds = [
    {
      id: "fund-1",
      name: "Seed Round 2024",
      totalAmount: 500000,
      allocatedAmount: 175000,
      startupAllocations: [
        { startupId: "startup-1", amount: 25000 },
        { startupId: "startup-3", amount: 150000 },
      ],
      status: "open",
    },
  ]
}

// ============================================
// LOGIN PAGE
// ============================================

function renderLoginPage() {
  const app = document.getElementById("app")
  app.innerHTML = `
        <div class="login-container">
            <div class="login-box">
                <h2>Incubator Management System</h2>
                <p>Select your role to continue</p>
                
                <div class="role-selector">
                    <label for="roleSelect">Select Role:</label>
                    <select id="roleSelect">
                        <option value="admin">Admin</option>
                        <option value="mentor">Mentor</option>
                        <option value="founder">Founder</option>
                    </select>
                </div>

                <div class="demo-accounts">
                    <p><strong>Demo Accounts:</strong></p>
                    <p>Admin: admin@incubator.com</p>
                    <p>Mentor: sarah@mentors.com</p>
                    <p>Founder: john@startup.com</p>
                </div>

                <button class="login-btn" onclick="handleLogin()">Login</button>
            </div>
        </div>
    `
}

function handleLogin() {
  const roleSelect = document.getElementById("roleSelect")
  const role = roleSelect.value
  appState.currentUser = demoUsers[role]
  appState.currentPage = "dashboard"
  renderDashboard()
}

// ============================================
// MAIN DASHBOARD
// ============================================

function renderDashboard() {
  const app = document.getElementById("app")
  const user = appState.currentUser

  app.innerHTML = `
        <div class="app-container">
            ${renderSidebar()}
            <div class="main-content">
                ${renderHeader()}
                <div class="content" id="mainContent">
                    ${renderPageContent()}
                </div>
            </div>
        </div>
        ${renderModals()}
    `

  attachEventListeners()
  initializeCharts()
}

function renderSidebar() {
  const user = appState.currentUser
  const menuItems = getMenuItems(user.role)

  return `
        <div class="sidebar">
            <div class="sidebar-header">IMS</div>
            <ul class="sidebar-menu">
                ${menuItems
                  .map(
                    (item) => `
                    <li>
                        <button onclick="navigateTo('${item.id}')" class="sidebar-btn ${appState.currentPage === item.id ? "active" : ""}">
                            ${item.label}
                        </button>
                    </li>
                `,
                  )
                  .join("")}
            </ul>
            <div class="user-info">
                <div class="user-role">${user.role.toUpperCase()}</div>
                <div>${user.name}</div>
                <button class="logout-btn" onclick="handleLogout()">Logout</button>
            </div>
        </div>
    `
}

function getMenuItems(role) {
  const baseItems = [{ id: "dashboard", label: "Dashboard" }]

  const roleItems = {
    admin: [
      { id: "startups", label: "Startups" },
      { id: "mentors", label: "Mentors" },
      { id: "events", label: "Events" },
      { id: "resources", label: "Resources" },
      { id: "funding", label: "Funding" },
      { id: "reports", label: "Reports" },
    ],
    mentor: [
      { id: "startups", label: "My Startups" },
      { id: "events", label: "Events" },
    ],
    founder: [
      { id: "profile", label: "My Profile" },
      { id: "events", label: "Events" },
    ],
  }

  return [...baseItems, ...(roleItems[role] || [])]
}

function renderHeader() {
  const pageTitle = getPageTitle(appState.currentPage)
  return `
        <div class="header">
            <h1>${pageTitle}</h1>
            <div>${new Date().toLocaleDateString()}</div>
        </div>
    `
}

function getPageTitle(page) {
  const titles = {
    dashboard: "Dashboard",
    startups: "Startups",
    mentors: "Mentors",
    events: "Events",
    resources: "Resources",
    funding: "Funding Management",
    reports: "Reports",
    profile: "My Profile",
  }
  return titles[page] || "Dashboard"
}

function renderPageContent() {
  const user = appState.currentUser
  const page = appState.currentPage

  if (page === "dashboard") {
    return renderDashboardContent(user.role)
  } else if (page === "startups") {
    return renderStartupsPage()
  } else if (page === "mentors") {
    return renderMentorsPage()
  } else if (page === "events") {
    return renderEventsPage()
  } else if (page === "resources") {
    return renderResourcesPage()
  } else if (page === "funding") {
    return renderFundingPage()
  } else if (page === "reports") {
    return renderReportsPage()
  } else if (page === "profile") {
    return renderProfilePage()
  }
  return ""
}

// ============================================
// DASHBOARD CONTENT
// ============================================

function renderDashboardContent(role) {
  if (role === "admin") {
    return renderAdminDashboard()
  } else if (role === "mentor") {
    return renderMentorDashboard()
  } else if (role === "founder") {
    return renderFounderDashboard()
  }
}

function renderAdminDashboard() {
  const totalStartups = appState.startups.length
  const totalMentors = appState.mentors.length
  const totalFunding = appState.fundingRounds.reduce((sum, r) => sum + r.totalAmount, 0)
  const allocatedFunding = appState.fundingRounds.reduce((sum, r) => sum + r.allocatedAmount, 0)
  const avgProgress = Math.round(appState.startups.reduce((sum, s) => sum + s.progress, 0) / appState.startups.length)

  return `
        <div class="section">
            <h2 class="section-title">Overview Metrics</h2>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-label">Total Startups</div>
                    <div class="metric-value">${totalStartups}</div>
                    <div class="metric-change">↑ 2 this month</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Active Mentors</div>
                    <div class="metric-value">${totalMentors}</div>
                    <div class="metric-change">100% engaged</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Total Funding</div>
                    <div class="metric-value">$${(totalFunding / 1000).toFixed(0)}K</div>
                    <div class="metric-change">Available</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Allocated Funding</div>
                    <div class="metric-value">$${(allocatedFunding / 1000).toFixed(0)}K</div>
                    <div class="metric-change">${Math.round((allocatedFunding / totalFunding) * 100)}% utilized</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Avg Progress</div>
                    <div class="metric-value">${avgProgress}%</div>
                    <div class="metric-change">Across all startups</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Upcoming Events</div>
                    <div class="metric-value">${appState.events.length}</div>
                    <div class="metric-change">This month</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Analytics</h2>
            <div class="charts-grid">
                <div class="chart-container">
                    <canvas id="fundingChart"></canvas>
                </div>
                <div class="chart-container">
                    <canvas id="stageChart"></canvas>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Recent Startups</h2>
            ${renderStartupsTable()}
        </div>
    `
}

function renderMentorDashboard() {
  const user = appState.currentUser
  const assignedStartups = appState.startups.filter((s) => s.mentorId === user.id)
  const avgProgress =
    assignedStartups.length > 0
      ? Math.round(assignedStartups.reduce((sum, s) => sum + s.progress, 0) / assignedStartups.length)
      : 0

  return `
        <div class="section">
            <h2 class="section-title">Your Dashboard</h2>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-label">Assigned Startups</div>
                    <div class="metric-value">${assignedStartups.length}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Avg Progress</div>
                    <div class="metric-value">${avgProgress}%</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Expertise Areas</div>
                    <div class="metric-value">${appState.mentors.find((m) => m.id === user.id)?.expertise.length || 0}</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Your Startups</h2>
            ${renderStartupsTable(assignedStartups)}
        </div>
    `
}

function renderFounderDashboard() {
  const user = appState.currentUser
  const myStartup = appState.startups.find((s) => s.founderEmail === user.email)

  if (!myStartup) {
    return `
            <div class="section">
                <p>No startup registered yet. <button class="btn btn-primary" onclick="openModal('startupModal')">Register Now</button></p>
            </div>
        `
  }

  const mentor = myStartup.mentorId ? appState.mentors.find((m) => m.id === myStartup.mentorId) : null

  return `
        <div class="section">
            <h2 class="section-title">Your Startup: ${myStartup.name}</h2>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-label">Stage</div>
                    <div class="metric-value" style="font-size: 18px; text-transform: capitalize;">${myStartup.stage}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Progress</div>
                    <div class="metric-value">${myStartup.progress}%</div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${myStartup.progress}%"></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Funding Received</div>
                    <div class="metric-value">$${(myStartup.fundingReceived / 1000).toFixed(0)}K</div>
                    <div class="metric-change">of $${(myStartup.fundingNeeded / 1000).toFixed(0)}K needed</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Assigned Mentor</div>
                    <div class="metric-value" style="font-size: 16px;">${mentor ? mentor.name : "Not assigned"}</div>
                </div>
            </div>
        </div>
    `
}

// ============================================
// PAGES
// ============================================

function renderStartupsPage() {
  return `
        <div class="section">
            <div class="flex-between mb-20">
                <h2 class="section-title">Startups</h2>
                ${
                  appState.currentUser.role === "admin"
                    ? `
                    <button class="btn btn-primary" onclick="openModal('startupModal')">+ Add Startup</button>
                `
                    : ""
                }
            </div>
            ${renderStartupsTable()}
        </div>
    `
}

function renderStartupsTable(startups = null) {
  const data = startups || appState.startups

  return `
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Founder</th>
                        <th>Stage</th>
                        <th>Progress</th>
                        <th>Funding</th>
                        <th>Mentor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                      .map((startup) => {
                        const mentor = startup.mentorId ? appState.mentors.find((m) => m.id === startup.mentorId) : null
                        return `
                            <tr>
                                <td><strong>${startup.name}</strong></td>
                                <td>${startup.founderName}</td>
                                <td><span class="badge badge-primary">${startup.stage}</span></td>
                                <td>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${startup.progress}%"></div>
                                    </div>
                                    ${startup.progress}%
                                </td>
                                <td>$${(startup.fundingReceived / 1000).toFixed(0)}K / $${(startup.fundingNeeded / 1000).toFixed(0)}K</td>
                                <td>${mentor ? mentor.name : "-"}</td>
                                <td>
                                    <button class="btn btn-secondary btn-small" onclick="editStartup('${startup.id}')">Edit</button>
                                </td>
                            </tr>
                        `
                      })
                      .join("")}
                </tbody>
            </table>
        </div>
    `
}

function renderMentorsPage() {
  return `
        <div class="section">
            <div class="flex-between mb-20">
                <h2 class="section-title">Mentors</h2>
                ${
                  appState.currentUser.role === "admin"
                    ? `
                    <button class="btn btn-primary" onclick="openModal('mentorModal')">+ Add Mentor</button>
                `
                    : ""
                }
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Expertise</th>
                            <th>Assigned Startups</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.mentors
                          .map(
                            (mentor) => `
                            <tr>
                                <td><strong>${mentor.name}</strong></td>
                                <td>${mentor.email}</td>
                                <td>${mentor.expertise.join(", ")}</td>
                                <td>${mentor.assignedStartups.length}</td>
                                <td>
                                    <button class="btn btn-secondary btn-small" onclick="openModal('allocationModal', '${mentor.id}')">Allocate</button>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `
}

function renderEventsPage() {
  return `
        <div class="section">
            <div class="flex-between mb-20">
                <h2 class="section-title">Events</h2>
                ${
                  appState.currentUser.role === "admin"
                    ? `
                    <button class="btn btn-primary" onclick="openModal('eventModal')">+ Create Event</button>
                `
                    : ""
                }
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Attendees</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.events
                          .map(
                            (event) => `
                            <tr>
                                <td><strong>${event.title}</strong></td>
                                <td><span class="badge badge-primary">${event.type}</span></td>
                                <td>${new Date(event.date).toLocaleDateString()}</td>
                                <td>${event.location}</td>
                                <td>${event.attendees.length}</td>
                                <td>
                                    <button class="btn btn-secondary btn-small" onclick="editEvent('${event.id}')">Edit</button>
                                </td>
                            </tr>
                        `,
                          )
                          .join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `
}

function renderResourcesPage() {
  return `
        <div class="section">
            <div class="flex-between mb-20">
                <h2 class="section-title">Resources</h2>
                ${
                  appState.currentUser.role === "admin"
                    ? `
                    <button class="btn btn-primary" onclick="openModal('resourceModal')">+ Add Resource</button>
                `
                    : ""
                }
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Available</th>
                            <th>Allocated</th>
                            <th>Utilization</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.resources
                          .map((resource) => {
                            const utilization = Math.round((resource.allocated / resource.availability) * 100)
                            const statusClass =
                              utilization > 80 ? "badge-danger" : utilization > 50 ? "badge-warning" : "badge-success"
                            return `
                                <tr>
                                    <td><strong>${resource.name}</strong></td>
                                    <td>${resource.type}</td>
                                    <td>${resource.availability}</td>
                                    <td>${resource.allocated}</td>
                                    <td><span class="badge ${statusClass}">${utilization}%</span></td>
                                    <td>
                                        <button class="btn btn-secondary btn-small" onclick="editResource('${resource.id}')">Edit</button>
                                    </td>
                                </tr>
                            `
                          })
                          .join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `
}

function renderFundingPage() {
  return `
        <div class="section">
            <div class="flex-between mb-20">
                <h2 class="section-title">Funding Management</h2>
                <button class="btn btn-primary" onclick="openModal('fundingModal')">+ New Funding Round</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Round Name</th>
                            <th>Total Amount</th>
                            <th>Allocated</th>
                            <th>Remaining</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appState.fundingRounds
                          .map((round) => {
                            const remaining = round.totalAmount - round.allocatedAmount
                            return `
                                <tr>
                                    <td><strong>${round.name}</strong></td>
                                    <td>$${(round.totalAmount / 1000).toFixed(0)}K</td>
                                    <td>$${(round.allocatedAmount / 1000).toFixed(0)}K</td>
                                    <td>$${(remaining / 1000).toFixed(0)}K</td>
                                    <td><span class="badge badge-success">${round.status}</span></td>
                                    <td>
                                        <button class="btn btn-secondary btn-small" onclick="openModal('fundingAllocationModal', '${round.id}')">Allocate</button>
                                    </td>
                                </tr>
                            `
                          })
                          .join("")}
                    </tbody>
                </table>
            </div>
        </div>
    `
}

function renderReportsPage() {
  return `
        <div class="section">
            <div class="flex-between mb-20">
                <h2 class="section-title">Reports</h2>
                <button class="btn btn-primary" onclick="openModal('reportModal')">+ Generate Report</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Report Type</th>
                            <th>Generated Date</th>
                            <th>Period</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Performance Report</strong></td>
                            <td>${new Date().toLocaleDateString()}</td>
                            <td>Q1 2024</td>
                            <td><button class="btn btn-secondary btn-small" onclick="downloadReport('performance')">Download</button></td>
                        </tr>
                        <tr>
                            <td><strong>Funding Report</strong></td>
                            <td>${new Date().toLocaleDateString()}</td>
                            <td>Q1 2024</td>
                            <td><button class="btn btn-secondary btn-small" onclick="downloadReport('funding')">Download</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
}

function renderProfilePage() {
  const user = appState.currentUser
  const startup = appState.startups.find((s) => s.founderEmail === user.email)

  return `
        <div class="section">
            <h2 class="section-title">My Profile</h2>
            <div class="table-container" style="padding: 20px;">
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Role:</strong> ${user.role}</p>
                ${
                  startup
                    ? `
                    <p><strong>Startup:</strong> ${startup.name}</p>
                    <p><strong>Industry:</strong> ${startup.industry}</p>
                `
                    : ""
                }
            </div>
        </div>
    `
}

// ============================================
// MODALS
// ============================================

function renderModals() {
  return `
        <!-- Startup Modal -->
        <div id="startupModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Register Startup</span>
                    <button class="modal-close" onclick="closeModal('startupModal')">×</button>
                </div>
                <form onsubmit="handleStartupSubmit(event)">
                    <div class="form-group">
                        <label>Startup Name</label>
                        <input type="text" id="startupName" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="startupDesc" required></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Founder Name</label>
                            <input type="text" id="founderName" required>
                        </div>
                        <div class="form-group">
                            <label>Founder Email</label>
                            <input type="email" id="founderEmail" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Industry</label>
                            <input type="text" id="industry" required>
                        </div>
                        <div class="form-group">
                            <label>Stage</label>
                            <select id="stage" required>
                                <option value="idea">Idea</option>
                                <option value="mvp">MVP</option>
                                <option value="growth">Growth</option>
                                <option value="scaling">Scaling</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Funding Needed ($)</label>
                        <input type="number" id="fundingNeeded" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('startupModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Mentor Modal -->
        <div id="mentorModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Add Mentor</span>
                    <button class="modal-close" onclick="closeModal('mentorModal')">×</button>
                </div>
                <form onsubmit="handleMentorSubmit(event)">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" id="mentorName" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="mentorEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Expertise (comma-separated)</label>
                        <input type="text" id="mentorExpertise" required>
                    </div>
                    <div class="form-group">
                        <label>Bio</label>
                        <textarea id="mentorBio" required></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('mentorModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Mentor</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Allocation Modal -->
        <div id="allocationModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Allocate Startups to Mentor</span>
                    <button class="modal-close" onclick="closeModal('allocationModal')">×</button>
                </div>
                <form onsubmit="handleAllocationSubmit(event)">
                    <div class="form-group">
                        <label>Select Startups:</label>
                        <div id="startupCheckboxes"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('allocationModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Allocate</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Event Modal -->
        <div id="eventModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Create Event</span>
                    <button class="modal-close" onclick="closeModal('eventModal')">×</button>
                </div>
                <form onsubmit="handleEventSubmit(event)">
                    <div class="form-group">
                        <label>Event Title</label>
                        <input type="text" id="eventTitle" required>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea id="eventDesc" required></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Date</label>
                            <input type="date" id="eventDate" required>
                        </div>
                        <div class="form-group">
                            <label>Type</label>
                            <select id="eventType" required>
                                <option value="workshop">Workshop</option>
                                <option value="networking">Networking</option>
                                <option value="pitch">Pitch</option>
                                <option value="mentoring">Mentoring</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Location</label>
                        <input type="text" id="eventLocation" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('eventModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Create Event</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Funding Allocation Modal -->
        <div id="fundingAllocationModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Allocate Funding</span>
                    <button class="modal-close" onclick="closeModal('fundingAllocationModal')">×</button>
                </div>
                <form onsubmit="handleFundingAllocationSubmit(event)">
                    <div id="fundingAllocationContent"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('fundingAllocationModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Allocate</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Report Modal -->
        <div id="reportModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <span>Generate Report</span>
                    <button class="modal-close" onclick="closeModal('reportModal')">×</button>
                </div>
                <form onsubmit="handleReportSubmit(event)">
                    <div class="form-group">
                        <label>Report Type</label>
                        <select id="reportType" required>
                            <option value="performance">Performance Report</option>
                            <option value="progress">Progress Report</option>
                            <option value="funding">Funding Report</option>
                            <option value="comprehensive">Comprehensive Report</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Period</label>
                        <select id="reportPeriod" required>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal('reportModal')">Cancel</button>
                        <button type="submit" class="btn btn-primary">Generate</button>
                    </div>
                </form>
            </div>
        </div>
    `
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(modalId, data = null) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.add("active")

    if (modalId === "allocationModal" && data) {
      populateStartupCheckboxes(data)
    } else if (modalId === "fundingAllocationModal" && data) {
      populateFundingAllocation(data)
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.classList.remove("active")
  }
}

function populateStartupCheckboxes(mentorId) {
  const mentor = appState.mentors.find((m) => m.id === mentorId)
  const container = document.getElementById("startupCheckboxes")

  container.innerHTML = appState.startups
    .map(
      (startup) => `
        <div style="margin-bottom: 10px;">
            <input type="checkbox" id="startup-${startup.id}" value="${startup.id}" 
                ${mentor.assignedStartups.includes(startup.id) ? "checked" : ""}>
            <label for="startup-${startup.id}" style="margin-left: 8px;">${startup.name}</label>
        </div>
    `,
    )
    .join("")

  document.getElementById("allocationModal").dataset.mentorId = mentorId
}

function populateFundingAllocation(roundId) {
  const round = appState.fundingRounds.find((r) => r.id === roundId)
  const remaining = round.totalAmount - round.allocatedAmount
  const container = document.getElementById("fundingAllocationContent")

  container.innerHTML = `
        <div class="form-group">
            <p><strong>Total Available:</strong> $${(remaining / 1000).toFixed(0)}K</p>
        </div>
        ${appState.startups
          .map((startup) => {
            const existing = round.startupAllocations.find((a) => a.startupId === startup.id)
            return `
                <div class="form-group">
                    <label>${startup.name}</label>
                    <input type="number" class="funding-input" data-startup-id="${startup.id}" 
                        value="${existing ? existing.amount : 0}" min="0" max="${remaining}">
                </div>
            `
          })
          .join("")}
    `

  document.getElementById("fundingAllocationModal").dataset.roundId = roundId
}

// ============================================
// FORM HANDLERS
// ============================================

function handleStartupSubmit(event) {
  event.preventDefault()

  const startup = {
    id: "startup-" + Date.now(),
    name: document.getElementById("startupName").value,
    description: document.getElementById("startupDesc").value,
    founderName: document.getElementById("founderName").value,
    founderEmail: document.getElementById("founderEmail").value,
    industry: document.getElementById("industry").value,
    stage: document.getElementById("stage").value,
    fundingNeeded: Number.parseInt(document.getElementById("fundingNeeded").value),
    fundingReceived: 0,
    progress: 0,
    createdAt: new Date(),
  }

  appState.startups.push(startup)
  closeModal("startupModal")
  renderDashboard()
}

function handleMentorSubmit(event) {
  event.preventDefault()

  const mentor = {
    id: "mentor-" + Date.now(),
    name: document.getElementById("mentorName").value,
    email: document.getElementById("mentorEmail").value,
    expertise: document
      .getElementById("mentorExpertise")
      .value.split(",")
      .map((e) => e.trim()),
    bio: document.getElementById("mentorBio").value,
    assignedStartups: [],
  }

  appState.mentors.push(mentor)
  closeModal("mentorModal")
  renderDashboard()
}

function handleAllocationSubmit(event) {
  event.preventDefault()

  const mentorId = document.getElementById("allocationModal").dataset.mentorId
  const mentor = appState.mentors.find((m) => m.id === mentorId)
  const checkboxes = document.querySelectorAll('#startupCheckboxes input[type="checkbox"]:checked')

  mentor.assignedStartups = Array.from(checkboxes).map((cb) => cb.value)

  appState.startups.forEach((startup) => {
    if (mentor.assignedStartups.includes(startup.id)) {
      startup.mentorId = mentorId
    }
  })

  closeModal("allocationModal")
  renderDashboard()
}

function handleEventSubmit(event) {
  event.preventDefault()

  const eventObj = {
    id: "event-" + Date.now(),
    title: document.getElementById("eventTitle").value,
    description: document.getElementById("eventDesc").value,
    date: new Date(document.getElementById("eventDate").value),
    type: document.getElementById("eventType").value,
    location: document.getElementById("eventLocation").value,
    attendees: [],
  }

  appState.events.push(eventObj)
  closeModal("eventModal")
  renderDashboard()
}

function handleFundingAllocationSubmit(event) {
  event.preventDefault()

  const roundId = document.getElementById("fundingAllocationModal").dataset.roundId
  const round = appState.fundingRounds.find((r) => r.id === roundId)
  const inputs = document.querySelectorAll(".funding-input")

  round.startupAllocations = []
  let totalAllocated = 0

  inputs.forEach((input) => {
    const amount = Number.parseInt(input.value) || 0
    if (amount > 0) {
      round.startupAllocations.push({
        startupId: input.dataset.startupId,
        amount: amount,
      })
      totalAllocated += amount
    }
  })

  round.allocatedAmount = totalAllocated

  closeModal("fundingAllocationModal")
  renderDashboard()
}

function handleReportSubmit(event) {
  event.preventDefault()

  const reportType = document.getElementById("reportType").value
  const period = document.getElementById("reportPeriod").value

  alert(`Report generated: ${reportType} (${period})`)
  closeModal("reportModal")
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function navigateTo(page) {
  appState.currentPage = page
  renderDashboard()
}

function handleLogout() {
  appState.currentUser = null
  renderLoginPage()
}

function editStartup(id) {
  alert("Edit startup: " + id)
}

function editEvent(id) {
  alert("Edit event: " + id)
}

function editResource(id) {
  alert("Edit resource: " + id)
}

function downloadReport(type) {
  alert("Downloading " + type + " report...")
}

function attachEventListeners() {
  document.querySelectorAll(".sidebar-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".sidebar-btn").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active")
      }
    })
  })
}

// ============================================
// CHARTS
// ============================================

function initializeCharts() {
  setTimeout(() => {
    const fundingCtx = document.getElementById("fundingChart")
    const stageCtx = document.getElementById("stageChart")

    if (fundingCtx) {
      new Chart(fundingCtx, {
        type: "bar",
        data: {
          labels: appState.startups.map((s) => s.name),
          datasets: [
            {
              label: "Funding Received",
              data: appState.startups.map((s) => s.fundingReceived / 1000),
              backgroundColor: "#2563eb",
            },
            {
              label: "Funding Needed",
              data: appState.startups.map((s) => s.fundingNeeded / 1000),
              backgroundColor: "#e5e7eb",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
          },
        },
      })
    }

    if (stageCtx) {
      const stageCounts = {}
      appState.startups.forEach((s) => {
        stageCounts[s.stage] = (stageCounts[s.stage] || 0) + 1
      })

      new Chart(stageCtx, {
        type: "doughnut",
        data: {
          labels: Object.keys(stageCounts),
          datasets: [
            {
              data: Object.values(stageCounts),
              backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#ef4444"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      })
    }
  }, 100)
}

// Initialize App on Load
document.addEventListener("DOMContentLoaded", initApp)
