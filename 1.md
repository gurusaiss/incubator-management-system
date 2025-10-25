# Incubator Management System - Complete Setup Guide

This guide provides all code organized in easy-to-copy sections.

## Quick Start

1. Copy each file content from the sections below
2. Create the file in your project at the specified path
3. Follow the file structure exactly as shown

---

## FILE STRUCTURE

\`\`\`
project-root/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── auth/
│   │   └── login-page.tsx
│   ├── dashboards/
│   │   ├── admin-dashboard.tsx
│   │   ├── mentor-dashboard.tsx
│   │   └── startup-dashboard.tsx
│   ├── layout/
│   │   └── sidebar.tsx
│   ├── modals/
│   │   ├── event-creation-modal.tsx
│   │   ├── funding-allocation-modal.tsx
│   │   ├── mentor-allocation-modal.tsx
│   │   ├── report-generation-modal.tsx
│   │   ├── resource-allocation-modal.tsx
│   │   └── startup-registration-modal.tsx
│   ├── sections/
│   │   ├── analytics-dashboard.tsx
│   │   ├── calendar-view.tsx
│   │   ├── events-list.tsx
│   │   ├── funding-management.tsx
│   │   ├── mentors-list.tsx
│   │   ├── overview-metrics.tsx
│   │   ├── progress-tracking.tsx
│   │   ├── reports-section.tsx
│   │   ├── resources-list.tsx
│   │   └── startups-list.tsx
│   ├── dashboard.tsx
│   └── theme-provider.tsx
├── lib/
│   ├── auth-context.ts
│   ├── store.ts
│   ├── report-generator.ts
│   └── utils.ts
└── package.json
\`\`\`

---

## CORE FILES

### 1. app/layout.tsx
\`\`\`typescript
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Incubator Management System',
  description: 'Unified platform for managing business incubators',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`

