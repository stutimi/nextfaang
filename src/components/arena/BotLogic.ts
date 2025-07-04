interface Problem {
  title: string;
  difficulty: string;
  url: string;
  platform: string;
}

export class BotLogic {
  private difficulty: 'easy' | 'medium' | 'hard';
  private solveTime: { [key: string]: number };
  private startTime: number;
  private completedProblems: Set<number>;

  constructor(difficulty: 'easy' | 'medium' | 'hard' = 'medium') {
    this.difficulty = difficulty;
    this.solveTime = {
      easy: 30,    // 30 seconds per problem
      medium: 60,  // 60 seconds per problem
      hard: 90     // 90 seconds per problem
    };
    this.startTime = Date.now();
    this.completedProblems = new Set();
  }

  /**
   * Simulate bot progress based on time elapsed
   */
  simulateProgress(problems: Problem[]): number[] {
    const elapsedTime = (Date.now() - this.startTime) / 1000; // seconds
    const timePerProblem = this.solveTime[this.difficulty];
    
    // Calculate how many problems the bot should have completed by now
    const expectedCompleted = Math.floor(elapsedTime / timePerProblem);
    const actualCompleted = Math.min(expectedCompleted, problems.length);
    
    // Add some randomness to make it more realistic
    const randomDelay = this.getRandomDelay();
    const adjustedCompleted = Math.max(0, actualCompleted - randomDelay);
    
    // Return array of completed problem indices
    const completed: number[] = [];
    for (let i = 0; i < adjustedCompleted; i++) {
      completed.push(i);
      this.completedProblems.add(i);
    }
    
    return completed;
  }

  /**
   * Get bot's current score
   */
  getScore(): number {
    return this.completedProblems.size;
  }

  /**
   * Check if bot has completed all problems
   */
  isComplete(totalProblems: number): boolean {
    return this.completedProblems.size >= totalProblems;
  }

  /**
   * Get bot's solving speed description
   */
  getSpeedDescription(): string {
    switch (this.difficulty) {
      case 'easy':
        return 'Solves problems in ~30 seconds each';
      case 'medium':
        return 'Solves problems in ~60 seconds each';
      case 'hard':
        return 'Solves problems in ~90 seconds each';
      default:
        return 'Standard solving speed';
    }
  }

  /**
   * Get bot difficulty stats
   */
  getDifficultyStats() {
    return {
      difficulty: this.difficulty,
      solveTime: this.solveTime[this.difficulty],
      description: this.getSpeedDescription(),
      winRate: this.getWinRate()
    };
  }

  /**
   * Get estimated win rate against human players
   */
  private getWinRate(): number {
    switch (this.difficulty) {
      case 'easy':
        return 0.3; // 30% win rate
      case 'medium':
        return 0.5; // 50% win rate
      case 'hard':
        return 0.7; // 70% win rate
      default:
        return 0.5;
    }
  }

  /**
   * Add random delay to make bot behavior more human-like
   */
  private getRandomDelay(): number {
    // Add 0-1 problem delay randomly to simulate thinking time
    const randomFactor = Math.random();
    
    switch (this.difficulty) {
      case 'easy':
        return randomFactor < 0.1 ? 1 : 0; // 10% chance of 1 problem delay
      case 'medium':
        return randomFactor < 0.2 ? 1 : 0; // 20% chance of 1 problem delay
      case 'hard':
        return randomFactor < 0.3 ? 1 : 0; // 30% chance of 1 problem delay
      default:
        return 0;
    }
  }

  /**
   * Reset bot state for new match
   */
  reset(): void {
    this.startTime = Date.now();
    this.completedProblems.clear();
  }

  /**
   * Get time remaining for current problem (for display purposes)
   */
  getTimeToNextSolve(problems: Problem[]): number {
    const elapsedTime = (Date.now() - this.startTime) / 1000;
    const timePerProblem = this.solveTime[this.difficulty];
    const currentProblemIndex = this.completedProblems.size;
    
    if (currentProblemIndex >= problems.length) {
      return 0; // All problems completed
    }
    
    const timeForCurrentProblem = (currentProblemIndex + 1) * timePerProblem;
    return Math.max(0, timeForCurrentProblem - elapsedTime);
  }

  /**
   * Simulate bot making a mistake (for realism)
   */
  shouldMakeMistake(): boolean {
    const mistakeRate = {
      easy: 0.05,   // 5% mistake rate
      medium: 0.10, // 10% mistake rate
      hard: 0.15    // 15% mistake rate
    };
    
    return Math.random() < mistakeRate[this.difficulty];
  }
}