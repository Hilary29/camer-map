export interface CandidateVote {
  candidateId: string
  votes: number
}

export interface VotingResults {
  id: string
  region: string
  department: string
  commune: string
  candidateVotes: CandidateVote[]
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
  
  export interface VotingStationFormProps {
    candidates: Candidate[]
    onSubmit: (data: VotingResults) => Promise<void>
    onAddCandidate: (candidate: Omit<Candidate, "id">) => Promise<void>
    onRemoveCandidate: (id: string) => Promise<void>
  }
  