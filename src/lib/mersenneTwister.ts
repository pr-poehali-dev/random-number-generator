
/**
 * Реализация алгоритма вихря Мерсенна (Mersenne Twister) для генерации
 * псевдослучайных чисел с хорошими статистическими свойствами
 */
export class MersenneTwister {
  private static readonly N = 624;
  private static readonly M = 397;
  private static readonly MATRIX_A = 0x9908b0df;
  private static readonly UPPER_MASK = 0x80000000;
  private static readonly LOWER_MASK = 0x7fffffff;

  private mt: number[] = new Array(MersenneTwister.N);
  private mti: number = MersenneTwister.N + 1;

  constructor(seed?: number) {
    this.init(seed ?? Math.floor(Math.random() * 0xffffffff));
  }

  /**
   * Инициализирует генератор с заданным начальным значением
   */
  public init(seed: number): void {
    this.mt[0] = seed >>> 0;
    for (this.mti = 1; this.mti < MersenneTwister.N; this.mti++) {
      const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] =
        ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (s & 0x0000ffff) * 1812433253 +
        this.mti;
      this.mt[this.mti] >>>= 0;
    }
  }

  /**
   * Генерирует случайное 32-битное целое число
   */
  private int32(): number {
    let y: number;
    const mag01 = [0x0, MersenneTwister.MATRIX_A];

    if (this.mti >= MersenneTwister.N) {
      let kk: number;

      if (this.mti === MersenneTwister.N + 1) {
        this.init(5489);
      }

      for (kk = 0; kk < MersenneTwister.N - MersenneTwister.M; kk++) {
        y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
        this.mt[kk] = this.mt[kk + MersenneTwister.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }

      for (; kk < MersenneTwister.N - 1; kk++) {
        y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
        this.mt[kk] = this.mt[kk + (MersenneTwister.M - MersenneTwister.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }

      y = (this.mt[MersenneTwister.N - 1] & MersenneTwister.UPPER_MASK) | (this.mt[0] & MersenneTwister.LOWER_MASK);
      this.mt[MersenneTwister.N - 1] = this.mt[MersenneTwister.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  }

  /**
   * Генерирует случайное число от 0 до 1 (не включая 1)
   */
  public random(): number {
    return this.int32() * (1.0 / 4294967296.0);
  }

  /**
   * Генерирует случайное целое число между min и max (включительно)
   */
  public randomInt(min: number, max: number): number {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  /**
   * Генерирует заданное количество случайных целых чисел между min и max (включительно)
   */
  public generateRandomNumbers(min: number, max: number, count: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
      result.push(this.randomInt(min, max));
    }
    return result;
  }
}
