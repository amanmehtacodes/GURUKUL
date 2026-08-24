# POWER PLAY — Complete Study Notes

### (Grade 8 Ganita Prakash — Chapter 2)

---

## 📑 TABLE OF CONTENTS

1. [The Paper Folding Experiment (Introduction to Exponential Growth)](#1-the-paper-folding-experiment)
2. [Exponential Notation — Base, Exponent, Reading Powers](#2-exponential-notation--base-exponent-reading-powers)
3. [Exponents with Variables and Multiple Bases](#3-exponents-with-variables-and-multiple-bases)
4. [Special Cases: Negative Bases and Zero](#4-special-cases-negative-bases-and-zero)
5. [Prime Factorisation in Exponential Form](#5-prime-factorisation-in-exponential-form)
6. [The Stones that Shine — Multiplying Powers with the Same Base](#6-the-stones-that-shine--multiplying-powers-with-the-same-base)
7. [Power of a Power](#7-power-of-a-power)
8. [Magical Pond — Powers with the Same Exponent, Different Bases](#8-magical-pond--powers-with-the-same-exponent-different-bases)
9. [How Many Combinations — Counting Principle & Powers](#9-how-many-combinations--counting-principle--powers)
10. [Dividing Powers with the Same Base](#10-dividing-powers-with-the-same-base)
11. [Zero as an Exponent](#11-zero-as-an-exponent)
12. [Negative Exponents](#12-negative-exponents)
13. [Power Lines — Visualising Powers](#13-power-lines--visualising-powers)
14. [Powers of 10 and Expanded Form](#14-powers-of-10-and-expanded-form)
15. [Scientific Notation (Standard Form)](#15-scientific-notation-standard-form)
16. [Did You Ever Wonder? — Estimation & Assumptions](#16-did-you-ever-wonder--estimation--assumptions)
17. [Linear Growth vs Exponential Growth](#17-linear-growth-vs-exponential-growth)
18. [Getting a Sense for Large Numbers (Population Scales)](#18-getting-a-sense-for-large-numbers-population-scales)
19. [Getting a Sense for Large Time Scales](#19-getting-a-sense-for-large-time-scales)
20. [A Pinch of History — Indian & International Number Names](#20-a-pinch-of-history--indian--international-number-names)
21. [Figure It Out — Solved Questions](#21-figure-it-out--solved-questions)
22. [Chapter Summary](#22-chapter-summary)
23. [Extra Practice Questions (Self-made)](#23-extra-practice-questions-self-made)

---

## 1. THE PAPER FOLDING EXPERIMENT

### 🔑 Definition

**Exponential growth** (also called **multiplicative growth**) is growth where a quantity is repeatedly **multiplied** by a fixed factor, causing it to increase extremely fast — unlike **linear growth**, where a quantity increases by a fixed **amount** each time (additive growth).

### 📖 Explanation

- Starting thickness of paper = 0.001 cm.
- Each fold **doubles** the thickness (multiplies by 2).
- After _n_ folds, thickness = 0.001 cm × 2ⁿ.

| Folds | Thickness | Folds | Thickness    |
| ----- | --------- | ----- | ------------ |
| 1     | 0.002 cm  | 17    | ≈131 cm      |
| 5     | 0.032 cm  | 20    | ≈10.4 m      |
| 10    | 1.024 cm  | 26    | ≈670 m       |
| 13    | 8.192 cm  | 30    | ≈10.7 km     |
| 16    | 65.536 cm | 46    | >7,00,000 km |

- After **26 folds**: thickness ≈ 670 m (taller than the Burj Khalifa, 830 m).
- After **30 folds**: thickness ≈ 10.7 km (about the cruising height of a plane; deeper than the Mariana Trench's 11 km).
- After **46 folds**: thickness is enough to reach the **Moon**!

### ✅ Key Pattern — Multiplicative Jumps

Every **10 additional folds** multiplies the thickness by **1024** (since 2¹⁰ = 1024), regardless of the starting point:

| Fold Range | Times Increased |
| ---------- | --------------- |
| 0 → 10     | ×1024           |
| 10 → 20    | ×1024           |
| 20 → 30    | ×1024           |
| 30 → 40    | ×1024           |

### ❓ Q&A

**Q1. By how much does the thickness increase after any 3 folds?**
A. **8 times** (2×2×2 = 2³ = 8), regardless of the starting thickness.

**Q2. From any point, thickness after 10 more folds increases by how much?**
A. **1024 times** (2¹⁰).

**Q3. Why does folding grow so much faster than adding a fixed amount each time?**
A. Because each fold **multiplies** the existing thickness (multiplicative/exponential growth), rather than adding a fixed amount (linear/additive growth) — multiplication compounds on itself, causing runaway growth.

**Q4. If a paper is folded 40 times, and after 30 folds it was 10.7 km thick, roughly how thick is it after 40 folds?**
A. Multiply by 1024 (per the 10-fold rule): 10.7 km × 1024 ≈ **10,957 km** (matches the table value of ~10,995 km).

**Q5 (own).** If the thickness after 20 folds is 10.485 m, estimate the thickness after 25 folds without a calculator.
A. 5 more folds = ×2⁵ = ×32. 10.485 × 32 ≈ **335.5 m**.

---

## 2. EXPONENTIAL NOTATION — BASE, EXPONENT, READING POWERS

### 🔑 Definition

For a number _n_ multiplied by itself _a_ times, we write **nᵃ**, called "**n raised to the power a**."

- **n** = **base** (the number being multiplied)
- **a** = **exponent** or **power** (how many times the base is multiplied by itself)

**Reading conventions:** nᵃ can be read as "n raised to the power a," "n to the power a," "n power a," or "the ath power of n."

### 📖 Explanation

```
n × n         = n²  (n squared / n raised to power 2)
n × n × n     = n³  (n cubed / n raised to power 3)
n × n × n × n = n⁴  (n raised to power 4 / 4th power of n)
```

Example: **5⁴ = 5×5×5×5 = 625**. Here 5 is the base, 4 is the exponent. "Powers of 5" refers to the sequence 5¹, 5², 5³, 5⁴, ...

Another example: **2¹⁰ = 1024** (this is exactly the "times increased by" value from the paper-folding pattern).

### ⚠️ Important Distinction

**Multiplication vs. Repeated Addition vs. Exponentiation** — these are three different operations:

- 4 + 4 + 4 = 3 × 4 = **12** (repeated addition)
- 4 × 4 × 4 = 4³ = **64** (repeated multiplication / exponentiation)

### ❓ Q&A

**Q1. What is the base and exponent in 7⁵?**
A. Base = 7, Exponent = 5.

**Q2. Express the thickness of paper after 10 folds using the letter v for initial thickness. Options: (i) 10v (ii) 10+v (iii) 2×10×v (iv) 2¹⁰ (v) 2¹⁰v (vi) 10²ᵛ**
A. **(v) 2¹⁰v** — since each fold multiplies by 2, ten folds multiply by 2¹⁰, applied to the initial thickness v.

**Q3. Evaluate 4³.**
A. 4×4×4 = **64**.

**Q4. Evaluate (−4)³.**
A. (−4)×(−4)×(−4) = **−64**.

**Q5. Simplify a×a×a×b×b using exponents.**
A. **a³b²** (read as "a cubed, b squared").

**Q6. Simplify a×a×b×b×b×b using exponents.**
A. **a²b⁴**.

**Q7 (own). Write 9×9×9×9×9 in exponential form and find its value.**
A. 9⁵ = **59049**.

**Q8 (own). What is the difference between 3×5 and 3⁵? Calculate both.**
A. 3×5 = 15 (simple multiplication); 3⁵ = 3×3×3×3×3 = 243 (repeated multiplication/exponent). They are very different operations.

---

## 3. EXPONENTS WITH VARIABLES AND MULTIPLE BASES

### 🔑 Definition

Exponential notation extends naturally to **variables** (letter-numbers) and expressions with **multiple different bases** multiplied together.

### 📖 Explanation

- y × y = **y²**
- b × b × b × b = **b⁴**
- When different bases are multiplied: a×a×a×c×c×c×c×d = **a³c⁴d** (note: d has an implicit exponent of 1, i.e., d¹ = d).

### ❓ Q&A

**Q1. Express in exponential form: 6×6×6×6**
A. **6⁴**

**Q2. Express in exponential form: y×y**
A. **y²**

**Q3. Express in exponential form: b×b×b×b**
A. **b⁴**

**Q4. Express in exponential form: 5×5×7×7×7**
A. **5² × 7³**

**Q5. Express in exponential form: 2×2×a×a**
A. **2² × a²**

**Q6. Express in exponential form: a×a×a×c×c×c×c×d**
A. **a³ × c⁴ × d**

**Q7 (own). Express x×x×x×y×y×z in exponential form.**
A. **x³y²z**

---

## 4. SPECIAL CASES: NEGATIVE BASES AND ZERO

### 🔑 Rule

- A **negative base raised to an even power** gives a **positive** result.
- A **negative base raised to an odd power** gives a **negative** result.
- **0 raised to any positive power** is always **0** (0ⁿ = 0 for n > 0).

### 📖 Explanation

This happens because multiplying an even number of negative numbers cancels the signs in pairs, while an odd number of negatives leaves one negative sign remaining.

Examples:

- (−1)⁵ = −1 (odd exponent → negative)
- (−1)⁵⁶ = +1 (even exponent → positive)
- (−2)⁴ = 16 (even exponent → positive) — verify: (−2)×(−2)×(−2)×(−2) = 4×4 = 16 ✓
- 0² = 0, 0⁵ = 0

### ❓ Q&A

**Q1. What is (−1)⁵? Is it positive or negative?**
A. (−1)⁵ = **−1**, negative (odd exponent).

**Q2. What is (−1)⁵⁶?**
A. **+1**, positive (even exponent).

**Q3. Is (−2)⁴ = 16? Verify.**
A. **Yes.** (−2)×(−2)×(−2)×(−2) = 4×4 = 16. ✓

**Q4. What is 0²? What is 0⁵? What is 0ⁿ in general?**
A. 0² = 0, 0⁵ = 0. In general, **0ⁿ = 0** for any positive counting number n.

**Q5 (own). Without calculating fully, state whether (−7)¹⁰ is positive or negative.**
A. **Positive** — exponent 10 is even.

**Q6 (own). Without calculating fully, state whether (−3)⁹ is positive or negative.**
A. **Negative** — exponent 9 is odd.

---

## 5. PRIME FACTORISATION IN EXPONENTIAL FORM

### 🔑 Definition

Any composite number can be broken down into a product of **prime factors**, and repeated prime factors can be written compactly using **exponents**.

### 📖 Explanation — Worked Example

Express 32400 as a product of prime factors in exponential form:

```
32400 = 2×2×2×2 × 5×5 × 3×3×3×3
      = 2⁴ × 5² × 3⁴
```

### ❓ Q&A

**Q1. Express 648 as a product of powers of its prime factors.**
A. 648 = 2×2×2×3×3×3×3 = **2³ × 3⁴**

**Q2. Express 405 as a product of powers of its prime factors.**
A. 405 = 3×3×3×3×5 = **3⁴ × 5**

**Q3. Express 540 as a product of powers of its prime factors.**
A. 540 = 2×2×3×3×3×5 = **2² × 3³ × 5**

**Q4. Express 3600 as a product of powers of its prime factors.**
A. 3600 = 2×2×2×2×3×3×5×5 = **2⁴ × 3² × 5²**

**Q5. Find the numerical value of 2×10³.**
A. 2×1000 = **2000**

**Q6. Find the numerical value of 7² × 2³.**
A. 49 × 8 = **392**

**Q7. Find the numerical value of 3 × 4⁴.**
A. 3 × 256 = **768**

**Q8. Find the numerical value of (−3)² × (−5)².**
A. 9 × 25 = **225**

**Q9. Find the numerical value of 3² × 10⁴.**
A. 9 × 10000 = **90000**

**Q10. Find the numerical value of (−2)⁵ × (−10)⁶.**
A. (−32) × (1000000) = **−32000000**

**Q11 (own). Express 1000 as a product of powers of its prime factors.**
A. 1000 = 2×2×2×5×5×5 = **2³ × 5³**

**Q12 (own). Find the numerical value of 5² × 2³.**
A. 25 × 8 = **200**

---

## 6. THE STONES THAT SHINE — MULTIPLYING POWERS WITH THE SAME BASE

### 🔑 Rule

> **nᵃ × nᵇ = nᵃ⁺ᵇ** (where a, b are counting numbers)

When multiplying powers with the **same base**, **add the exponents**.

### 📖 Explanation — The Puzzle

A king has 3 daughters, each with 3 baskets, each basket has 3 keys, each key opens 3 rooms → total rooms = 3⁴ = 81. Each room has 3 tables, each table has 3 necklaces, each necklace has 3 diamonds → total diamonds = 3⁷.

Instead of computing 3⁷ from scratch, we can reuse 3⁴ (=81) which was already computed:

```
3⁷ = 3⁴ × 3³ = 81 × 27 = 2187
```

This works because: 3×3×3×3×3×3×3 = (3×3×3×3) × (3×3×3) = 3⁴ × 3³ = 3⁷

**Note:** 3⁷ can also be split differently, e.g., 3² × 3⁵ — any split of the exponents that adds up to 7 works.

### 📖 General Rule with Variables

p⁴ × p⁶ = (p×p×p×p) × (p×p×p×p×p×p) = **p¹⁰** (4+6=10)

### ❓ Q&A

**Q1. Why can 3⁷ also be written as 3² × 3⁵?**
A. Because 2+5 = 7, and grouping the seven 3's into a group of 2 and a group of 5 still multiplies to give the same total product: 3²×3⁵ = 3⁷.

**Q2. Using na×nb=na+b, compute 2⁹ (by splitting into two known powers).**
A. 2⁹ = 2⁴×2⁵ = 16×32 = **512**

**Q3. Using the same method, compute 5⁷.**
A. 5⁷ = 5³×5⁴ = 125×625 = **78125**

**Q4. Using the same method, compute 4⁶.**
A. One way: 4⁶ = 4³×4³ = 64×64 = **4096**

**Q5. Simplify p⁴ × p⁶.**
A. **p¹⁰**

**Q6 (own). Simplify 6³ × 6⁵.**
A. 6³⁺⁵ = **6⁸**

**Q7 (own). Simplify x⁷ × x² × x.**
A. x⁷⁺²⁺¹ = **x¹⁰** (remember x = x¹)

**Q8 (own). A number of diamonds is given by 3⁷. If instead each necklace had 4 diamonds (keeping everything else the same), what would the new total be?**
A. Rooms stay 3⁴=81 (structure unchanged up to necklaces: 3 daughters×3 baskets×3 keys×3 rooms×3 tables×3 necklaces = 3⁶ necklaces), each with 4 diamonds → Total = 3⁶ × 4 = 729×4 = **2916 diamonds**.

---

## 7. POWER OF A POWER

### 🔑 Rule

> **(nᵃ)ᵇ = (nᵇ)ᵃ = nᵃˣᵇ** (where a, b are counting numbers)

When raising a power to another power, **multiply the exponents**.

### 📖 Explanation

4⁶ can be evaluated two different ways:

```
(4×4×4) × (4×4×4) = 4³ × 4³ = (4³)² = 4096
(4×4) × (4×4) × (4×4) = 4² × 4² × 4² = (4²)³ = 4096
```

Both give the same answer because 3×2 = 2×3 = 6.

Similarly: **2¹⁰ = (2²)⁵ = (2⁵)²**

### ❓ Q&A

**Q1. Is 2¹⁰ also equal to (2⁵)²? Show as a product.**
A. Yes: 2¹⁰ = (2×2×2×2×2)×(2×2×2×2×2) = 2⁵×2⁵ = **(2⁵)²**

**Q2. Write 8⁶ as a power of a power in at least two different ways.**
A. 8⁶ = (8²)³ = (8³)². Also, since 8=2³: 8⁶ = (2³)⁶ = **2¹⁸**

**Q3. Write 7¹⁵ as a power of a power in at least two different ways.**
A. 7¹⁵ = **(7³)⁵** and 7¹⁵ = **(7⁵)³**

**Q4. Write 9¹⁴ as a power of a power in at least two different ways.**
A. 9¹⁴ = (9²)⁷. Since 9=3²: 9¹⁴ = (3²)¹⁴ = **3²⁸**

**Q5. Write 5⁸ as a power of a power in at least two different ways.**
A. 5⁸ = **(5²)⁴** and 5⁸ = **(5⁴)²**

**Q6 (own). Simplify (3⁴)⁵.**
A. 3⁴ˣ⁵ = **3²⁰**

**Q7 (own). Simplify (x²)⁶ and write it two other ways.**
A. x¹² = (x³)⁴ = (x⁴)³ = (x⁶)²

**Q8 (own). Is (2³)² the same as 2^(3²)? Explain.**
A. **No.** (2³)² = 2⁶ = 64, but 2^(3²) = 2⁹ = 512. Power-of-a-power multiplies exponents (3×2=6), while an exponent-of-an-exponent evaluates the top exponent first (3²=9). These are different operations — order matters.

---

## 8. MAGICAL POND — POWERS WITH THE SAME EXPONENT, DIFFERENT BASES

### 🔑 Rule

> **mᵃ × nᵃ = (m×n)ᵃ** (where a is a counting number)
> Similarly: **mᵃ ÷ nᵃ = (m÷n)ᵃ** (where n ≠ 0)

When multiplying (or dividing) powers with the **same exponent** but **different bases**, combine the bases first.

### 📖 Explanation — The Pond Puzzle

- Pond doubles lotuses daily; fully covered on Day 30 → half covered on **Day 29** (since doubling from Day 29 to Day 30 fills it completely).
- Fully covered: **2³⁰** lotuses. Half covered: **2²⁹** lotuses.

**Second pond puzzle:** A lotus is placed in a doubling pond for 4 days, then moved to a tripling pond for 4 more days.

- After first 4 days (doubling): 1×2×2×2×2 = **2⁴**
- After next 4 days (tripling): 2⁴ × 3×3×3×3 = **2⁴ × 3⁴**

**If order is reversed** (tripling first, then doubling): 1×3⁴×2⁴ = (3×3×3×3)×(2×2×2×2)
Regrouping: (3×2)×(3×2)×(3×2)×(3×2) = **(3×2)⁴ = 6⁴ = 1296**

### ❓ Q&A

**Q1. Write the number of lotuses in exponential form when the pond was (i) fully covered (ii) half covered.**
A. (i) **2³⁰** (ii) **2²⁹**

**Q2. Can 1×3⁴×2⁴ be expressed as a single power mⁿ? Show it.**
A. Yes: 3⁴×2⁴ = (3×2)⁴ = **6⁴ = 1296**

**Q3. Use mᵃ×nᵃ=(mn)ᵃ to compute 2⁵ × 5⁵.**
A. (2×5)⁵ = 10⁵ = **100000**

**Q4. Simplify 10⁴/5⁴ and write it in exponential form.**
A. (10/5)⁴ = 2⁴ = **16**

**Q5 (own). Simplify 6³ × 5³ using this rule.**
A. (6×5)³ = 30³ = **27000**

**Q6 (own). Simplify 20³ ÷ 4³.**
A. (20÷4)³ = 5³ = **125**

**Q7 (own). Is 2⁴ × 3⁵ equal to 6⁹? Explain why or why not.**
A. **No.** The rule mᵃ×nᵃ=(mn)ᵃ only applies when the **exponents are the same**. Here the exponents (4 and 5) differ, so they cannot be combined this way; 2⁴×3⁵ = 16×243 = 3888, while 6⁹ is a much larger number (~10 million).

---

## 9. HOW MANY COMBINATIONS — COUNTING PRINCIPLE & POWERS

### 🔑 Definition

The **Fundamental Counting Principle**: if there are multiple independent choices to make, the total number of combinations is the **product** of the number of options at each step. When every step has the **same** number of options, the total becomes a **power**.

### 📖 Explanation — Worked Examples

- Estu: 4 dresses × 3 caps = **12 combinations**
- A 2-digit lock: 10 options × 10 options = 10² = **100 combinations**
- A 3-digit lock: 10×10×10 = 10³ = **1000 combinations**
- A 5-digit lock: 10⁵ = **1,00,000 combinations**
- A 6-slot lock using letters A–Z: 26⁶ combinations

### ❓ Q&A

**Q1. Roxie has 7 dresses, 2 hats, and 3 pairs of shoes. How many different ways can Roxie dress up?**
A. 7 × 2 × 3 = **42 ways**

**Q2. How many passwords are possible with a 6-slot lock using letters A to Z?**
A. 26×26×26×26×26×26 = **26⁶**

**Q3. Estu and Roxie tried every password for a 5-digit lock (digits 0-9) until the last one worked. How many passwords did they check in total?**
A. 10⁵ = **1,00,000 passwords**

**Q4 (own). A restaurant has 5 starters, 4 main courses, and 3 desserts. How many different 3-course meals can a customer choose (1 from each category)?**
A. 5×4×3 = **60 meals**

**Q5 (own). A number plate uses 2 letters (A-Z) followed by 4 digits (0-9). How many number plates are possible?**
A. 26×26×10×10×10×10 = 26² × 10⁴ = 676 × 10000 = **67,60,000 plates**

**Q6 (own). If a coin is tossed 5 times, how many different sequences of heads/tails are possible?**
A. Each toss has 2 outcomes → 2⁵ = **32 sequences**

---

## 10. DIVIDING POWERS WITH THE SAME BASE

### 🔑 Rule

> **nᵃ ÷ nᵇ = nᵃ⁻ᵇ** (where n ≠ 0, a and b are counting numbers, a > b)

When dividing powers with the **same base**, **subtract the exponents**.

### 📖 Explanation

Halving a line of length 2⁴ = 16 units repeatedly:

```
2⁴ ÷ 2¹ = 2³ = 8 units (halved once)
2⁴ ÷ 2² = 2² = 4 units (halved twice)
2⁴ ÷ 2³ = 2¹ = 2 units (halved three times)
```

So **2⁴ ÷ 2³ = 2⁴⁻³ = 2¹**.

### ❓ Q&A

**Q1. What is 2¹⁰⁰ ÷ 2²⁵ in powers of 2?**
A. 2¹⁰⁰⁻²⁵ = **2⁷⁵**

**Q2. Simplify 5⁷ ÷ 5⁴.**
A. 5⁷⁻⁴ = **5³** = 125

**Q3. Simplify 4⁸ ÷ 4³.**
A. 4⁸⁻³ = **4⁵**

**Q4 (own). Simplify 10⁶ ÷ 10².**
A. 10⁶⁻² = **10⁴** = 10000

**Q5 (own). Why must n ≠ 0 in this rule?**
A. Because division by 0 is undefined — if n=0, then 0ᵃ÷0ᵇ would require dividing 0 by 0, which has no defined value.

---

## 11. ZERO AS AN EXPONENT

### 🔑 Rule

> **n⁰ = 1** (where n ≠ 0)

Any nonzero number raised to the power 0 equals 1.

### 📖 Explanation — Why does this make sense?

Using the division rule na÷nb=na−b, consider 2⁴÷2⁴:

```
2⁴ ÷ 2⁴ = 2⁴⁻⁴ = 2⁰
```

But directly, any number divided by itself equals 1: 2⁴÷2⁴ = 16÷16 = 1.
**Therefore: 2⁰ = 1.**

This holds in general: for any letter-number a, **nᵃ ÷ nᵃ = nᵃ⁻ᵃ = n⁰ = 1**.

### ❓ Q&A

**Q1. Why can't n be 0 in the rule nᵃ÷nᵇ=nᵃ⁻ᵇ?**
A. If n=0, we would get 0⁰, which is **not defined** (undefined form).

**Q2. What is 7⁰?**
A. **1**

**Q3. What is 100⁰?**
A. **1**

**Q4 (own). What is (−5)⁰?**
A. **1** (any nonzero base to the power 0 is 1, regardless of sign).

**Q5 (own). Simplify 8⁵ ÷ 8⁵ using two different reasoning methods, and confirm they agree.**
A. Method 1 (direct): 8⁵÷8⁵ = 1 (any number divided by itself is 1). Method 2 (exponent rule): 8⁵⁻⁵ = 8⁰. Since both methods describe the same quantity, **8⁰ = 1**.

---

## 12. NEGATIVE EXPONENTS

### 🔑 Rule

> **n⁻ᵃ = 1/nᵃ** and **1/n⁻ᵃ = nᵃ** (where n ≠ 0)

A negative exponent means "**take the reciprocal** of the positive power."

### 📖 Explanation

Halving a line of length 2⁴=16 units, 5 times:

```
2⁴ ÷ 2⁵ = 2⁽⁴⁻⁵⁾ = 2⁻¹
```

Directly: 2⁴÷2⁵ = 16÷32 = 1/2. **So 2⁻¹ = 1/2.**

Halving 10 times: 2⁴÷2¹⁰ = 2⁻⁶ = 1/2⁶ = 1/64.

Similarly: **10⁻³ = 1/10³**, **7⁻² = 1/7²**

And conversely: **1/10⁻³ = 10³**, **1/7⁻² = 7²**, in general **1/n⁻ᵃ = nᵃ**

### ⚠️ Important Note

The rules na×nb=na+b, (na)b=na×b, and na÷nb=na−b hold true **even when a and b are negative integers**, not just counting numbers.

### ❓ Q&A

**Q1. Can a and b be any integers (not just counting numbers) in these exponent rules? Will they still hold?**
A. **Yes**, all the generalised exponent rules hold true for any integer exponents, positive, negative, or zero.

**Q2. Write equivalent (reciprocal) forms of: (i) 2⁻⁴ (ii) 10⁻⁵ (iii) (−7)⁻² (iv) (−5)⁻³ (v) 10⁻¹⁰⁰**
A. (i) 1/2⁴ (ii) 1/10⁵ (iii) 1/(−7)² (iv) 1/(−5)³ (v) 1/10¹⁰⁰

**Q3. Simplify: 2⁻⁴ × 2⁷**
A. 2⁻⁴⁺⁷ = **2³** = 8

**Q4. Simplify: 3² × 3⁻⁵ × 3⁶**
A. 3²⁻⁵⁺⁶ = **3³** = 27

**Q5. Simplify: p³ × p⁻¹⁰**
A. p³⁻¹⁰ = **p⁻⁷**

**Q6. Simplify: 2⁴ × (−4)⁻²**
A. 2⁴ × 1/(−4)² = 16 × 1/16 = **1**

**Q7. Simplify: 8ᵖ × 8ᵠ**
A. **8ᵖ⁺ᵠ**

**Q8. Can we write 10³ as 1/10⁻³? Show why.**
A. Yes: 1/10⁻³ = 1÷(1/10³) = 1×10³ = **10³** ✓

**Q9 (own). Simplify 5⁻³ × 5³.**
A. 5⁻³⁺³ = 5⁰ = **1**

**Q10 (own). Simplify (2⁻³)².**
A. 2⁻³ˣ² = **2⁻⁶** = 1/64

---
