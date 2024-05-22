# this is an old not working and not completed python implementation.
import copy
import math
import random
import string
from collections import defaultdict, namedtuple
from enum import Enum, auto
from operator import itemgetter
from typing import Dict, List, Tuple

import ipywidgets as widgets
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import scipy.stats as sps
from ipywidgets import fixed, interact, interact_manual, interactive
from pandas.plotting import table
from tabulate import tabulate

SEED = 323188
random.seed(SEED)
np.random.seed(SEED)
rng = np.random.default_rng(seed=SEED)


class ChoiceModes(Enum):
    CONSTANT = 0  # Everyone votes for exactly C seats
    UNIFORM = 1  # Every choice option is equally likely
    # Triangular dist with increasing linear likelihood from both [1,C] and decreasing from [C, N]
    LINEAR = 2
    NORMAL = 3  # Normal, centered at C with stdev = N/2
    # for both of these, the mass is centralized at C with a smooh falloff in both directions.
    LOG_SHARP = 4
    LOG_SMOOTH = 5  # Sharp has a much faster falloff than smooth.


class PARTY(Enum):
    Red = auto()
    Orange = auto()
    Yellow = auto()
    Green = auto()
    Blue = auto()
    Purple = auto()
    Silver = auto()
    Onyx = auto()
    Gold = auto()
    Independent = auto()


CandidatePop = namedtuple('CandidatePop', 'cid pop')
PartyCmap = namedtuple('PartyCmap', 'name low high')


class Party(object):

    def __init__(self, party, short_name, color, colormap, cascades, opposites):
        # Party enum value.
        self.party: PARTY = party
        # String color to represent this party
        self.color = color
        self._colormap = colormap  # PartyCmap object
        # List of candidates for this party
        self.roster = []
        # list of candidates and their party popularities (CandidatePop objects).
        self.poproster = []
        # List of voters for this party
        self.members = []
        self.size = 0
        self.name: str = party.name  # use the enum value as the name
        self.short_name = short_name
        # The order/relatedness of other parties. (How voters cascade from this party to similar parties)
        self.cascades = cascades
        # Any parties [not ordered] that is opposed to this one and voters probably wouldn't cascade.
        self.opposites = opposites

    def clear(self):
        self.roster = []
        self.members = []
        self.size = 0
        self.poproster = []

    def has_candidates(self):
        return bool(self.roster)

    def update(self):
        self.size = len(self.roster)
        self._update_popularities()
        self._update_colors()

    def _update_popularities(self):
        # Pick a random magnitude for the points for this party. Why? Idk. just wanted variety
        mag = random.randint(5, 13)
        # Assign points to each candidate.
        if self.party == PARTY.Independent:
            popularities = np.ones(len(self.roster))
        else:
            popularities = random.choices(range(1, mag), k=self.size)

        # Now that everyone has points, normalize to percentages.
        popularities = [float(i)/sum(popularities) for i in popularities]

        for c_id, pop in zip(self.roster, popularities):
            candidates[c_id].popularity = pop
            self.poproster.append(CandidatePop(c_id, pop))
        self.roster = sorted(
            self.roster, key=lambda c: candidates[c].popularity, reverse=True)

    def _update_colors(self):

        cmap = plt.cm.get_cmap(self._colormap.name)
        # Bucket the total range into one bucket per candidate.
        # Note len + 1 to get the the right number of bounds
        crange = np.linspace(self._colormap.low,
                             self._colormap.high, self.size + 1)
        # Reverse the popularity list so that the lighter colors are least popular.
        self.roster.reverse()
        # Get the middle color from each bucket of the colormap.
        for i in range(self.size):
            candidates[self.roster[i]].pcolor = cmap(
                (crange[i] + crange[i+1])/2)
        self.roster.reverse()  # Set it back to highest popularity first

    def draw(self):

        labels = list("#{2} {0} ({1}%)".format(candidates[c].name, math.floor(
            100*candidates[c].popularity), c) for c in self.roster)
        colors = list(candidates[c].pcolor for c in self.roster)
        sizes = list(candidates[c].popularity for c in self.roster)

        ax1 = plt.subplot()
        ax1.set_title(self.name + " Party")
        ax1.pie(x=sizes, labels=labels, colors=colors,
                counterclock=False, startangle=90, radius=2, normalize=True)
        ax1.axis("equal")
        plt.show()

    def pretty_print(self):
        print("┌──────────────────────────────────────────────────┐")
        print("│ {:49}".format(self.name + " Party") + "│")
        print("├──────────────────────────────────────────────────┤")
        r_t = [[c.id, c.name, '{0:.0f}%'.format(
            round(c.popularity, 2)*100)] for c in [candidates[x] for x in self.roster]]
        print(tabulate(r_t, headers=['cID', '{:23}'.format(
            'Candidate'), 'Popularity'], tablefmt='pipe', colalign=('left', 'left', 'right')))
        print("├──────────────────────────────────────────────────┤")
        print("│ {:49}".format(str(len(self.members)) + ' Total Members') + "│")
        print("└──────────────────────────────────────────────────┘")
        print('\n')


