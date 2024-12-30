export interface VotingStation {
    id: string
    region: string
    department: string
    commune: string
    openingTime: string
    closingTime: string
    registeredVoters: number
    actualVoters: number
    nullVotes: number
    blankVotes: number
    authenticated: boolean
  }
  
  export interface CandidateVotes {
    candidateId: string
    votes: number
  }
  
  export interface Candidate {
    id: string
    firstName: string
    lastName: string
    party: string
  }
  
  export interface VotingResults {
    id: string
    region: string
    department: string
    commune: string
    openingTime: string
    closingTime: string
    registeredVoters: number
    actualVoters: number
    nullVotes: number
    blankVotes: number
    authenticated: boolean
    candidateVotes: Array<{
      candidateId: string
      votes: number
    }>
  }
  
  
  
  export interface AggregatedResults {
    totalVotes: number
    nullVotes: number
    blankVotes: number
    registeredVoters: number
    actualVoters: number
    candidateVotes: Record<string, number>
    candidatePercentages: Record<string, number>
    participationRate: number
  }
  
  