/**
 * Inspirational Quotes from Startup Leaders
 * 
 * Curated collection of quotes from successful entrepreneurs and startup founders.
 * Used for rotating subheading in the app header.
 */

export const startupQuotes = [
  {
    text: "The biggest risk is not taking any risk.",
    author: "Mark Zuckerberg",
    company: "Meta"
  },
  {
    text: "Ideas are easy. Implementation is hard.",
    author: "Guy Kawasaki",
    company: "Apple, Canva"
  },
  {
    text: "Move fast and break things.",
    author: "Mark Zuckerberg",
    company: "Meta"
  },
  {
    text: "Done is better than perfect.",
    author: "Sheryl Sandberg",
    company: "Meta"
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    company: "Apple"
  },
  {
    text: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
    company: "Apple"
  },
  {
    text: "Make something people want.",
    author: "Paul Graham",
    company: "Y Combinator"
  },
  {
    text: "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
    company: "Microsoft"
  },
  {
    text: "If you're not embarrassed by the first version of your product, you've launched too late.",
    author: "Reid Hoffman",
    company: "LinkedIn"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    company: "Apple"
  },
  {
    text: "Don't worry about failure; you only have to be right once.",
    author: "Drew Houston",
    company: "Dropbox"
  },
  {
    text: "Ideas are commodity. Execution of them is not.",
    author: "Michael Dell",
    company: "Dell"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    company: "Disney"
  },
  {
    text: "Build something 100 people love, not something 1 million people kind of like.",
    author: "Brian Chesky",
    company: "Airbnb"
  },
  {
    text: "Focus on the user and all else will follow.",
    author: "Larry Page",
    company: "Google"
  },
  {
    text: "The most dangerous poison is the feeling of achievement.",
    author: "Elon Musk",
    company: "Tesla, SpaceX"
  },
  {
    text: "Fail fast, fail often, fail forward.",
    author: "Reid Hoffman",
    company: "LinkedIn"
  },
  {
    text: "Your network is your net worth.",
    author: "Porter Gale",
    company: "Virgin America"
  },
  {
    text: "The secret to successful hiring is this: look for people who want to change the world.",
    author: "Marc Benioff",
    company: "Salesforce"
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
    company: "Standard Oil"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    company: "Apple"
  },
  {
    text: "If you double the number of experiments you do per year, you're going to double your inventiveness.",
    author: "Jeff Bezos",
    company: "Amazon"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Jack Ma",
    company: "Alibaba"
  },
  {
    text: "Chase the vision, not the money.",
    author: "Tony Hsieh",
    company: "Zappos"
  },
  {
    text: "Every no gets you closer to a yes.",
    author: "Mark Cuban",
    company: "Broadcast.com"
  },
  {
    text: "Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.",
    author: "Biz Stone",
    company: "Twitter"
  },
  {
    text: "Don't start a company unless it's an obsession and something you love.",
    author: "Elon Musk",
    company: "Tesla, SpaceX"
  },
  {
    text: "The value of an idea lies in the using of it.",
    author: "Thomas Edison",
    company: "General Electric"
  },
  {
    text: "Make every detail perfect and limit the number of details to perfect.",
    author: "Jack Dorsey",
    company: "Twitter, Square"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
    company: "Apple"
  },
  {
    text: "The best way to get things done is to simply begin.",
    author: "Whitney Wolfe Herd",
    company: "Bumble"
  },
  {
    text: "Think big and don't listen to people who tell you it can't be done.",
    author: "Tim Ferriss",
    company: "Author & Investor"
  },
  {
    text: "What would you do if you weren't afraid?",
    author: "Sheryl Sandberg",
    company: "Meta"
  },
  {
    text: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
    author: "Bill Gates",
    company: "Microsoft"
  },
  {
    text: "The world is changing very fast. Big will not beat small anymore. It will be the fast beating the slow.",
    author: "Rupert Murdoch",
    company: "News Corp"
  }
];

/**
 * Get a quote based on time-based selection
 * Changes every hour and on page refresh
 * 
 * @returns {Object} Quote object with text and author
 */
export const getTimeBasedQuote = () => {
  const now = new Date();
  const hourOfDay = now.getHours();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  
  // Combine hour and day for better variety
  // This ensures quotes change every hour AND are different each day
  const seed = (dayOfYear * 24) + hourOfDay;
  const index = seed % startupQuotes.length;
  
  return startupQuotes[index];
};

/**
 * Get a random quote (alternative method)
 * 
 * @returns {Object} Quote object with text and author
 */
export const getRandomQuote = () => {
  const index = Math.floor(Math.random() * startupQuotes.length);
  return startupQuotes[index];
};

