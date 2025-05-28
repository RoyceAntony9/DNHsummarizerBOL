import { NewsData } from '../types';

export const getMockNewsData = (): NewsData => {
  return {
    world: [
      {
        category: 'world',
        title: 'Global Summit on Climate Change Yields New Agreements',
        summary: 'Leaders from 195 countries reached a consensus on reducing carbon emissions by 45% by 2030, with developed nations pledging $100 billion in annual funding to help developing countries transition to renewable energy sources.'
      },
      {
        category: 'world',
        title: 'EU and UK Agree on New Trade Deal Post-Brexit',
        summary: 'After months of negotiations, the European Union and United Kingdom have finalized a comprehensive trade agreement that eliminates most tariffs while establishing new regulatory frameworks for goods and services.'
      },
      {
        category: 'world',
        title: 'UN Peacekeeping Mission Extended in Central African Region',
        summary: 'The United Nations Security Council voted unanimously to extend its peacekeeping mission for another year, focusing on protecting civilians and supporting political transition processes in the conflict-affected region.'
      }
    ],
    politics: [
      {
        category: 'politics',
        title: 'Parliament Passes Controversial Electoral Reform Bill',
        summary: 'The bill, which introduces new voter ID requirements and changes constituency boundaries, passed despite opposition concerns about its impact on voter access. Implementation will begin before the next general election.'
      },
      {
        category: 'politics',
        title: 'Opposition Leaders Form Alliance Ahead of General Elections',
        summary: 'Five opposition parties announced a strategic alliance to contest the upcoming elections with a unified platform focused on economic reforms, anti-corruption measures, and governmental transparency.'
      },
      {
        category: 'politics',
        title: 'Supreme Court Rules on Landmark Privacy Case',
        summary: 'In a 6-3 decision, the court established new guidelines for digital privacy rights, limiting government access to personal data without warrants and setting precedents for future technology-related privacy cases.'
      }
    ],
    business: [
      {
        category: 'business',
        title: 'Tech Giant Announces $50 Billion Investment in AI Research',
        summary: 'The company plans to build three new research centers dedicated to artificial intelligence development, creating an estimated 15,000 high-skilled jobs over the next five years.'
      },
      {
        category: 'business',
        title: 'Global Supply Chain Disruptions Continue to Impact Manufacturing',
        summary: 'Ongoing shipping delays and component shortages have forced manufacturers to cut production forecasts for the third consecutive quarter, with consumer electronics and automotive sectors most severely affected.'
      },
      {
        category: 'business',
        title: 'Central Bank Raises Interest Rates to Combat Inflation',
        summary: 'The bank increased its benchmark interest rate by 0.5 percentage points to 4.75%, the highest level in a decade, signaling a continuing aggressive stance against persistent inflation pressures.'
      }
    ],
    technology: [
      {
        category: 'technology',
        title: 'Revolutionary Quantum Computing Breakthrough Announced',
        summary: 'Scientists have developed a new qubit architecture that maintains coherence 100 times longer than previous systems, potentially accelerating the timeline for practical quantum computing applications.'
      },
      {
        category: 'technology',
        title: 'New Smartphone Features Satellite Emergency Communication',
        summary: 'The latest flagship device includes built-in satellite connectivity for emergency messaging when cellular networks are unavailable, marking a significant advancement in mobile communication technology.'
      },
      {
        category: 'technology',
        title: 'Renewable Energy Storage Solution Shows Promise in Trials',
        summary: 'A novel energy storage system using compressed air has demonstrated 85% efficiency in large-scale tests, potentially solving a critical challenge in the widespread adoption of intermittent renewable energy sources.'
      }
    ],
    sports: [
      {
        category: 'sports',
        title: 'National Team Secures Spot in World Cup Finals',
        summary: 'With a decisive 3-1 victory in the semifinal match, the team has advanced to the finals for the first time in 24 years, sparking nationwide celebrations.'
      },
      {
        category: 'sports',
        title: 'Tennis Star Announces Retirement After Grand Slam Victory',
        summary: 'The 35-year-old champion revealed plans to retire at the end of the season after securing a record-breaking 25th Grand Slam title, ending a spectacular two-decade professional career.'
      },
      {
        category: 'sports',
        title: 'Olympic Committee Introduces New Sports for 2028 Games',
        summary: 'Cricket, squash, and lacrosse will be added to the Olympic program for the 2028 Summer Games, expanding the global showcase to include these popular sports for the first time.'
      }
    ],
    health: [
      {
        category: 'health',
        title: 'New Cancer Treatment Shows Promising Results in Clinical Trials',
        summary: 'The immunotherapy approach demonstrated a 60% response rate in patients with advanced stages of previously untreatable cancers, potentially offering new hope for difficult cases.'
      },
      {
        category: 'health',
        title: 'Global Health Organization Warns of Emerging Infectious Disease',
        summary: 'Health officials have identified a new viral pathogen in three countries and issued guidelines for monitoring and containment as researchers work to understand its transmission patterns and severity.'
      },
      {
        category: 'health',
        title: 'Mental Health Services Expansion Announced in National Budget',
        summary: 'The government has allocated $2.8 billion to expand mental health services nationwide, focusing on youth programs, telehealth accessibility, and increasing the mental health workforce.'
      }
    ]
  };
};