export interface DreamTheme {
  category: string;
  keyword: string;
  action: string;
}

const themeMapping: Record<string, { keywords: string[]; actions: string[] }> = {
  animals: {
    keywords: ['dog', 'cat', 'bird', 'duck', 'horse', 'elephant', 'lion', 'tiger', 'bear', 'fish', 'snake', 'rabbit', 'mouse', 'cow', 'pig', 'chicken'],
    actions: ['Visit a local zoo', 'Watch a nature documentary', 'Volunteer at an animal shelter', 'Go birdwatching in the park', 'Visit a pet store', 'Learn about wildlife conservation']
  },
  locations: {
    keywords: ['city', 'forest', 'ocean', 'beach', 'mountain', 'desert', 'space', 'moon', 'underwater', 'sky', 'building', 'house', 'school', 'office', 'park', 'street'],
    actions: ['Take a walk downtown', 'Explore a new neighborhood', 'Visit a museum', 'Go hiking on a trail', 'Have a picnic in the park', 'Take photos of architecture']
  },
  food: {
    keywords: ['pizza', 'burger', 'cake', 'ice cream', 'fruit', 'vegetable', 'bread', 'pasta', 'coffee', 'tea', 'chocolate', 'candy', 'sandwich', 'soup', 'salad'],
    actions: ['Try a new restaurant', 'Cook a new recipe', 'Visit a farmers market', 'Take a cooking class', 'Bake something from scratch', 'Host a dinner party']
  },
  people: {
    keywords: ['friend', 'family', 'stranger', 'celebrity', 'teacher', 'boss', 'parent', 'child', 'crowd', 'group', 'team', 'partner', 'colleague'],
    actions: ['Call an old friend', 'Write a thank you note', 'Join a meetup group', 'Attend a networking event', 'Schedule a coffee chat', 'Send a thoughtful message']
  },
  emotions: {
    keywords: ['happy', 'sad', 'angry', 'scared', 'excited', 'nervous', 'calm', 'anxious', 'love', 'hate', 'fear', 'joy', 'peace', 'stress'],
    actions: ['Practice meditation', 'Write in a journal', 'Take a yoga class', 'Listen to calming music', 'Talk to a friend', 'Take a mental health day']
  },
  activities: {
    keywords: ['flying', 'running', 'swimming', 'driving', 'dancing', 'singing', 'fighting', 'hiding', 'chasing', 'falling', 'climbing', 'jumping', 'walking'],
    actions: ['Try a new sport', 'Take a dance lesson', 'Go for a run', 'Join a gym', 'Learn a new skill', 'Sign up for a race']
  },
  objects: {
    keywords: ['car', 'phone', 'computer', 'book', 'money', 'key', 'door', 'window', 'bag', 'shoe', 'clock', 'mirror', 'chair', 'table'],
    actions: ['Organize your workspace', 'Declutter your home', 'Read a new book', 'Learn about minimalism', 'Fix something broken', 'Donate unused items']
  },
  nature: {
    keywords: ['tree', 'flower', 'rain', 'sun', 'moon', 'star', 'cloud', 'wind', 'storm', 'snow', 'fire', 'water', 'earth', 'grass'],
    actions: ['Plant something new', 'Watch the sunrise', 'Stargaze at night', 'Start a garden', 'Go camping', 'Take nature photos']
  },
  colors: {
    keywords: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white', 'gray', 'pink', 'gold', 'silver', 'neon', 'bright', 'dark'],
    actions: ['Visit an art gallery', 'Try painting or drawing', 'Redecorate a room', 'Wear a bold color', 'Take a photography walk', 'Create a mood board']
  }
};

export function parseDream(dreamText: string): DreamTheme[] {
  const lowerText = dreamText.toLowerCase();
  const foundThemes: DreamTheme[] = [];
  const usedCategories = new Set<string>();

  for (const [category, data] of Object.entries(themeMapping)) {
    for (const keyword of data.keywords) {
      if (lowerText.includes(keyword) && !usedCategories.has(category)) {
        const randomAction = data.actions[Math.floor(Math.random() * data.actions.length)];
        foundThemes.push({
          category,
          keyword,
          action: randomAction
        });
        usedCategories.add(category);
        break;
      }
    }
  }

  // If no themes found, add some default actions
  if (foundThemes.length === 0) {
    foundThemes.push(
      { category: 'reflection', keyword: 'dream', action: 'Journal about your dreams' },
      { category: 'wellness', keyword: 'rest', action: 'Practice good sleep hygiene' },
      { category: 'creativity', keyword: 'imagination', action: 'Try creative writing' }
    );
  }

  // Limit to 3-5 themes for a manageable action plan
  return foundThemes.slice(0, Math.min(5, Math.max(3, foundThemes.length)));
}