parties: Dict[PARTY, Party] = {
    PARTY.Red: Party(PARTY.Red, 'R', 'red', PartyCmap(name='Reds', low=.25, high=.8),
                     cascades=[PARTY.Orange, PARTY.Yellow, PARTY.Independent],
                     opposites=[PARTY.Blue]),
    PARTY.Orange: Party(PARTY.Orange,  'OR', 'orange', PartyCmap(name='Oranges', low=.2, high=.75),
                        cascades=[PARTY.Red, PARTY.Yellow, PARTY.Independent],
                        opposites=[PARTY.Purple]),
    PARTY.Yellow: Party(PARTY.Yellow, 'Y',  'yellow', PartyCmap(name='Wistia_r', low=.4, high=1),
                        cascades=[PARTY.Gold, PARTY.Silver, PARTY.Independent],
                        opposites=[PARTY.Green]),
    PARTY.Green: Party(PARTY.Green, 'G', 'green', PartyCmap(name='Greens', low=.2, high=.9),
                       cascades=[PARTY.Onyx, PARTY.Independent],
                       opposites=[PARTY.Yellow]),
    PARTY.Blue: Party(PARTY.Blue, 'B', 'dodgerblue', PartyCmap(name='Blues', low=.25, high=.95),
                      cascades=[PARTY.Purple, PARTY.Green, PARTY.Independent],
                      opposites=[PARTY.Red]),
    PARTY.Purple: Party(PARTY.Purple, 'P', 'darkorchid', PartyCmap(name='Purples', low=.25, high=1),
                        cascades=[PARTY.Blue, PARTY.Green, PARTY.Independent],
                        opposites=[PARTY.Orange]),
    PARTY.Silver: Party(PARTY.Silver, 'S', 'silver', PartyCmap(name='gray', low=.4, high=.9),
                        cascades=[],  # Silver has no loyalties.
                        opposites=[PARTY.Gold, PARTY.Onyx]),
    PARTY.Onyx: Party(PARTY.Onyx, 'OX', 'black', PartyCmap(name='Greys', low=.65, high=1),
                      cascades=[PARTY.Green],
                      opposites=[PARTY.Silver, PARTY.Gold]),
    PARTY.Gold: Party(PARTY.Gold, 'Au', 'gold', PartyCmap(name='copper', low=.33, high=1),
                      cascades=[PARTY.Yellow],
                      opposites=[PARTY.Onyx, PARTY.Silver]),
    PARTY.Independent: Party(PARTY.Independent, 'I', 'magenta', PartyCmap(name='cool', low=0, high=1),
                             cascades=[],
                             opposites=[]),
}


class Candidate(object):
    """Class representing a candidate
    name = string, candidates' name
    party = candidate affiliation
    """

    def __init__(self, name, id, party=PARTY.Independent):
        self.name = name
        self.party: PARTY = party
        self.id = id
        self.pcolor = None
        self.popularity = 0

    def __str__(self):
        return self.name + " (" + self.party.name.capitalize() + ")"


class Choice(object):
    def __init__(self, candidateId, rank):
        self.candidateId = candidateId
        self.rank = rank
        self.counted = False


class Ballot(object):
    def __init__(self, voterId):
        self.voterId = voterId
        self.choices = []

    def addChoice(self, candidateId, rank):
        self.choices.append(Choice(candidateId, rank))

    def __str__(self):
        s = ""
        for ch in self.choices:
            c = candidates[ch.candidateId]
            s += str(ch.candidateId) + ", "
        # s += "#"+ str(ch.rank) +" " +c + " "+ parties[c.party].short_name +"; "
        return s


# -------------------------------------------------------
# GLOBAL CONFIGURATION VARIABLES
VOTERS = 10
PRECINCTS = 20
SEATS = 5
CHOICE_MODE = ChoiceModes.LOG_SMOOTH
CANDIDATES = round(SEATS*2.5 + random.randint(1, 10))
SMOOTH_PEAKINESS = 0.1625
SHARP_PEAKINESS = 0.08125

