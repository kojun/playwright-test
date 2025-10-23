import { isPrime } from '../helpers/prime';
import { test, expect } from '@playwright/test';

test('isPrime: 素数判定（小さい数）', () => {
  expect(isPrime(2)).toBe(true);
  expect(isPrime(3)).toBe(true);
  expect(isPrime(4)).toBe(false);
  expect(isPrime(17)).toBe(true);
  expect(isPrime(18)).toBe(false);
});

test('isPrime: 素数判定（BigInt対応）', () => {
  expect(isPrime(97n)).toBe(true);
  expect(isPrime(1234567891011n)).toBe(false);
});
