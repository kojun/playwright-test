/**
 * 高速な素数判定（BigInt対応）
 *
 * 使用例:
 *   import { isPrime } from './doit';
 *   console.log(isPrime(97));           // true
 *   console.log(isPrime(1234567891011n)); // false
 *
 * 方針:
 * - 小さな約数で早期除外
 * - Miller-Rabin 確率的テスト（64ビット以下に対して決定的となる基を使用）
 */

export function isPrime(x: number | bigint): boolean {
    const n = typeof x === 'bigint' ? x : BigInt(Math.trunc(x));

    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    // 小さな素数での試し割り（速い除外のため）
    const smallPrimes = [3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n];
    for (const p of smallPrimes) {
        if (n === p) return true;
        if (n % p === 0n) return false;
    }

    // n-1 = d * 2^s を計算
    let d = n - 1n;
    let s = 0;
    while (d % 2n === 0n) {
        d /= 2n;
        s += 1;
    }

    // 64ビット以下に対して決定的となる基の集合
    // BigIntで扱う
    const bases64 = [2n, 325n, 9375n, 28178n, 450775n, 9780504n, 1795265022n];

    const modPow = (base: bigint, exp: bigint, mod: bigint): bigint => {
        let result = 1n;
        let b = base % mod;
        let e = exp;
        while (e > 0n) {
            if (e & 1n) result = (result * b) % mod;
            b = (b * b) % mod;
            e >>= 1n;
        }
        return result;
    };

    const tryComposite = (a: bigint): boolean => {
        if (a % n === 0n) return false; // a が n の倍数なら合成判定ではない（スキップ）
        let x = modPow(a, d, n);
        if (x === 1n || x === n - 1n) return false;
        for (let r = 1; r < s; r++) {
            x = (x * x) % n;
            if (x === n - 1n) return false;
        }
        return true; // 合成数
    };

    // 適切な基を選んでテスト（n が小さい場合は基をスキップできる）
    for (const a of bases64) {
        if (a >= n) continue;
        if (tryComposite(a)) return false;
    }

    return true;
}