CANDIDATE_PARTY_PERCENTAGES = {
    PARTY.Red: 0.35,
    PARTY.Blue: 0.35,
    PARTY.Orange: 0.1,
    PARTY.Independent: 0.2
}

VOTER_PARTY_PERCENTAGES = {
    PARTY.Red: 0.2,
    PARTY.Blue: 0.2,
    PARTY.Orange: .2,
    PARTY.Independent: .4
}


def getPartyChoices(DICT, n):
    """returns an array of n parties based on the provided distribution"""
    labels = []
    weights = []
    for k, v in DICT.items():
        labels.append(k)
        weights.append(v)
    return np.random.choice(labels, p=weights, size=n)


def print_candidates():
    print(tabulate(([c.id, c.name, c.party] for c in candidates.values()), tablefmt="pretty", colalign=(
        "right", "left", "right"), headers=['cID', 'Name', 'Party']))


print("CANDIDATES", CANDIDATES)
# Lookup of all candidates by id number
# Map of voterID -> Voter
voters = {}
# Map of BallotIds to ballots
ballots = {}
candidates: Dict[int, Candidate] = {}

for p in parties.values():
    p.clear()


# %%
def generateCandidates():

    with open('lastnames.txt') as f:
        content = f.read().splitlines()
    lastNames = list(map(lambda x: x.capitalize(), content))
    sampleLast = random.sample(lastNames, k=CANDIDATES)
    sampleFirst = random.choices(string.ascii_uppercase, k=CANDIDATES)

    candidate_parties = getPartyChoices(
        CANDIDATE_PARTY_PERCENTAGES, CANDIDATES)
    for i in range(CANDIDATES):
        party = parties[candidate_parties[i]]
        candidates[i] = Candidate(
            name=sampleFirst[i]+". "+sampleLast[i], id=i, party=party.party)

        party.roster.append(i)


for p in parties.values():
    p.clear()
generateCandidates()
for p in parties.values():
    p.update()

for p in parties.values():
    if p.has_candidates():
        #        p.pretty_print(
        p.draw()


# %%

# Generator that yields how many choices a voter should make
# based on the currently set CHOICE_MODE
def getNumberOfChoices(mode=CHOICE_MODE, c=SEATS):
    while True:
        if mode == ChoiceModes.CONSTANT:
            yield c
        else:
            vals = []
            if mode == ChoiceModes.UNIFORM:
                # Candidates + 1 since "high" is not included in the range
                vals = rng.uniform(low=1, high=CANDIDATES+1, size=VOTERS)
            elif mode == ChoiceModes.LINEAR:
                vals = rng.triangular(
                    left=1, mode=c, right=CANDIDATES, size=VOTERS)
            elif mode == ChoiceModes.LOG_SMOOTH or mode == ChoiceModes.LOG_SHARP:
                peakiness = SMOOTH_PEAKINESS if mode == ChoiceModes.LOG_SMOOTH else SHARP_PEAKINESS
                sigma = peakiness*c
                mu = math.log(c) + sigma**2

                vals = rng.lognormal(mu, sigma, VOTERS)
            elif mode == ChoiceModes.NORMAL:
                vals = rng.normal(c, CANDIDATES/3, VOTERS)
            vals_ = vals.tolist()
            while len(vals_):
                v = vals_.pop()
                if v < CANDIDATES + 1:
                    yield math.floor(v)


num_choice_generator = getNumberOfChoices()
PERSONAL_VARIABILITY = .07


def getPersonalPartyPrefs(party_id):
    party = parties[party_id]
    # Randomly modify the party's popularity roster
    offsets = [round(v, 3) for v in rng.uniform(
        low=-1*PERSONAL_VARIABILITY, high=PERSONAL_VARIABILITY, size=party.size)]
    # Compute all the personal variabilities, the "max" call prevents any negatives
    prefs = [CandidatePop(cid, max(pop + v, .00001))
             for (cid, pop), v in zip(party.poproster, offsets)]
    return sorted(prefs, key=lambda c: c.pop, reverse=True)


def getChoicesFromParty(party_id, n):
    prefs = getPersonalPartyPrefs(party_id)
    candidates, weights = [c for c, p in prefs], [p for c, p in prefs]
    # normalize the probabilities
    weights = [float(w)/sum(weights) for w in weights]
    return np.random.choice(a=candidates, p=weights, size=n, replace=False)


