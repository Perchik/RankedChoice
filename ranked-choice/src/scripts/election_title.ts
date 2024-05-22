function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const titles: string[] = [
  "Ambassador",
  "Administrator",
  "Chiefficer",
  "Chairperson",
  "Chief Officer",
  "Commissioner",
  "Comptroller",
  "Coordinator",
  "Czar",
  "Deputy Director",
  "Director",
  "Executive",
  "Guardian",
  "Head",
  "Inspector",
  "Leader",
  "Liason",
  "Manager",
  "Minister",
  "Ombudsman",
  "Overseer",
  "President",
  "Representative",
  "Scapegoat",
  "Secretary",
  "Selectman",
  "Supervisor",
];

const orgs: string[] = [
  "Alliance",
  "Assembly",
  "Band",
  "Board",
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
  "Gang",
  "Gathering",
  "Group",
  "Guild",
  "League",
  "Network",
  "Pact",
  "Panel",
  "Partnership",
  "Posse",
  "Squad",
  "Task Force",
  "Team",
  "Tribe",
  "Union",
];

const orgJoiners: string[] = ["against", "for", "of"].sort();

const responsibilities: string[] = [
  "Agriculture",
  "Alchemy",
  "Alien Communication",
  "Art and Culture",
  "Artificial Inaptitude",
  "Artificial Intelligence",
  "Cultural Affairs",
  "Chocolate Distribution",
  "Climate Control",
  "Coffee Supply",
  "Community Engagement",
  "Cybersecurity",
  "Dogwalking",
  "Disaster Response",
  "Diplomacy",
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
  "Transportation",
  "Urban Development",
  "Virtual Reality",
  "Wellness",
  "Happiness",
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
