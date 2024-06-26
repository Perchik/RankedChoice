export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getWeightedRandomElement<T>(
  weights: { [key: string]: number },
  defaultValue?: T
): T | undefined {
  // Calculate the total weight of all items
  const totalWeight = Object.values(weights).reduce((sum, weight) => {
    if (weight < 0) {
      throw new Error("Weights must be non-negative");
    }
    return sum + weight;
  }, 0);

  // Handle edge case where total weight is zero
  if (totalWeight === 0) {
    return defaultValue;
  }

  // Generate a random value between 0 and totalWeight
  const randomValue = Math.random() * totalWeight;

  // Select an item based on the random value
  let cumulativeWeight = 0;
  for (const [key, weight] of Object.entries(weights)) {
    cumulativeWeight += weight;
    if (randomValue < cumulativeWeight) {
      return key as unknown as T;
    }
  }

  // Return the default value if no item is selected
  return defaultValue;
}
