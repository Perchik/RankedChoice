import random

titles = [
    "Secretary", "Minister for", "President", "Director",
    "Chiefficer", "Head", "Commissioner", "Deputy Director",
    "Overseer", "Coordinator", "Ambassador", "Guardian",
    "Supervisor", "Manager", "Administrator", "Leader",
    "Executive", "Representative", "Chairperson", "Inspector",
    "Comptroller", "Selectman for", "Ombudsman"
]

orgs = [
    "Team", "Committee", "Panel", "Board", "Council",
    "Task Force", "Group", "Delegation", "Crew", "Gang",
    "Assembly", "Squad", "Alliance", "Band", "Faction",
    "Tribe", "League", "Union", "Circle", "Network",
    "Posse", "Consortium", "Guild", "Federation", "Partnership",
    "Congregation", "Gathering", "Colony", "Club", "Pact", "Department"
]

titles_multiple_joiners = ["of", "for", "against",]

responsibilities = [
    "Artificial Intelligence", "Reticulating Splines", "Dogwalking", "Public Relations", "Finance",
    "Education", "Transportation", "Entertainment", "Space Exploration",
    "Paranormal Activity", "Time Travel", "Climate Control", "Social Media",
    "Coffee Supply", "Intergalactic Affairs", "Reality TV", "Chocolate Distribution",
    "Alien Communication", "Virtual Reality", "Happiness", "Wellness", "Innovation",
    "Cultural Affairs", "Historical Preservation", "Event Planning", "Urban Development",
    "Marine Biology", "Wildlife Protection", "Technology", "Sports", "Community Engagement",
    "Disaster Response", "Public Safety", "Cybersecurity", "Renewable Energy", "Food Services",
    "Healthcare", "Tourism", "Diplomacy", "Agriculture", "Intelligence", "Art and Culture",
    "Environmental Conservation", "Legal Affairs", "Human Resources", "Ethics", "Compliance",
    "Marketing", "Research and Development", "Artificial Inaptitude"
]


def generate_job_title():
    """
    Generate a random fictional political job title

    The function selects a random title from the 'titles' list and a random responsibility
    from the 'responsibilities' list and combines them to create a job title.

    Returns:
        str: A string representing the generated job title. (eg, "Secretary of State")
    """
    title = random.choice(titles)
    responsibility = random.choice(responsibilities)
    return f"{title} {responsibility}"


def generate_job_title__multiple():
    """
    Generate a random fictional political organization

    The function selects a random title from the 'titles' list, a preposition from the 'joiners' list,
    and a random responsibility from the 'responsibilities' list and combines them to create a fictional organization

    Returns:
        str: A string representing the generated job title.
    """
    org = random.choice(orgs)
    joiner = random.choice(titles_multiple_joiners)
    responsibility = random.choice(responsibilities)
    return f"{org} {joiner} {responsibility}"

# Example usage
if __name__ == "__main__":
    print(generate_job_title())