class Voter(object):
    def __init__(self, v_id, party, precinct):
        self.id = v_id
        self.party: PARTY = party
        self.precinct = precinct
        self.choices = 0
        self.ballotId = -1

    def generateBallot(self):
        global num_choice_generator
        self.choices = max(1, next(num_choice_generator))
        ballot = []
        choices_remaining = self.choices
        party = parties[self.party]
        # Prepend the voter's party to the list of cascades to simplify the logic
        # This is just a list of party IDs
        party_seq = [self.party] + party.cascades

        while(choices_remaining > 0 and party_seq):
            active_party = party_seq.pop(0)
            # Skip empty parties
            while(parties[active_party].size == 0):
                active_party = party_seq.pop(0)
            active_roster = parties[active_party].poproster
            num_choices_for_this_party = min(
                choices_remaining, len(active_roster))

            party_choices = getChoicesFromParty(
                active_party, num_choices_for_this_party)
            ballot.extend(party_choices)
            choices_remaining = choices_remaining - num_choices_for_this_party

        # Exhausted all the cascades.
        if(choices_remaining > 0):
            excluded_parties = [self.party] + party.cascades + party.opposites
            remaining_parties = [p for p in PARTY if p not in excluded_parties]
            # Get all the candidates from all the parties.
            remaining_candidates = [
                c for p in remaining_parties for c in parties[p].roster]
            # We can only make as many choices as there are left. Note we still ignore candidates in the Opposite parties
            num_choices = min(choices_remaining, len(remaining_candidates))
            ballot.extend(np.random.choice(
                a=remaining_candidates, size=num_choices, replace=False))
        print("ballot", ballot)
        return ballot


def generateVoters():
    voter_parties = getPartyChoices(VOTER_PARTY_PERCENTAGES, VOTERS)
    for i in range(VOTERS):
        voters[i] = Voter(i, voter_parties[i], random.randint(1, PRECINCTS))
    # Shuffle voters list, just in case there's something implicitly is relying on the order.
    shuffled_voters = list(voters.keys())
    random.shuffle(shuffled_voters)

    for v, i in enumerate(shuffled_voters):
        #print("i", i,"v",v)
        voter = voters[v]
        choices = voter.generateBallot()
      #  print("choices", choices)
        ballots[i] = Ballot(v)
        for index, cid in enumerate(choices):
            ballots[i].addChoice(cid, index)
       # print(ballots[i])


ballot = {}
voters = {}
generateVoters()
print(len(ballots))


# %%
for b in ballots:
    print(ballots[b])


def runSimpleElection():
    counts = {}
    for b in ballots:
        c = ballots[b].choices[0].candidateId
        if c not in counts:
            counts[c] = 0
        counts[c] += 1
    for c in counts.keys():
        candidate = candidates[c]
        print(candidate.name, "(", c, ")",
              "[", parties[candidate.party].name, "] -", counts[c])


runSimpleElection()


# %%
""" 
def getPersonalPartyPrefs(party_id):
    party = parties[party_id]
    prefs = copy.deepcopy(party.poproster)
    variability =  [round(v, 3) for v in rng.uniform(low=-1*PERSONAL_VARIABILITY, high=PERSONAL_VARIABILITY, size=len(prefs))]
    for i in range(len(prefs)):
        prefs[i]= ( prefs[i].cid, prefs[i].pop + variability[i])
    return sorted(prefs, key=itemgetter(1))

prefs = getPersonalPartyPrefs(PARTY.Red)
print(prefs)
labels =[candidates[p[0]].name for p in prefs]
print(labels)
sizes = [p[1] for p in prefs]

fig, ax= plt.subplots() #number of parties
ax.pie(x=sizes, labels=labels, startangle=90, radius=2, normalize=True)


# %%
print(party_rosters)


# %%
w = widgets.Dropdown(
    options={i.name: i.value for i in ChoiceModes},    value=ChoiceModes.LOG_SMOOTH.value,
    description='Choice Dist'
)

def draw_viz(mode):
    print(mode)
    choice_gen = getBallotChoices(mode = mode)
    chcs= []
    for i in range(VOTERS):
        c = next(choice_gen)
        if c == 0 : print("zero")
        chcs.append(c)
    edges = [i for i in range(CANDIDATES)]
    hist, bins, edges = plt.hist(chcs, bins=CANDIDATES)

def on_change(change):
    if change['type'] == 'change' and change['name'] == 'value':
        draw_viz(ChoiceModes(change['new']))

w.observe(on_change)
display(w)
 """

# choice_gen = getBallotChoices(mode = )
# chcs= []
# for i in range(VOTERS):
#     c = next(choice_gen)
#     if c == 0 : print("zero")
#     chcs.append(c)
#    # print(next(choice_gen))

# edges = [i for i in range(CANDIDATES)]
# hist, bins, edges = plt.hist(chcs, bins=CANDIDATES-1)
