"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import { VotingResults, Candidate } from "@/types/election"

interface ResultsTableProps {
  stations: VotingResults[] // Changé de VotingStation à VotingResults
  candidates: Candidate[]
  selectedRegion: string
  selectedDepartment: string
  onRegionChange: (region: string) => void
  onDepartmentChange: (department: string) => void
}

export function ResultsTable({
  stations,
  candidates,
  selectedRegion,
  selectedDepartment,
  onRegionChange,
  onDepartmentChange,
}: ResultsTableProps) {
  const regions = Array.from(new Set(stations.map(s => s.region)))
  const departments = Array.from(new Set(
    stations
      .filter(s => !selectedRegion || s.region === selectedRegion)
      .map(s => s.department)
  ))

  const filteredStations = stations.filter(station => 
    (!selectedRegion || station.region === selectedRegion) &&
    (!selectedDepartment || station.department === selectedDepartment)
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedRegion || "Toutes les régions"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onRegionChange("")}>
              Toutes les régions
            </DropdownMenuItem>
            {regions.map(region => (
              <DropdownMenuItem 
                key={region} 
                onClick={() => onRegionChange(region)}
              >
                {region}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedDepartment || "Tous les départements"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onDepartmentChange("")}>
              Tous les départements
            </DropdownMenuItem>
            {departments.map(department => (
              <DropdownMenuItem 
                key={department} 
                onClick={() => onDepartmentChange(department)}
              >
                {department}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bureau de Vote</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Département</TableHead>
              {candidates.map(candidate => (
                <TableHead key={candidate.id}>
                  {candidate.firstName} {candidate.lastName}
                </TableHead>
              ))}
              <TableHead>Total Votes</TableHead>
              <TableHead>Votes Nuls</TableHead>
              <TableHead>Votes Blancs</TableHead>
              <TableHead>Inscrits</TableHead>
              <TableHead>Votants</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStations.map(station => (
              <TableRow key={station.id}>
                <TableCell>{station.id}</TableCell>
                <TableCell>{station.region}</TableCell>
                <TableCell>{station.department}</TableCell>
                {candidates.map(candidate => (
                  <TableCell key={candidate.id}>
                    {station.candidateVotes.find(cv => cv.candidateId === candidate.id)?.votes || 0}
                  </TableCell>
                ))}
                <TableCell>
                  {station.candidateVotes.reduce((sum, cv) => sum + cv.votes, 0)}
                </TableCell>
                <TableCell>{station.nullVotes}</TableCell>
                <TableCell>{station.blankVotes}</TableCell>
                <TableCell>{station.registeredVoters}</TableCell>
                <TableCell>{station.actualVoters}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

