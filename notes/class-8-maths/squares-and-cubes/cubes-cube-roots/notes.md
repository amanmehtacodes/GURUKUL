# A Square and a Cube — Cubes & Cube Roots
### (Continued — Grade content, Part 2)

---

## 13. CUBIC NUMBERS — DEFINITION & NOTATION

### 🔑 Definition
A **cube** (or **perfect cube**) is obtained by multiplying a number by itself **three times**: **n × n × n = n³**, read as "n cubed."
- 1 = 1×1×1, 8 = 2×2×2, 27 = 3×3×3, ...
- Geometrically, n³ = the number of unit cubes needed to build a cube of side n.

### 📖 Explanation
- A cube of side 2 cm is made of **2×2×2 = 8** unit cubes.
- A cube of side 3 cm is made of **3×3×3 = 27** unit cubes.
- A cube of side 4 units = 4 layers of (4×4=16) unit cubes = **4×4×4 = 64** unit cubes.

### 🔑 Cube Roots Notation
If y = x³, then **x = ∛y** (cube root of y). Since cubing preserves sign, every real number has **exactly one** real cube root (unlike squares).
- ∛27 = 3, ∛1000 = 10

### ❓ Q&A
**Q1. Is 9 a perfect cube?**
A. No — 2³=8 and 3³=27; 9 falls between them, so it's not a cube. (In fact no number from 10 to 26 is a cube either.)

**Q2. How many unit cubes make a cube of side 5?**
A. 5³ = **125**.

**Q3. What is ∛64?**
A. Since 4³ = 64, ∛64 = **4**.

**Q4. Can (−6)³ be computed? What is it?**
A. Yes: (−6)³ = −6 × −6 × −6 = **−216**. (Unlike squares, a cube can be negative.)

---

## 14. PATTERNS IN CUBES (DIGITS, ZEROS)

### 🔑 Rule — Units Digits of Cubes
Unlike squares, **cubes can end in any digit 0–9**. Each digit maps uniquely:
| Last digit of n | Last digit of n³ |
|---|---|
| 0 | 0 |
| 1 | 1 |
| 2 | 8 |
| 3 | 7 |
| 4 | 4 |
| 5 | 5 |
| 6 | 6 |
| 7 | 3 |
| 8 | 2 |
| 9 | 9 |

### 🔑 Rule — Zeros at the End of Cubes
> If a number has *k* trailing zeros, its cube has **3k** trailing zeros (a multiple of 3).

This means a cube can **never** end in exactly two zeros (00), since 2 is not a multiple of 3.

### ❓ Q&A
**Q1. Can a cube end with exactly two zeros? Explain.**
A. **No.** The number of trailing zeros in a cube must always be a multiple of 3 (0, 3, 6, 9...). Two zeros isn't a multiple of 3, so it's impossible.

**Q2. If a number ends in 3 zeros, how many zeros will its cube have?**
A. 3 × 3 = **9 zeros**.

**Q3. True or False: There is no perfect cube that ends with 8.**
A. **False.** Numbers ending in 2 give cubes ending in 8 (e.g., 2³=8, 12³=1728).

**Q4. What is the units digit of 23³?**
A. 23 ends in 3 → cube ends in **7** (23³ = 12167 ✓).

**Q5. What is the units digit of 47³?**
A. 47 ends in 7 → cube ends in **3**.

---

## 15. TAXICAB NUMBERS (RAMANUJAN & 1729)

### 🔑 Definition
A **taxicab number** is a number that can be expressed as the **sum of two positive cubes in two different ways**.

### 📖 The Famous Story
G.H. Hardy visited a hospitalised Ramanujan and mentioned his taxicab number was "1729 — a rather dull number." Ramanujan immediately replied that it was actually **fascinating**:
> 1729 = 1³ + 12³ = 9³ + 10³

This is called the **Hardy–Ramanujan Number**.

### 🔑 Next Taxicab Numbers
**4104** and **13832**.

### ❓ Q&A
**Q1. Express 4104 as a sum of two cubes in two different ways.**
A. 4104 = 2³ + 16³ = 9³ + 15³
(Check: 8 + 4096 = 4104 ✓; 729 + 3375 = 4104 ✓)

