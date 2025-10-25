// Local state management for the incubator system
export interface Startup {
  id: string
  name: string
  description: string
  founderName: string
  founderEmail: string
  industry: string
  stage: "idea" | "mvp" | "growth" | "scaling"
  mentorId?: string
  fundingNeeded: number
  fundingReceived: number
  createdAt: Date
  progress: number
}

export interface Mentor {
  id: string
  name: string
  email: string
  expertise: string[]
  assignedStartups: string[]
  bio: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  type: "workshop" | "networking" | "pitch" | "mentoring"
  attendees: string[]
}

export interface Resource {
  id: string
  name: string
  type: "office-space" | "software" | "equipment" | "service"
  availability: number
  allocated: number
  description: string
}

export interface FundingRound {
  id: string
  name: string
  totalAmount: number
  allocatedAmount: number
  startupAllocations: { startupId: string; amount: number }[]
  status: "open" | "closed" | "completed"
}

// Mock data store
export const mockStore = {
  startups: [] as Startup[],
  mentors: [] as Mentor[],
  events: [] as Event[],
  resources: [] as Resource[],
  fundingRounds: [] as FundingRound[],
}

// Initialize with sample data
export function initializeMockData() {
  mockStore.mentors = [
    {
      id: "mentor-1",
      name: "Sarah Chen",
      email: "sarah@mentors.com",
      expertise: ["Product Strategy", "Growth Marketing", "B2B SaaS"],
      assignedStartups: [],
      bio: "Former VP of Product at TechCorp with 15 years experience",
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

  mockStore.resources = [
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

  mockStore.fundingRounds = [
    {
      id: "fund-1",
      name: "Seed Round 2024",
      totalAmount: 500000,
      allocatedAmount: 0,
      startupAllocations: [],
      status: "open",
    },
  ]
}
