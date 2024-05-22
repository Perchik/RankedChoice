# Product Requirements Document (PRD)

## Functional Overview

- **Product Name**: ElectionSim
- **Version**: 1.0
- **Release Date**: [TBD]
- **Owner**: [Owner's Name]

**Objective**: 
ElectionSim is a web-based application that enables users to configure and simulate ranked choice voting (RCV) elections. Users can visualize how different RCV algorithms work and compare these to standard voting schemes.

## Requirement Objectives

**Problems to Solve**:
- Educate users about ranked choice voting and its benefits.
- Allow users to visualize the intricacies of various RCV algorithms.
- Compare the outcomes of RCV with traditional voting methods.

**Goals**:
- Provide an interactive platform for configuring elections.
- Simulate and visualize election outcomes using different voting algorithms.
- Offer comparative insights between RCV and standard voting methods.

## User Flow

1. **User Registration/Login**
   - Enter email and password
   - Verify email
   - Complete profile setup

2. **Create a New Election**
   - Set number of open seats
   - Configure political parties 
   - Create candidates
   - Create voter profiles
   - [Optional] Save this election profile for later use
   - Generate ballots
   - Display data: 
     - Each candidate's profile card
     - Pie charts for popularity of candidates
     - Visualization of the ballots

3. **Run Election**
   - Choose RCV algorithm
   - For each step of the RCV algorithm:
     - Display each candidate and the number of votes they've received
     - Perform the RCV steps, greying out eliminated candidates
     - Repeat until a candidate wins
   - Option to run elections silently and display final results only

4. **Standard Election**
   - Run a simple election using the first choice on every ballot
   - Option to run a simple election using the first major party choice on each ballot

5. **Load Predefined or Custom Elections**
   - Load predefined elections
   - Create new or load custom elections with various configuration options

## List of Features

- **User Registration/Login System**
- **Election Configuration**
  - Set number of open seats
  - Configure political parties (color, major/minor status)
  - Create candidates
  - Create voter profiles (preferences, preferred party, understands RCV score, completeness score)
  - Save election profile
  - Generate ballots
  - Display data visualization (e.g., pie charts for candidate popularity)
- **Simulation Engine**
  - Run RCV elections with step-by-step visualization
  - Silent mode for fast simulation
  - Standard election modes for comparison
- **Visualization Tools**
  - Graphs and charts for election rounds
  - Comparative analysis between RCV and standard voting methods
- **Results Analysis Tools**
  - Metrics and insights
  - Exportable reports

## Detailed Feature Logic

**Election Configuration**:
- **Set Number of Open Seats**: Define how many positions are available in the election.
- **Configure Political Parties**: 
  - Input color names and specify if the party is major or minor.
- **Create Candidates**: 
  - Input candidate names and assign them to political parties.
- **Create Voter Profiles**:
  - Input voter preferences for each party on a scale of -2 to 2.
  - Set an optional preferred party.
  - Assign an "understands RCV" score (0 to 1).
  - Assign a "completeness" score to indicate how thoroughly the voter fills out their ballot.
- **Save Election Profile**:
  - Allow users to save the current configuration for future use.
- **Generate Ballots**:
  - Automatically create ballots based on voter profiles and preferences.
- **Display Data Visualization**:
  - Use pie charts to represent the initial popularity of candidates.

**Simulation Engine**:
- **RCV Algorithm Steps**:
  - Display the number of votes for each candidate.
  - Perform elimination rounds, greying out eliminated candidates.
  - Continue until a candidate wins.
- **Silent Mode**:
  - Run the election without step-by-step visualization and display the final results only.

**Standard Election Modes**:
- **First Choice Voting**:
  - Count only the first choice on each ballot.
- **First Major Party Choice**:
  - Count the first choice among major party candidates on each ballot.

##  Detailed interactions
### 1. User Registration/Login System
- **Features**:
  - User sign-up with email verification.
  - Secure login with password encryption.
  - Password reset functionality.
  - User profiles with saved election configurations.

### 2. Election Configuration
- **Set Number of Open Seats**:
  - Input field for setting the number of seats available in the election.

- **Configure Political Parties**:
  - Interface to add, edit, and delete political parties.
  - Options to set party colors and major/minor status.

- **Create Candidates**:
  - Form to create candidate profiles with associated political parties.
  - Upload images and biographies for candidates.

- **Create Voter Profiles**:
  - Detailed voter profile creation with preferences, preferred party, RCV understanding score, and completeness score.
  - Options for bulk import of voter profiles via CSV or other formats.

- **Save Election Profile**:
  - Save configurations for future simulations.
  - Option to name and describe each saved profile.

- **Generate Ballots**:
  - Automatic generation of ballots based on voter profiles and election configuration.

### 3. Simulation Engine
- **Run RCV Elections with Step-by-Step Visualization**:
  - Interactive visualization of each round in the RCV process.
  - Display elimination of candidates and redistribution of votes.

- **Silent Mode for Fast Simulation**:
  - Option to run simulations without visualization for faster results.

- **Standard Election Modes for Comparison**:
  - Run and compare standard voting methods (e.g., first-past-the-post) alongside RCV.

### 4. Visualization Tools
- **Graphs and Charts for Election Rounds**:
  - Bar charts, pie charts, and other visual aids to display election progress and results.

- **Comparative Analysis Between RCV and Standard Voting Methods**:
  - Side-by-side comparison charts and graphs.
  - Highlight differences in outcomes and vote distributions.

### 5. Results Analysis Tools
- **Metrics and Insights**:
  - Detailed analysis of election results.
  - Metrics such as voter turnout, candidate popularity, and RCV effectiveness.

- **Exportable Reports**:
  - Generate reports in various formats (PDF, CSV) for sharing and documentation.
  - Include visualizations and detailed analysis in reports.

### Wireframe for ElectionSim

#### Home Page
- **Header**:
  - Logo
  - Navigation: Home, Features, About, Contact, Login/Signup

- **Main Section**:
  - Welcome message
  - Overview of features
  - Call-to-action buttons: "Get Started", "Learn More"

#### User Dashboard
- **Sidebar**:
  - Profile overview
  - Navigation: My Elections, New Election, Settings, Logout

- **Main Content**:
  - **My Elections**:
    - List of saved election profiles with options to edit, delete, or run simulations.
  
  - **New Election**:
    - Steps to configure a new election:
      1. Election Details (name, description)
      2. Configure Political Parties
      3. Create Candidates
      4. Create Voter Profiles
      5. Generate Ballots
      6. Save and Run Simulation

#### Simulation Page
- **Sidebar**:
  - Election configuration summary
  - Options to switch between RCV and standard modes

- **Main Content**:
  - **Visualization Panel**:
    - Step-by-step round visualizations
    - Options to pause, play, or fast forward
  
  - **Results Panel**:
    - Graphs and charts for each round
    - Comparative analysis tools

#### Results Analysis Page
- **Header**:
  - Election summary

- **Main Content**:
  - Detailed metrics and insights
  - Export options for reports

## Dependencies

- **Dependencies**:
  - Dependence on third-party libraries for data visualization.
  - Server infrastructure for handling simulations.

##  Milestones

- **Milestone 1**: Project Kickoff - 5/20/24
- **Milestone 2**: User Interface Design Complete - [Date]
- **Milestone 3**: Core Simulation Engine Developed - [Date]
- **Milestone 4**: Initial User Testing - [Date]
- **Milestone 5**: Feature Complete - [Date]
- **Milestone 6**: Beta Release - [Date]
- **Milestone 7**: Public Launch - [Date]

##  Appendices

### Appendix A: Glossary of Terms and Voting Schemes

- **Ranked Choice Voting (RCV)**: A voting system in which voters rank candidates by preference. If no candidate wins a majority of first-preference votes, the candidate with the fewest votes is eliminated and their votes are redistributed to the remaining candidates based on the next preference. This process repeats until a candidate wins a majority.
- **Instant Runoff Voting (IRV)**: A type of RCV where the candidate with the fewest votes is eliminated in each round, and votes are redistributed to next preferences until one candidate has a majority.
- **Borda Count**: Voters rank candidates, and points are assigned based on the ranking. The candidate with the highest total points wins.
- **Condorcet Method**: A candidate is the winner if they would win a head-to-head competition against every other candidate.
- **First-Past-The-Post (FPTP)**: The candidate with the most votes wins, regardless of whether they have a majority.
- **Plurality Voting**: Similar to FPTP, but can be used in multi-seat elections where the top candidates by vote count win.

### Appendix B: Detailed Algorithm Descriptions and Pseudocode

### Instant-Runoff Voting (IRV)

**Description:**
Instant-Runoff Voting (IRV) is a single-winner election method where voters rank candidates in order of preference. If no candidate receives an outright majority of first-preference votes, the candidate with the fewest votes is eliminated. Votes for the eliminated candidate are redistributed to the voters' next preferences. This process repeats until a candidate secures a majority. Redistribution involves moving votes from eliminated candidates to the next preferred candidate on each voter's ballot. Elimination ensures that the least popular candidates are removed progressively until a majority winner emerges.

**Pseudocode:**

```pseudocode
function IRV(votes):
    while true:
        tally = countFirstPreferenceVotes(votes)
        if any candidate has majority in tally:
            return candidate with majority
        else:
            eliminateCandidateWithFewestVotes(tally, votes)
            redistributeVotes(votes)

function countFirstPreferenceVotes(votes):
    tally = initializeTally()
    for ballot in votes:
        firstPreference = ballot[0]
        tally[firstPreference] += 1
    return tally

function eliminateCandidateWithFewestVotes(tally, votes):
    minVotes = min(tally.values())
    candidateToEliminate = findCandidateWithVotes(tally, minVotes)
    for ballot in votes:
        if ballot[0] == candidateToEliminate:
            ballot.pop(0)

function redistributeVotes(votes):
    for ballot in votes:
        while ballot and ballot[0] not in remainingCandidates(tally):
            ballot.pop(0)
```

### Single Transferable Vote (STV)

**Description:**
The Single Transferable Vote (STV) is a proportional representation voting system used in multi-winner elections. Voters rank candidates by preference. To win, candidates must reach a specified quota of votes. Excess votes for candidates who exceed the quota are redistributed based on voters' next preferences. If no candidates meet the quota, the candidate with the fewest votes is eliminated, and their votes are transferred. Redistribution in STV involves transferring surplus votes from candidates who exceed the quota to other candidates. Elimination removes the least popular candidates, allowing their votes to be redistributed until all seats are filled.

**Pseudocode:**

```pseudocode
function STV(votes, numberOfSeats):
    quota = calculateQuota(votes, numberOfSeats)
    elected = []
    while length(elected) < numberOfSeats:
        tally = countFirstPreferenceVotes(votes)
        for candidate in tally:
            if tally[candidate] >= quota:
                elected.append(candidate)
                surplusVotes = tally[candidate] - quota
                redistributeSurplusVotes(candidate, surplusVotes, votes)
        if length(elected) < numberOfSeats:
            eliminateCandidateWithFewestVotes(tally, votes)
    return elected

function calculateQuota(votes, numberOfSeats):
    return floor((totalVotes(votes) / (numberOfSeats + 1)) + 1)

function countFirstPreferenceVotes(votes):
    tally = initializeTally()
    for ballot in votes:
        firstPreference = ballot[0]
        tally[firstPreference] += 1
    return tally

function redistributeSurplusVotes(candidate, surplusVotes, votes):
    for ballot in votes:
        if ballot[0] == candidate:
            ballot.pop(0)
            redistributeVotes(ballot, surplusVotes)

function eliminateCandidateWithFewestVotes(tally, votes):
    minVotes = min(tally.values())
    candidateToEliminate = findCandidateWithVotes(tally, minVotes)
    for ballot in votes:
        if ballot[0] == candidateToEliminate:
            ballot.pop(0)
```

### Borda Count

**Description:**
In the Borda Count method, voters rank candidates, and points are assigned based on position in the ranking. For example, if there are n candidates, a candidate receives n-1 points for each first-place vote, n-2 for each second-place vote, and so on. The candidate with the highest total points wins. Redistribution is not needed in Borda Count, as it is a positional voting method where all rankings contribute to the final score. There is no elimination process either, as the winner is determined by the highest point total.

**Pseudocode:**

```pseudocode
function BordaCount(votes):
    points = initializePointsForCandidates()
    for ballot in votes:
        for i, candidate in enumerate(ballot):
            points[candidate] += (numberOfCandidates - i - 1)
    return candidateWithMostPoints(points)

function initializePointsForCandidates():
    return {candidate: 0 for candidate in candidates}

function candidateWithMostPoints(points):
    return max(points, key=points.get)
```

### Condorcet Method

**Description:**
The Condorcet Method determines the winner by comparing each candidate against every other candidate in a series of head-to-head contests. The candidate who wins the most head-to-head matchups is the Condorcet winner. If no candidate wins all their matchups (a Condorcet paradox), various resolution methods like the Schulze method or Ranked Pairs are used to determine the winner. Redistribution is not applicable in Condorcet methods, as the focus is on direct comparisons. Elimination occurs through resolving cycles or ties in head-to-head matchups using specified rules.

**Pseudocode:**

```pseudocode
function Condorcet(votes):
    candidates = extractCandidates(votes)
    pairwiseWins = initializePairwiseMatrix(candidates)
    
    for candidateA in candidates:
        for candidateB in candidates:
            if candidateA != candidateB:
                winner = headToHeadWinner(candidateA, candidateB, votes)
                if winner == candidateA:
                    pairwiseWins[candidateA][candidateB] += 1
                else:
                    pairwiseWins[candidateB][candidateA] += 1
    
    for candidate in candidates:
        if winsAllPairwiseContests(candidate, pairwiseWins):
            return candidate
    
    return resolveCondorcetParadox(pairwiseWins)

function initializePairwiseMatrix(candidates):
    return {candidate: {other: 0 for other in candidates if other != candidate} for candidate in candidates}

function headToHeadWinner(candidateA, candidateB, votes):
    scoreA = 0
    scoreB = 0
    for ballot in votes:
        if ballot.index(candidateA) < ballot.index(candidateB):
            scoreA += 1
        else:
            scoreB += 1
    return candidateA if scoreA > scoreB else candidateB

function winsAllPairwiseContests(candidate, pairwiseWins):
    for other in pairwiseWins[candidate]:
        if pairwiseWins[candidate][other] <= pairwiseWins[other][candidate]:
            return false
    return true

function resolveCondorcetParadox(pairwiseWins):
    # Implement resolution method, such as Schulze or Ranked Pairs
    return candidateAfterResolution(pairwiseWins)
```

### First-Past-The-Post (FPTP)

**Description:**
First-Past-The-Post (FPTP) is a simple plurality voting method used in single-winner elections. In this system, voters cast their vote for their preferred candidate, and the candidate with the most votes wins. There is no requirement for the winner to achieve a majority; the candidate with the highest number of votes secures the victory. FPTP is straightforward and easy to understand but can result in a winner who does not have majority support if the vote is split among multiple candidates. This method does not involve redistribution of votes or elimination of candidates.

**Pseudocode:**

```pseudocode
function FPTP(votes):
    tally = countVotes(votes)
    return candidateWithMostVotes(tally)

function countVotes(votes):
    tally = initializeTally()
    for vote in votes:
        tally[vote] += 1
    return tally

function candidateWithMostVotes(tally):
    return max(tally, key=tally.get)
```