**Q2. Express 13832 as a sum of two cubes in two different ways.**
A. 13832 = 2³ + 24³ = 18³ + 20³
(Check: 8 + 13824 = 13832 ✓; 5832 + 8000 = 13832 ✓)

**Q3. Why is 1729 called the Hardy-Ramanujan number?**
A. Because of the famous hospital-room exchange between Hardy and Ramanujan where Ramanujan instantly recognized it as the smallest taxicab number.

**Q4. What made Ramanujan able to spot such patterns so quickly?**
A. He had spent a lifetime deeply familiar with number properties — his colleague John Littlewood remarked that every positive integer was like a personal friend to him.

---

## 16. PERFECT CUBES AND CONSECUTIVE ODD NUMBERS

### 🔑 Rule
> Just as squares are sums of consecutive odd numbers starting from 1, **cubes are sums of consecutive odd numbers**, but each cube uses a specific consecutive **block** (not always starting from 1):

```
1                          = 1  = 1³
3 + 5                      = 8  = 2³
7 + 9 + 11                 = 27 = 3³
13 + 15 + 17 + 19          = 64 = 4³
21 + 23 + 25 + 27 + 29     = 125 = 5³
31+33+35+37+39+41          = 216 = 6³
```
Each cube n³ uses **n consecutive odd numbers**, and the starting odd number for n³ is: n² − n + 1.

### ❓ Q&A
**Q1. Find the sum: 91+93+95+97+99+101+103+105+107+109 without calculating directly.**
A. This is a block of **10 consecutive odd numbers** → this must be **10³ = 1000** (matching the pattern, since 10³ needs 10 terms starting at 10²−10+1 = 91). ✓

**Q2. What is the starting odd number for the block representing 7³?**
A. n² − n + 1 = 49 − 7 + 1 = **43**. (Sum: 43+45+47+49+51+53+55 = 343 = 7³ ✓)

**Q3. How many odd numbers are summed to get 8³?**
A. **8 numbers** (n = 8, block size = n).

---

## 17. CUBE ROOTS

### 🔑 Definition
If **y = x³**, then x is the **cube root of y**, denoted **x = ∛y**.
- ∛8 = 2, ∛27 = 3, ∛1000 = 10, ∛n³ = n

### 📖 Difference from Square Roots
- A perfect square has **two** square roots (positive and negative).
- A perfect cube has **only one real cube root** (sign is preserved: cube of a negative is negative).

### ❓ Q&A
**Q1. Find ∛512.**
A. 8³ = 512 → **∛512 = 8**.

**Q2. Find ∛729.**
A. 9³ = 729 → **∛729 = 9**.

**Q3. Find ∛64.**
A. 4³ = 64 → **∛64 = 4**.

**Q4. Why does a cube have only one real cube root while a square has two square roots?**
A. Because squaring a negative number gives a positive result (losing the sign), while cubing preserves the sign — so only one number (matching the sign of y) can cube to give y.

---

## 18. CHECKING PERFECT CUBES VIA PRIME FACTORISATION

