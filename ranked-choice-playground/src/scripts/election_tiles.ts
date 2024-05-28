function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const titles: string[] = [
  "Ambassador",
  "Administrator",
  "Bureaucrat",
  "Chairperson",
  "Chief Officer",
  "Commissioner",
  "Comptroller",
  "Coordinator",
  "Czar",
  "Deputy Director",
  "Director",
  "Executive",
  "Foreman",
  "Guardian",
  "Head",
  "Inspector",
  "Judge",
  "King",
  "Leader",
  "Liason",
  "Manager",
  "Minister",
  "Navigator",
  "Ombudsman",
  "Overseer",
  "President",
  "Queen",
  "Representative",
  "Scapegoat",
  "Secretary",
  "Selectman",
  "Supervisor",
  "Treasurer",
  "Usurper",
  "Victor",
  "Wrangler",
  "Yardmaster",
];

const orgs: string[] = [
  "Alliance",
  "Assembly",
  "Band",
  "Board",
  "Breakfast Club",
  "Circle",
  "Club",
  "Colony",
  "Committee",
  "Congregation",
  "Consortium",
  "Council",
  "Crew",
  "Delegation",
  "Department",
  "Faction",
  "Federation",
  "Foundation",
  "Gang",
  "Gathering",
  "Group",
  "Guild",
  "Hangout",
  "Institute",
  "Jury",
  "League",
  "Meeting",
  "Network",
  "Operation",
  "Pact",
  "Panel",
  "Partnership",
  "Posse",
  "Quest",
  "Realm",
  "Squad",
  "Task Force",
  "Team",
  "Tribe",
  "Union",
  "World",
];

const orgJoiners: string[] = ["against", "for", "of"].sort();

const responsibilities: string[] = [
  "Agriculture",
  "Alchemy",
  "Alien Communication",
  "Art and Culture",
  "Artificial Inaptitude",
  "Artificial Intelligence",
  "Basketweaving",
  "Cultural Affairs",
  "Chocolate Distribution",
  "Climate Control",
  "Coffee Supply",
  "Community Engagement",
  "Crosswalk Safety",
  "Cybersecurity",
  "Dogwalking",
  "Disaster Response",
  "Diplomatic Incidents",
  "Education",
  "Entertainment",
  "Environmental Conservation",
  "Event Planning",
  "Finance",
  "Food Services",
  "Healthcare",
  "Historical Preservation",
  "Human Resources",
  "Innovation",
  "Intergalactic Affairs",
  "Intelligence",
  "Legal Affairs",
  "Marine Biology",
  "Marketing",
  "Paranormal Activity",
  "Public Relations",
  "Public Safety",
  "Quantum Displacement",
  "Reality TV",
  "Renewable Energy",
  "Research and Development",
  "Reticulating Splines",
  "Social Media",
  "Space Exploration",
  "Sports",
  "Technology",
  "Time Travel",
  "Tourism",
  "Teleportation",
  "Transportation",
  "Urban Development",
  "Virtual Reality",
  "Wellness",
  "Happiness",
  "EinsteIn-Rosen bridges",
];

function generateJobTitle(): string {
  /**
   * Generate a random fictional political job title
   */
  const title = getRandomElement(titles);
  const responsibility = getRandomElement(responsibilities);
  return `${title} of ${responsibility}`;
}

function generateOrganization(): string {
  /**
   * Generate a random fictional political organization
   */
  const org = getRandomElement(orgs);
  const joiner = getRandomElement(orgJoiners);
  const responsibility = getRandomElement(responsibilities);
  return `${org} ${joiner} ${responsibility}`;
}

export { generateJobTitle, generateOrganization };
