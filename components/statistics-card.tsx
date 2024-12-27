import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AggregatedResults, Candidate } from "@/types/election"

interface StatisticsCardProps {
  results: AggregatedResults
  candidates: Candidate[]
  title: string
}

export function StatisticsCard({ results, candidates, title }: StatisticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Taux de participation</p>
              <p className="text-2xl font-bold">
                {results.participationRate}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Total votes exprimés</p>
              <p className="text-2xl font-bold">{results.totalVotes}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Résultats par candidat</h4>
            {candidates.map(candidate => (
              <div key={candidate.id} className="flex items-center justify-between">
                <span className="text-sm">
                  {candidate.firstName} {candidate.lastName}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {results.candidateVotes[candidate.id]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({results.candidatePercentages[candidate.id]}%)
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-sm font-medium">Votes nuls</p>
              <p>{results.nullVotes}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Votes blancs</p>
              <p>{results.blankVotes}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

