const BASE_URL = 'http://20.244.56.144/evaluation-service';

export class NumberService {
  private window: number[] = [];
  private readonly windowSize: number = 10;

  private async fetchNumbers(type: string): Promise<number[]> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 500);

    try {
      const endpoint = this.getEndpoint(type);
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        signal: controller.signal
      });
      const data = await response.json();
      return data.numbers;
    } catch (error) {
      return [];
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private getEndpoint(type: string): string {
    switch (type) {
      case 'p': return 'primes';
      case 'f': return 'fibo';
      case 'e': return 'even';
      case 'r': return 'rand';
      default: throw new Error('Invalid number type');
    }
  }

  public async processNumbers(type: string) {
    const prevWindow = [...this.window];
    const numbers = await this.fetchNumbers(type);
    
    for (const num of numbers) {
      if (!this.window.includes(num)) {
        if (this.window.length >= this.windowSize) {
          this.window.shift();
        }
        this.window.push(num);
      }
    }

    const avg = this.window.length > 0 
      ? this.window.reduce((a, b) => a + b, 0) / this.window.length 
      : 0;

    return {
      windowPrevState: prevWindow,
      windowCurrState: [...this.window],
      numbers,
      avg: Number(avg.toFixed(2))
    };
  }
}
