# A SQUARE AND A CUBE — Complete Study Notes
### (Grade 8 Ganita Prakash — Chapter 1)

---

## 📑 TABLE OF CONTENTS

1. [The Locker Puzzle (Introduction to Factors & Squares)](#1-the-locker-puzzle)
2. [Square Numbers — Definition & Notation](#2-square-numbers--definition--notation)
3. [Patterns in Units Digits of Squares](#3-patterns-in-units-digits-of-squares)
4. [Zeros at the End of Squares](#4-zeros-at-the-end-of-squares)
5. [Parity of Numbers and Their Squares](#5-parity-of-numbers-and-their-squares)
6. [Perfect Squares and Odd Numbers (Sum of Consecutive Odd Numbers)](#6-perfect-squares-and-odd-numbers)
7. [Numbers Between Consecutive Perfect Squares](#7-numbers-between-consecutive-perfect-squares)
8. [Perfect Squares and Triangular Numbers](#8-perfect-squares-and-triangular-numbers)
9. [Square Roots](#9-square-roots)
10. [Checking Perfect Squares (Three Methods)](#10-checking-perfect-squares-three-methods)
11. [Estimating Square Roots](#11-estimating-square-roots)
12. [Figure It Out — Squares (Solved)](#12-figure-it-out--squares-solved)
13. [Cubic Numbers — Definition & Notation](#13-cubic-numbers--definition--notation)
14. [Patterns in Cubes (Digits, Zeros)](#14-patterns-in-cubes-digits-zeros)
15. [Taxicab Numbers (Ramanujan & 1729)](#15-taxicab-numbers-ramanujan--1729)
16. [Perfect Cubes and Consecutive Odd Numbers](#16-perfect-cubes-and-consecutive-odd-numbers)
17. [Cube Roots](#17-cube-roots)
18. [Checking Perfect Cubes via Prime Factorisation](#18-checking-perfect-cubes-via-prime-factorisation)
19. [Successive Differences (Squares vs Cubes)](#19-successive-differences-squares-vs-cubes)
20. [History — Babylonians, Aryabhata, Brahmagupta, Sanskrit Terms](#20-history--babylonians-aryabhata-brahmagupta-sanskrit-terms)
21. [Figure It Out — Cubes (Solved)](#21-figure-it-out--cubes-solved)
22. [Chapter Summary](#22-chapter-summary)
23. [Extra Practice Questions (Self-made)](#23-extra-practice-questions-self-made)

---

## 1. THE LOCKER PUZZLE

### 🔑 Definition
A **factor** of a number is any number that divides it exactly (leaving no remainder). The locker puzzle shows that **the number of times a locker is toggled = number of factors of the locker's number**.

### 📖 Explanation
- 100 lockers, 100 people.
- Person *n* toggles every *n*-th locker (locker n, 2n, 3n, ...).
- A locker ends **open** if toggled an **odd** number of times, and **closed** if toggled an **even** number of times.
- Every factor of a number has a **"partner factor"** — two factors whose product equals the number (e.g., for 6: 1×6 and 2×3).
- Normally factors pair up, giving an **even** count of factors → locker ends closed.
- **Exception:** When a number is a **perfect square**, one factor pairs with *itself* (e.g., 36 = 6×6). This unpaired middle factor makes the **total count of factors odd** → locker stays **open**.

### ✅ Key Result
> **Only lockers with square numbers remain open.**
> Open lockers between 1–100: **1, 4, 9, 16, 25, 36, 49, 64, 81, 100**

### 🔑 Second part of puzzle — Prime Numbers
Lockers toggled **exactly twice** are those with **exactly two factors**: 1 and the number itself. These are **prime numbers**.
> First five primes → passcode: **2 - 3 - 5 - 7 - 11**

### ❓ Q&A
**Q1. Does every number have an even number of factors?**
A. No — square numbers are the exception; they have an odd number of factors.

**Q2. Why does 36 have an odd number of factors?**
A. Because 36 = 6 × 6, the factor 6 pairs with itself instead of a different number, so it isn't counted twice. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36 → 9 factors (odd).

**Q3. Which lockers are toggled exactly twice, and why?**
A. Lockers whose numbers are **prime**, since primes have exactly two factors (1 and itself).

**Q4. If locker #49 is toggled, by whom is it toggled, and how many times?**
A. By Persons 1, 7, and 49 → 3 times (odd) → locker stays open. (49 = 7² is a perfect square.)

---

## 2. SQUARE NUMBERS — DEFINITION & NOTATION

### 🔑 Definition
A **square number** is the product of a number multiplied by itself. If *n* is a natural number, then **n × n = n²** is called "n squared."
- **Perfect square**: the square of a *natural number* specifically (1, 4, 9, 16, 25, ...).
- Squares can also be found for fractions and decimals, e.g., (3/5)² = 9/25, (2.5)² = 6.25 — but these are **not** called "perfect squares" (that term is reserved for squares of natural numbers).

### 📖 Explanation
Geometrically, n² equals the **area of a square** with side length *n* units.

| Side length (units) | Area (n²) |
|---|---|
| 1 | 1 |
| 2 | 4 |
| 3 | 9 |
| 4 | 16 |
| 5 | 25 |
| 10 | 100 |

### ❓ Q&A
**Q1. What is the square of 3/5?**
A. (3/5)² = 9/25

**Q2. What is (2.5)²?**
A. 6.25

**Q3. Is every square number a perfect square?**
A. Only if it's the square of a natural number. (2.5)² = 6.25 is a square but not a "perfect square" in the natural-number sense.

**Q4. What is the area of a square whose side is 12 cm?**
A. 12² = 144 sq. cm.

---

## 3. PATTERNS IN UNITS DIGITS OF SQUARES

### 🔑 Definition / Rule
The **units digit** of any perfect square can only be **0, 1, 4, 5, 6, or 9** — never 2, 3, 7, or 8.

### 📖 Explanation
- This is a **necessary but not sufficient** condition: a number ending in 0,1,4,5,6,9 is *not guaranteed* to be a perfect square (e.g., 26 ends in 6 but isn't a square).
- However, if a number ends in **2, 3, 7, or 8**, it is **definitely not** a perfect square.
- Numbers ending in **1 or 9** → their square ends in **1** (e.g., 9²=81, 11²=121, 19²=361).
- Numbers ending in **4 or 6** → their square ends in **6** (e.g., 4²=16, 6²=36, 14²=196, 16²=256).
- Numbers ending in **5** → square always ends in **25**.
- Numbers ending in **0** → square ends in **0** (with even zeros).

### ❓ Q&A
**Q1. Write 5 numbers you can immediately identify as non-squares by their units digit.**
A. Example: 12, 23, 47, 58, 79 (end in 2,3,7,8).

**Q2. Which of the following have digit 6 in the units place: 38², 34², 46², 56², 74², 82²?**
A. Numbers ending in 4 or 6 give squares ending in 6.
- 38 → ends in 8 → no
- 34 → ends in 4 → **yes**
- 46 → ends in 6 → **yes**
- 56 → ends in 6 → **yes**
- 74 → ends in 4 → **yes**
- 82 → ends in 2 → no
**Answer: 34², 46², 56², 74² end in 6.**

**Q3. Is 26 a perfect square? Why or why not (using the units digit rule only)?**
A. We cannot rule it out by the units digit rule alone (6 is allowed), but checking directly: 5²=25, 6²=36, so 26 lies between and is **not** a perfect square.

**Q4. Can a perfect square end in 3? Explain.**
A. No. Squares never end in 2, 3, 7, or 8.

**Q5 (from text). Which of the following numbers are NOT perfect squares: 2032, 2048, 1027, 1089?**
A. 2032 (ends in 2 → not square), 2048 (ends in 8 → not square), 1027 (ends in 7 → not square), 1089 (ends in 9 → could be a square; indeed 1089 = 33²). **Answer: 2032, 2048, 1027 are not perfect squares.**

---

## 4. ZEROS AT THE END OF SQUARES

### 🔑 Rule
> **The number of zeros at the end of a perfect square is always double the number of zeros at the end of the original number** (i.e., always an **even** count of zeros).

### 📖 Explanation
| Number | Zeros | Square | Zeros in Square |
|---|---|---|---|
| 10 | 1 | 100 | 2 |
| 20 | 1 | 400 | 2 |
| 40 | 1 | 1600 | 2 |
| 100 | 2 | 10000 | 4 |
| 200 | 2 | 40000 | 4 |
| 700 | 2 | 490000 | 4 |
| 900 | 2 | 810000 | 4 |

If a number has 3 zeros at the end (e.g., 1000), its square (1,000,000) has **6 zeros**.

### ✅ Key Consequence
A number with an **odd** number of trailing zeros (e.g., 10, 1000, 100000...) **cannot** be a perfect square, because its square would need an even count.

### ❓ Q&A
**Q1. If a number contains 3 zeros at the end, how many zeros will its square have?**
A. **6 zeros** (double of 3).

**Q2. Can 4900000 (with an odd trailing-zero count) be a perfect square?**
A. Check the zero count: 4900000 has 5 trailing zeros → odd → **cannot** be a perfect square.

**Q3. Is 100000 (5 zeros) a perfect square?**
A. No — 5 is odd, so it fails the rule immediately.

**Q4. True or False: Squares can only have an even number of zeros at the end.**
A. **True.**

---

## 5. PARITY OF NUMBERS AND THEIR SQUARES

### 🔑 Rule
- **Square of an even number is even.**
- **Square of an odd number is odd.**

### 📖 Explanation
- Even × Even = Even (e.g., 4² = 16)
- Odd × Odd = Odd (e.g., 5² = 25)
- Parity (odd/even nature) is preserved when squaring.

### ❓ Q&A
**Q1. What can you say about the parity of a number and its square?**
A. They always match — even numbers give even squares, odd numbers give odd squares.

**Q2. Is 51² odd or even? Why?**
A. Odd, because 51 is odd (51² = 2601).

**Q3. If n² is even, what can you conclude about n?**
A. n must be even.

---

## 6. PERFECT SQUARES AND ODD NUMBERS

### 🔑 Rule
> **The sum of the first n odd natural numbers equals n².**
> Equivalently, the **difference between consecutive perfect squares** gives consecutive odd numbers.

### 📖 Explanation
**Differences between consecutive squares:**
4 − 1 = 3, 9 − 4 = 5, 16 − 9 = 7, 25 − 16 = 9 ...

**Sum of consecutive odd numbers = perfect square:**
```
1                      = 1  = 1²
1 + 3                  = 4  = 2²
1 + 3 + 5              = 9  = 3²
1 + 3 + 5 + 7          = 16 = 4²
1 + 3 + 5 + 7 + 9      = 25 = 5²
1 + 3 + 5 + 7 + 9 + 11 = 36 = 6²
```
Visually, each new odd number forms an "inverted L" (gnomon) added around the previous square to build the next square — a classic **visual proof**.

**Testing if a number is a perfect square:** Keep subtracting consecutive odd numbers (1, 3, 5, 7...) starting from the number. If you reach exactly **0**, it's a perfect square (and the count of odd numbers subtracted = the square root). If you go below 0 without hitting 0, it is **not** a perfect square.

Example (25):
25−1=24, 24−3=21, 21−5=16, 16−7=9, 9−9=0 → **5 subtractions → 25 = 5²**

Example (38, non-square):
38−1=37, 37−3=34, 34−5=29, 29−7=22, 22−9=13, 13−11=2, 2−13=−11 → crosses below 0 → **not a perfect square**

### 📖 Formula: nth odd number = 2n − 1

### ❓ Q&A
**Q1. Using 35² = 1225, find 36².**
A. 36th odd number = 2(36) − 1 = 71. So 36² = 1225 + 71 = **1296**.

**Q2. Verify whether 38 is a perfect square using the subtraction method.**
A. As shown above, subtracting odd numbers from 38 leads to a negative remainder without hitting exactly 0 → **38 is not a perfect square.**

**Q3. Find the sum: 1 + 3 + 5 + 7 + 9 + 11 + 13.**
A. This is the sum of the first 7 odd numbers = 7² = **49**.

**Q4. What is 100² − 99²?**
A. Difference of consecutive squares = the larger odd number involved = (2×100 − 1) = **199**.

**Q5. If 20² = 400, find 21² using the odd-number pattern.**
A. 21st odd number = 2(21) − 1 = 41. 21² = 400 + 41 = **441**.

---

## 7. NUMBERS BETWEEN CONSECUTIVE PERFECT SQUARES

### 🔑 Rule
> If **p** and **q** are two consecutive perfect squares (q > p), then the numbers lying strictly between them = **q − p − 1**.
>
> Equivalently: between n² and (n+1)², there are exactly **2n** numbers.

### 📖 Explanation
Since (n+1)² − n² = 2n + 1 (an odd number, per Section 6), and one of those numbers is the square itself, the count of numbers strictly between them is **2n**.

### ❓ Q&A
**Q1. How many numbers lie between 16² and 17²?**
A. 2n = 2(16) = **32**.

**Q2. How many numbers lie between 99² and 100²?**
A. 2n = 2(99) = **198**.

**Q3. How many square numbers are there between 1 and 100? Between 101 and 200?**
A. Between 1–100: 1,4,9,16,25,36,49,64,81,100 → **10 squares**.
Between 101–200: 121, 144, 169, 196 → **4 squares**.

**Q4. What is the largest square number less than 1000?**
A. 31² = 961 (32² = 1024 exceeds 1000) → **961**.

**Q5. How many numbers lie between 25² and 26²?**
A. 2(25) = **50**.

---

## 8. PERFECT SQUARES AND TRIANGULAR NUMBERS

### 🔑 Definition
**Triangular numbers** are numbers that can be arranged in a triangular pattern: 1, 3, 6, 10, 15, 21, ...
(Formula: Tₙ = n(n+1)/2)

### 🔑 Rule
> **The sum of two consecutive triangular numbers is always a perfect square.**

### 📖 Explanation
```
1 + 3  = 4  = 2²
3 + 6  = 9  = 3²
6 + 10 = 16 = 4²
10 + 15 = 25 = 5²
```

### ❓ Q&A
**Q1. What is the next triangular number after 15?**
A. **21** (15 + 6 = 21; following pattern +1,+2,+3,+4,+5,+6...).

**Q2. Verify that 15 + 21 is a perfect square.**
A. 15 + 21 = 36 = 6². ✓

**Q3. What are the first 6 triangular numbers?**
A. **1, 3, 6, 10, 15, 21.**

**Q4. Find two consecutive triangular numbers that sum to 49.**
A. 49 = 7². The triangular numbers before/after should be T₆=21 and T₇=28. Check: 21+28 = 49 ✓.

---

## 9. SQUARE ROOTS

### 🔑 Definition
If **y = x²**, then **x is the square root of y**, written **x = √y**.
- Every positive perfect square has **two integer square roots**: one positive, one negative (e.g., √64 = +8 and −8, since 8² = 64 and (−8)² = 64).
- By convention, unless stated otherwise, **√ always denotes the positive (principal) square root**.
- In general: √(n²) = ±n, but this chapter uses only the **positive** root.

### 📖 Explanation
Example: Area of square = 49 sq cm → side = √49 = 7 cm.

### ❓ Q&A
**Q1. What are the square roots of 100?**
A. **+10 and −10.**

**Q2. If a square has area 121 sq. m, what is its side length?**
A. √121 = **11 m**.

**Q3. Why does this chapter only consider the positive square root?**
A. Because in real-world contexts like side lengths and areas, negative values don't make physical sense.

**Q4. What is √441? Find the side of a square with area 441 m².**
A. 21² = 441, so side = **21 m**.

---

## 10. CHECKING PERFECT SQUARES (THREE METHODS)

### 🔑 Method 1 — Listing Squares Sequentially
List out consecutive squares until you reach or pass the target number.
Example: Is 576 a perfect square? 20²=400, 21²=441, 22²=484, 23²=529, 24²=576 → **Yes, 576 = 24²**.
*(Inefficient for large numbers.)*

### 🔑 Method 2 — Successive Subtraction of Odd Numbers
(See Section 6) Subtract 1, 3, 5, 7... successively; if you reach exactly 0, it's a perfect square.
Example: 81 − 1 − 3 − 5 − 7 − 9 − 11 − 13 − 15 − 17 = 0 (9 steps) → **81 = 9²**.

### 🔑 Method 3 — Prime Factorisation (Most Efficient)
A number is a perfect square **if and only if** all prime factors can be grouped into **pairs** (or two identical groups).

**Example: Is 324 a perfect square?**
324 = 2 × 2 × 3 × 3 × 3 × 3ᐧ
Grouped in pairs: (2×2) × (3×3) × (3×3) → all factors paired → **perfect square**.
324 = (2 × 3 × 3)² = 18² → √324 = **18**

**Example: Is 156 a perfect square?**
156 = 2 × 2 × 3 × 13.
The 3 and 13 are unpaired → **not a perfect square**.

### ❓ Q&A
**Q1. Is 1156 a perfect square? Use prime factorisation.**
A. 1156 = 2 × 2 × 17 × 17 = (2×17)² → **Yes**, √1156 = 34.

**Q2. Is 2800 a perfect square? Use prime factorisation.**
A. 2800 = 2×2×2×2×5×5×7 = 2⁴ × 5² × 7¹. The 7 is unpaired → **Not a perfect square**.

**Q3. Find the smallest number by which 9408 must be multiplied to make it a perfect square. Then find the square root of the product.**
A. 9408 = 2×2×2×2×2×2×3×7² = 2⁶ × 3¹ × 7². The unpaired factor is 3.
Multiply by **3** → 9408 × 3 = 28224 = 2⁶ × 3² × 7² = (2³×3×7)² = 168².
**Answer: multiply by 3; square root of product = 168.**

**Q4. Find the smallest square number divisible by 4, 9, and 10.**
A. LCM(4,9,10) = 180 = 2²×3²×5¹. The 5 is unpaired, so multiply by 5 → 900 = 2²×3²×5² = 30².
**Answer: 900.**

**Q5. Is 2048 a perfect square? Use prime factorisation.**
A. 2048 = 2¹¹ (odd power of 2, unpaired) → **Not a perfect square**.

---

## 11. ESTIMATING SQUARE ROOTS

### 🔑 Method
1. Bracket the number between two known perfect squares.
2. Use the units-digit rule to narrow down possible last digits.
3. Test the midpoint using the (a+b)² = a² + 2ab + b² expansion to halve the search interval.

### 📖 Worked Example: Estimate √1936
- 1936 lies between 1600 (40²) and 2500 (50²) → 40 < √1936 < 50
- Last digit of 1936 is 6 → square root ends in 4 or 6 → candidates: 44 or 46
- Test 45²: (40+5)² = 1600 + 400 + 25 = 2025. Since 2025 > 1936 → √1936 < 45
- So it must be **44** → verify: 44² = 1936 ✓

### 📖 Worked Example: Estimate √250 (not a perfect square)
- 100 < 250 < 400 → 10 < √250 < 20 (too wide)
- 15² = 225, 16² = 256 → 15 < √250 < 16
- Since 256 is closer to 250 than 225 → **√250 ≈ 16 (but slightly less than 16)**

### 📖 Worked Example: Akhil's cloth problem
Area = 125 cm² (not a perfect square). Nearest squares: 11² = 121, 12² = 144.
**Largest handkerchief with integer side = 11 cm.**

### ❓ Q&A
**Q1. Estimate √200 between which two consecutive integers?**
A. 14² = 196, 15² = 225 → **14 < √200 < 15**.

**Q2. A square garden has area 300 m². What is the maximum integer side length that fits within it?**
A. 17² = 289, 18² = 324 → largest integer side = **17 m**.

**Q3. Estimate √90.**
A. 9² = 81, 10² = 100 → between 9 and 10, closer to 9.5 (actual ≈ 9.49).

---

## 12. FIGURE IT OUT — SQUARES (SOLVED)

**Q1. Which of the following numbers are not perfect squares? (i) 2032 (ii) 2048 (iii) 1027 (iv) 1089**
**A. (i), (ii), (iii)** are not perfect squares (1089 = 33² is a perfect square).

**Q2. Which one among 64², 108², 292², 36² has last digit 4?**
A. Squares ending in 4 come from numbers ending in 2 or 8.
- 64 → ends in 4 → square ends in 6
- 108 → ends in 8 → square ends in **4** ✓
- 292 → ends in 2 → square ends in **4** ✓
- 36 → ends in 6 → square ends in 6
**Answer: 108² and 292²**

**Q3. Given 125² = 15625, find 126².**
A. 126th odd number = 2(126) − 1 = 251. So 126² = 15625 + 251.
**Answer: (iv) 15625 + 251**

**Q4. Find the side of a square with area 441 m².**
A. √441 = **21 m**

**Q5. Smallest square number divisible by 4, 9, 10.**
A. **900** (shown in Section 10, Q4)

**Q6. Smallest number to multiply 9408 to get a perfect square; find its square root.**
A. Multiply by **3**; result = 28224; √28224 = **168**

**Q7. How many numbers lie between:**
(i) 16² and 17² → **32**
(ii) 99² and 100² → **198**

**Q8. Fill in the missing numbers pattern:**
```
1² + 2² + 2²  = 3²
2² + 3² + 6²  = 7²
3² + 4² + 12² = 13²
4² + 5² + 20² = (21)²
9² + 10² + (90)² = (91)²
```

**Q9. How many tiny squares are in the picture, and what is the prime factorisation?**
A. *(This depends on the specific figure in the textbook — count the unit squares in the grid shown, then express that count as a product of primes. If, for example, the figure shows a 6×6 grid of unit squares, the count is 36 = 2² × 3².)*

---