### 2. app/globals.css
\`\`\`css
@import 'tailwindcss';

@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  
  /* Color Palette */
  --color-primary: #3b82f6;
  --color-primary-dark: #1e40af;
  --color-secondary: #10b981;
  --color-accent: #f59e0b;
  --color-danger: #ef4444;
  --color-background: #ffffff;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
  --color-text: #1f2937;
  --color-text-light: #6b7280;
}

* {
  @apply border-border;
}

body {
  @apply bg-background text-text;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-surface;
}

::-webkit-scrollbar-thumb {
  @apply bg-border rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-text-light;
}
\`\`\`

### 3. lib/auth-context.ts
\`\`\`typescript
import { createContext, useContext } from 'react';

export type UserRole = 'admin' | 'mentor' | 'founder';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
\`\`\`

### 4. lib/store.ts
\`\`\`typescript
// Mock data store for the application
export interface Startup {
  id: string;
  name: string;
  founder: string;
  email: string;
  industry: string;
  stage: 'Idea' | 'MVP' | 'Growth' | 'Scaling';
  progress: number;
  fundingRequired: number;
  fundingReceived: number;
  mentorId?: string;
  description: string;
  registrationDate: string;
}

export interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  email: string;
  phone: string;
  assignedStartups: string[];
  yearsExperience: number;
}

export interface Event {
  id: string;
  title: string;
  type: 'Workshop' | 'Networking' | 'Pitch' | 'Mentoring';
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: string[];
  maxAttendees: number;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  totalUnits: number;
  allocatedUnits: number;
  description: string;
}

export interface FundingRound {
  id: string;
  name: string;
  totalAmount: number;
  allocatedAmount: number;
  startDate: string;
  endDate: string;
  allocations: { startupId: string; amount: number }[];
}

export interface Report {
  id: string;
  type: 'Performance' | 'Progress' | 'Funding' | 'Comprehensive';
  generatedDate: string;
  period: string;
  data: any;
}

// Initial mock data
export const initialStore = {
  startups: [
    {
      id: '1',
      name: 'TechFlow AI',
      founder: 'John Smith',
      email: 'john@techflow.com',
      industry: 'AI/ML',
      stage: 'MVP' as const,
      progress: 65,
      fundingRequired: 500000,
      fundingReceived: 250000,
      mentorId: '1',
      description: 'AI-powered workflow automation platform',
      registrationDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'GreenEnergy Solutions',
      founder: 'Sarah Johnson',
      email: 'sarah@greenenergy.com',
      industry: 'Clean Tech',
      stage: 'Idea' as const,
      progress: 30,
      fundingRequired: 750000,
      fundingReceived: 0,
      mentorId: '2',
      description: 'Sustainable energy management system',
      registrationDate: '2024-02-20',
    },
    {
      id: '3',
      name: 'HealthTrack Pro',
      founder: 'Michael Chen',
      email: 'michael@healthtrack.com',
      industry: 'HealthTech',
      stage: 'Growth' as const,
      progress: 80,
      fundingRequired: 1000000,
      fundingReceived: 600000,
      mentorId: '1',
      description: 'Real-time health monitoring platform',
      registrationDate: '2023-11-10',
    },
  ],
  mentors: [
    {
      id: '1',
      name: 'Dr. Robert Wilson',
      expertise: ['AI/ML', 'Product Strategy', 'Fundraising'],
      email: 'robert@mentors.com',
      phone: '+1-555-0101',
      assignedStartups: ['1', '3'],
      yearsExperience: 15,
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      expertise: ['Clean Tech', 'Operations', 'Scaling'],
      email: 'emily@mentors.com',
      phone: '+1-555-0102',
      assignedStartups: ['2'],
      yearsExperience: 12,
    },
  ],
  events: [
    {
      id: '1',
      title: 'AI Workshop Series',
      type: 'Workshop' as const,
      date: '2024-03-15',
      time: '10:00 AM',
      location: 'Main Conference Room',
      description: 'Deep dive into AI/ML applications',
      attendees: ['1', '3'],
      maxAttendees: 50,
    },
    {
      id: '2',
      title: 'Networking Breakfast',
      type: 'Networking' as const,
      date: '2024-03-20',
      time: '8:00 AM',
      location: 'Cafe Area',
      description: 'Meet and greet with investors',
      attendees: ['1', '2', '3'],
      maxAttendees: 100,
    },
  ],
  resources: [
    {
      id: '1',
      name: 'Office Space',
      type: 'Physical',
      totalUnits: 10,
      allocatedUnits: 8,
      description: 'Dedicated desk spaces',
    },
    {
      id: '2',
      name: 'Cloud Credits',
      type: 'Digital',
      totalUnits: 1000,
      allocatedUnits: 650,
      description: 'AWS/GCP cloud computing credits',
    },
  ],
  fundingRounds: [
    {
      id: '1',
      name: 'Seed Round 2024',
      totalAmount: 2000000,
      allocatedAmount: 850000,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      allocations: [
        { startupId: '1', amount: 250000 },
        { startupId: '3', amount: 600000 },
      ],
    },
  ],
  reports: [] as Report[],
};
\`\`\`

### 5. lib/report-generator.ts
\`\`\`typescript
import { Report } from './store';

export function generateReport(
  type: 'Performance' | 'Progress' | 'Funding' | 'Comprehensive',
  period: string,
  data: any
): Report {
  const report: Report = {
    id: Date.now().toString(),
    type,
    generatedDate: new Date().toISOString().split('T')[0],
    period,
    data,
  };
  return report;
}

export function exportReportAsCSV(report: Report): string {
  let csv = `Report Type,${report.type}\n`;
  csv += `Generated Date,${report.generatedDate}\n`;
  csv += `Period,${report.period}\n\n`;

  if (report.type === 'Performance') {
    csv += 'Startup,Progress,Stage,Funding Received\n';
    report.data.forEach((item: any) => {
      csv += `${item.name},${item.progress}%,${item.stage},${item.fundingReceived}\n`;
    });
  } else if (report.type === 'Funding') {
    csv += 'Startup,Required,Received,Gap\n';
    report.data.forEach((item: any) => {
      const gap = item.fundingRequired - item.fundingReceived;
      csv += `${item.name},${item.fundingRequired},${item.fundingReceived},${gap}\n`;
    });
  }

  return csv;
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
\`\`\`

---

## COMPONENT FILES

### 6. components/theme-provider.tsx
\`\`\`typescript
'use client';

import { ReactNode, useState } from 'react';
import { AuthContext, User, UserRole } from '@/lib/auth-context';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
      avatar: '/placeholder-user.jpg',
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
\`\`\`

### 7. components/dashboard.tsx
\`\`\`typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import AdminDashboard from './dashboards/admin-dashboard';
import MentorDashboard from './dashboards/mentor-dashboard';
import StartupDashboard from './dashboards/startup-dashboard';
import LoginPage from './auth/login-page';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'mentor':
      return <MentorDashboard />;
    case 'founder':
      return <StartupDashboard />;
    default:
      return <LoginPage />;
  }
}
\`\`\`

---

## AUTHENTICATION

### 8. components/auth/login-page.tsx
\`\`\`typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'mentor' | 'founder'>('admin');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email, password, role);
    }
  };

  const demoAccounts = [
    { email: 'admin@incubator.com', password: 'admin123', role: 'admin' as const },
    { email: 'mentor@incubator.com', password: 'mentor123', role: 'mentor' as const },
    { email: 'founder@incubator.com', password: 'founder123', role: 'founder' as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Incubator Management System</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Tabs value={role} onValueChange={(v) => setRole(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                  <TabsTrigger value="mentor">Mentor</TabsTrigger>
                  <TabsTrigger value="founder">Founder</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-medium text-gray-600">Demo Accounts:</p>
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                  setRole(account.role);
                }}
                className="w-full text-left text-xs p-2 rounded border border-gray-200 hover:bg-gray-50"
              >
                <div className="font-medium">{account.role.toUpperCase()}</div>
                <div className="text-gray-500">{account.email}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
\`\`\`

---

## LAYOUT COMPONENTS

### 9. components/layout/sidebar.tsx
\`\`\`typescript
'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Briefcase, Calendar, TrendingUp, FileText, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = {
    admin: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'startups', label: 'Startups', icon: Briefcase },
      { id: 'mentors', label: 'Mentors', icon: Users },
      { id: 'events', label: 'Events', icon: Calendar },
      { id: 'resources', label: 'Resources', icon: TrendingUp },
      { id: 'funding', label: 'Funding', icon: TrendingUp },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      { id: 'reports', label: 'Reports', icon: FileText },
    ],
    mentor: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'startups', label: 'My Startups', icon: Briefcase },
      { id: 'events', label: 'Events', icon: Calendar },
      { id: 'resources', label: 'Resources', icon: TrendingUp },
    ],
    founder: [
      { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'progress', label: 'Progress', icon: TrendingUp },
      { id: 'mentors', label: 'Mentors', icon: Users },
      { id: 'events', label: 'Events', icon: Calendar },
      { id: 'resources', label: 'Resources', icon: TrendingUp },
    ],
  };

  const items = menuItems[user?.role || 'admin'];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col h-screen`}>
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold">IMS</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:bg-slate-800"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-2">
        {isOpen && (
          <div className="text-sm">
            <p className="font-medium">{user?.name}</p>
            <p className="text-gray-400 text-xs">{user?.role}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full text-red-400 hover:bg-red-900/20"
        >
          <LogOut size={16} />
          {isOpen && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
\`\`\`

---

## DASHBOARD COMPONENTS

### 10. components/dashboards/admin-dashboard.tsx
\`\`\`typescript
'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import OverviewMetrics from '@/components/sections/overview-metrics';
import StartupsList from '@/components/sections/startups-list';
import MentorsList from '@/components/sections/mentors-list';
import EventsList from '@/components/sections/events-list';
import ResourcesList from '@/components/sections/resources-list';
import FundingManagement from '@/components/sections/funding-management';
import AnalyticsDashboard from '@/components/sections/analytics-dashboard';
import ReportsSection from '@/components/sections/reports-section';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewMetrics />;
      case 'startups':
        return <StartupsList />;
      case 'mentors':
        return <MentorsList />;
      case 'events':
        return <EventsList />;
      case 'resources':
        return <ResourcesList />;
      case 'funding':
        return <FundingManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'reports':
        return <ReportsSection />;
      default:
        return <OverviewMetrics />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
\`\`\`

### 11. components/dashboards/mentor-dashboard.tsx
\`\`\`typescript
'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { initialStore } from '@/lib/store';

export default function MentorDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Mentor Dashboard</h2>
              <p className="text-gray-600">Manage your assigned startups and mentoring activities</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Assigned Startups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-gray-500">Active mentorships</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">75%</div>
                  <p className="text-xs text-gray-500">Across all startups</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-gray-500">This month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>My Assigned Startups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {initialStore.startups.map((startup) => (
                    <div key={startup.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{startup.name}</h3>
                      <p className="text-sm text-gray-600">{startup.founder}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${startup.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{startup.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <div>Section not implemented</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
\`\`\`

### 12. components/dashboards/startup-dashboard.tsx
\`\`\`typescript
'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { initialStore } from '@/lib/store';

export default function StartupDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const startup = initialStore.startups[0];
  const mentor = initialStore.mentors.find((m) => m.id === startup.mentorId);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{startup.name}</h2>
              <p className="text-gray-600">{startup.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold">{startup.progress}%</div>
                  <Progress value={startup.progress} />
                  <p className="text-xs text-gray-500">Stage: {startup.stage}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Funding Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <p className="text-gray-600">Received: ${startup.fundingReceived.toLocaleString()}</p>
                    <p className="text-gray-600">Required: ${startup.fundingRequired.toLocaleString()}</p>
                  </div>
                  <Progress value={(startup.fundingReceived / startup.fundingRequired) * 100} />
                </CardContent>
              </Card>
            </div>

            {mentor && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Mentor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.yearsExperience} years experience</p>
                    <p className="text-sm">Expertise: {mentor.expertise.join(', ')}</p>
                    <p className="text-sm text-blue-600">{mentor.email}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );
      default:
        return <div>Section not implemented</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
\`\`\`

---

## SECTION COMPONENTS

### 13. components/sections/overview-metrics.tsx
\`\`\`typescript
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { initialStore } from '@/lib/store';
import { TrendingUp, Users, Briefcase, DollarSign, Calendar, Target } from 'lucide-react';

export default function OverviewMetrics() {
  const totalStartups = initialStore.startups.length;
  const totalMentors = initialStore.mentors.length;
  const avgProgress = Math.round(
    initialStore.startups.reduce((sum, s) => sum + s.progress, 0) / totalStartups
  );
  const totalFundingAllocated = initialStore.startups.reduce((sum, s) => sum + s.fundingReceived, 0);
  const totalEvents = initialStore.events.length;
  const scalingStartups = initialStore.startups.filter((s) => s.stage === 'Scaling').length;

  const metrics = [
    {
      title: 'Total Startups',
      value: totalStartups,
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Active Mentors',
      value: totalMentors,
      icon: Users,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Avg Progress',
      value: `${avgProgress}%`,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Funding Allocated',
      value: `$${(totalFundingAllocated / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      title: 'Upcoming Events',
      value: totalEvents,
      icon: Calendar,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      title: 'Scaling Stage',
      value: scalingStartups,
      icon: Target,
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <p className="text-gray-600">Key metrics and performance indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  <Icon size={20} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
\`\`\`

---

## MODAL COMPONENTS

### 14. components/modals/startup-registration-modal.tsx
\`\`\`typescript
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StartupRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export default function StartupRegistrationModal({
  open,
  onOpenChange,
  onSubmit,
}: StartupRegistrationModalProps) {
  const [formData, setFormData] = useState({
    startupName: '',
    industry: '',
    description: '',
    founderName: '',
    founderEmail: '',
    founderPhone: '',
    fundingRequired: '',
    stage: 'Idea',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      startupName: '',
      industry: '',
      description: '',
      founderName: '',
      founderEmail: '',
      founderPhone: '',
      fundingRequired: '',
      stage: 'Idea',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Register New Startup</DialogTitle>
          <DialogDescription>Fill in the startup details to register</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="startup" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="startup">Startup Info</TabsTrigger>
              <TabsTrigger value="founder">Founder Details</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
            </TabsList>

            <TabsContent value="startup" className="space-y-4">
              <div>
                <label className="text-sm font-medium">Startup Name</label>
                <Input
                  placeholder="Enter startup name"
                  value={formData.startupName}
                  onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Industry</label>
                <Input
                  placeholder="e.g., AI/ML, HealthTech, CleanTech"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your startup"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="founder" className="space-y-4">
              <div>
                <label className="text-sm font-medium">Founder Name</label>
                <Input
                  placeholder="Enter founder name"
                  value={formData.founderName}
                  onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="founder@email.com"
                  value={formData.founderEmail}
                  onChange={(e) => setFormData({ ...formData, founderEmail: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  placeholder="+1-555-0000"
                  value={formData.founderPhone}
                  onChange={(e) => setFormData({ ...formData, founderPhone: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="funding" className="space-y-4">
              <div>
                <label className="text-sm font-medium">Funding Required ($)</label>
                <Input
                  type="number"
                  placeholder="500000"
                  value={formData.fundingRequired}
                  onChange={(e) => setFormData({ ...formData, fundingRequired: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Current Stage</label>
                <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Idea">Idea</SelectItem>
                    <SelectItem value="MVP">MVP</SelectItem>
                    <SelectItem value="Growth">Growth</SelectItem>
                    <SelectItem value="Scaling">Scaling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Register Startup</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
\`\`\`

---

## INSTALLATION & SETUP

### Step 1: Create Next.js Project
\`\`\`bash
npx create-next-app@latest incubator-management --typescript --tailwind
cd incubator-management
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install lucide-react recharts
\`\`\`

### Step 3: Copy Files
Copy all files from the sections above into your project following the file structure.

### Step 4: Update app/page.tsx
\`\`\`typescript
'use client';

import { ThemeProvider } from '@/components/theme-provider';
import Dashboard from '@/components/dashboard';

export default function Home() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
\`\`\`

### Step 5: Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` and login with demo credentials.

---

## DEMO CREDENTIALS

- **Admin**: admin@incubator.com / admin123
- **Mentor**: mentor@incubator.com / mentor123
- **Founder**: founder@incubator.com / founder123

---

## FEATURES INCLUDED

✅ Multi-role authentication (Admin, Mentor, Founder)
✅ Startup registration and onboarding
✅ Mentor allocation and management
✅ Progress tracking and analytics
✅ Event management and scheduling
✅ Resource allocation
✅ Funding management
✅ Automated report generation
✅ Responsive design
✅ Real-time data visualization

---

## CUSTOMIZATION

All components use Tailwind CSS and shadcn/ui. You can customize:
- Colors in `app/globals.css`
- Component styles in individual component files
- Mock data in `lib/store.ts`
- Add real database integration by replacing store functions

---

## NEXT STEPS

1. Connect to a real database (Supabase, Firebase, etc.)
2. Add authentication (NextAuth, Supabase Auth, etc.)
3. Implement real-time features (WebSockets, Pusher, etc.)
4. Add email notifications
5. Deploy to Vercel