### 🔑 Rule
> A number is a **perfect cube** if and only if its prime factors can be grouped into **exactly three identical groups** (i.e., every prime factor's exponent is a multiple of 3).

### 📖 Worked Examples

**Is 3375 a perfect cube?**
3375 = 3×3×3×5×5×5 = 3³ × 5³ = (3×5)³ = 15³ → **Yes**, ∛3375 = 15.

**Is 500 a perfect cube?**
500 = 2×2×5×5×5 = 2² × 5³. The 2's aren't in a group of 3 → **Not a perfect cube**.

**Reference Table:**
| Number | Prime Factorisation | Cube's Factorisation |
|---|---|---|
| 4 = 2×2 | 2² | 4³ = 2⁶ |
| 6 = 2×3 | 2¹×3¹ | 6³ = 2³×3³ |
| 15 = 3×5 | 3¹×5¹ | 15³ = 3³×5³ |
| 12 = 2²×3 | 2²×3¹ | 12³ = 2⁶×3³ |

**Key Insight:** Each prime factor of a number appears **exactly three times** in the prime factorisation of its cube.

### ❓ Q&A
**Q1. Find ∛27000.**
A. 27000 = 27 × 1000 = 3³ × 10³ = (3×10)³ = 30³ → **∛27000 = 30**.

**Q2. Find ∛10648.**
A. 10648 = 2³ × 11³ = 22³ → **∛10648 = 22**.

**Q3. What number should 1323 be multiplied by to make it a perfect cube?**
A. 1323 = 3³ × 7² (since 1323 = 3×3×3×7×7). The 7's need one more to make a group of 3.
**Multiply by 7** → 1323 × 7 = 9261 = 3³ × 7³ = 21³.

**Q4. Is 1728 a perfect cube? Find its cube root.**
A. 1728 = 2⁶ × 3³ = (2²)³ × 3³ = (4×3)³ = 12³ → **Yes**, ∛1728 = 12.

**Q5. Is 200 a perfect cube?**
A. 200 = 2³ × 5² — the 5's exponent (2) isn't a multiple of 3 → **Not a perfect cube**.

---

## 19. SUCCESSIVE DIFFERENCES (SQUARES VS CUBES)

### 🔑 Rule for Squares
Taking differences of consecutive squares repeatedly:
```
Squares:   1   4   9   16   25   36
Level 1:     3   5    7    9   11
Level 2:       2    2    2    2
```
→ Constant difference reached at **Level 2** (2nd differences constant).

### 🔑 Rule for Cubes
```
Cubes:    1    8    27   64   125   216
Level 1:    7   19   37   61    91
Level 2:     12   18   24    30
Level 3:        6    6     6
```
→ Constant difference reached at **Level 3** (3rd differences constant = 6).

### ✅ General Pattern
> For nᵏ (kth powers), the differences become constant at the **kth level**.

### ❓ Q&A
**Q1. At what level do the successive differences of perfect cubes become constant?**
A. **Level 3** (third differences), with constant value **6**.

**Q2. What is the constant value at Level 2 for squares?**
A. **2**.

**Q3. Predict: at what level would 4th powers (n⁴) show constant differences?**
A. **Level 4**.

---

## 20. HISTORY — BABYLONIANS, ARYABHATA, BRAHMAGUPTA, SANSKRIT TERMS

### 🔑 Key Facts
- **Babylonians (c. 1700 BCE)** compiled the first known lists of perfect squares and cubes on clay tablets, used for land measurement and architecture.
- In **ancient Sanskrit** (from at least the 3rd century BCE):
  - **varga** = square (both the figure/area and the "square power")
  - **ghana** = cube (both the solid and "cube power")
  - **varga-varga** = fourth power
- **Aryabhata (499 CE):** described varga as both the square figure and the product of two equal quantities.
- **mula** = "root" (of a plant), used for the mathematical root operation:
  - **varga-mula** = square root
  - **ghana-mula** = cube root
  - This word was borrowed into Arabic as **jidhr** and Latin as **radix** (both mean "root").
- **pada** (foot/basis/origin) was another term used for "root."
- **Brahmagupta (628 CE):** defined the *pada* (root) of a *krti* (square) as "that of which it is a square."

### ❓ Q&A
**Q1. Who compiled the first known lists of squares and cubes?**
A. The **Babylonians**, around **1700 BCE**.

**Q2. What Sanskrit term means "square" and what does it literally also refer to?**
A. **Varga** — refers to both the square figure/area and the square power.

**Q3. What is the origin of the word "root" in "square root"?**
A. From Sanskrit **mula** (root of a plant), which passed into Arabic (*jidhr*) and Latin (*radix*), eventually giving us the English word "root."

**Q4. What did Brahmagupta say about square roots?**
A. That the *pada* (root) of a *krti* (square) is "that of which it is a square" — i.e., the number that produces the square.

**Q5. What is "ghana-mula"?**
A. The Sanskrit term for **cube root**.

---

## 21. FIGURE IT OUT — CUBES (SOLVED)

**Q1. Find the cube roots of 27000 and 10648.**
A. ∛27000 = **30**; ∛10648 = **22**

**Q2. What number will you multiply by 1323 to make it a cube number?**
A. **7** (1323 = 3³×7² → ×7 gives 3³×7³ = 9261 = 21³)

**Q3. State True or False, with reasoning:**
(i) The cube of any odd number is even.
A. **False** — odd × odd × odd = odd (e.g., 3³ = 27, odd).

(ii) There is no perfect cube that ends with 8.
A. **False** — numbers ending in 2 give cubes ending in 8 (2³=8, 12³=1728).

(iii) The cube of a 2-digit number may be a 3-digit number.
A. **False** — smallest 2-digit number is 10, and 10³ = 1000 (4 digits); even 4³=64 is 2-digit but 4 is 1-digit. The smallest 2-digit cube, e.g. 5³=125 no wait 5 is 1 digit — checking 2-digit numbers: 10³=1000 (4 digits) is the minimum, so a 2-digit number's cube is always at least 4 digits. **False.**

(iv) The cube of a 2-digit number may have seven or more digits.
A. **False** — largest 2-digit number is 99; 99³ = 970299, which has only 6 digits. So it never reaches 7 digits.

(v) Cube numbers have an odd number of factors.
A. **False** — this rule (odd number of factors) applies to **squares**, not cubes. Cubes don't have a fixed parity of factor-count in general.

**Q4. Guess cube roots without factorisation: 1331, 4913, 12167, 32768.**
A. ∛1331 = **11**, ∛4913 = **17**, ∛12167 = **23**, ∛32768 = **32**
*(Trick: use units digit to guess the last digit of the root, and the number's magnitude to guess the tens digit — e.g., 1331 is between 1000=10³ and 8000=20³, and ends in 1, so root ends in 1 → 11.)*

**Q5. Which is greatest: (i) 67³−66³ (ii) 43³−42³ (iii) 67²−66² (iv) 43²−42²?**
A. Using the successive-difference concept: differences of cubes grow much faster than differences of squares, and larger base numbers give larger gaps.
67³−66³ = 300,763 − 287,496 = 13,267 (large due to n³ growth and larger base)
**Answer: (i) 67³ − 66³ is the greatest.**

---

## 22. CHAPTER SUMMARY

| Concept | Key Fact |
|---|---|
| Square number | n × n = n² |
| Perfect square | Square of a natural number |
| Units digits of squares | Only 0, 1, 4, 5, 6, 9 possible |
| Zeros in squares | Always an even count |
| Square root | Inverse of squaring; denoted √; two roots (±) for perfect squares |
| Cube number | n × n × n = n³ |
| Perfect square test | Prime factors split into 2 identical groups |
| Perfect cube test | Prime factors split into 3 identical groups |
| Cube root | Denoted ∛; only one real root, sign-preserving |

---

## 23. EXTRA PRACTICE QUESTIONS (SELF-MADE)

### Squares
1. Without full calculation, state whether 8123 can be a perfect square. Justify using the units digit rule.
2. Find the smallest number that must be subtracted from 500 to make it a perfect square.
3. Using prime factorisation, determine whether 784 is a perfect square. If so, find its square root.
4. If n² has 8 trailing zeros, how many trailing zeros does n have?
5. Estimate √550 between two consecutive integers.
6. Find the number of integers lying between 40² and 41².
7. If 48² = 2304, find 49² using the odd-number addition method.

### Cubes
8. Is 4096 a perfect cube? Use prime factorisation to justify.
9. Find the smallest number by which 250 must be multiplied to become a perfect cube.
10. What is the units digit of 89³?
11. Find ∛9261 using prime factorisation.
12. Verify that 4104 truly equals both 2³+16³ and 9³+15³.
13. Can a perfect cube end in exactly 5 zeros? Explain why or why not.
14. Find the block of consecutive odd numbers that sum to 9³.

### Mixed / Applied
15. A cube-shaped storage box is built using 512 unit cubes. What is the length of each side?
16. A square field has an area of 2025 m². Find its perimeter.
17. Explain, using factor pairs, why 100 has an odd number of factors while 99 has an even number of factors.
18. In the locker puzzle, if there were 150 lockers instead of 100, how many would remain open? List them.
19. True or False: Every perfect cube's prime factorisation has each prime's exponent divisible by 3. Justify with an example.
20. Compare: which grows faster as n increases — n² or n³? Support your answer using the successive differences method (Section 19).

---

*End of Notes — Ready for question-paper preparation, topic-wise.*
