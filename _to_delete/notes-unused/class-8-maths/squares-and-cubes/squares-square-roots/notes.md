# A Square and a Cube — Squares & Square Roots

### (Class 8 · Chapter 1, NCERT Ganita Prakash)

---

### Opening Puzzle: The 100 Lockers

Queen Ratnamanjuri's puzzle: 100 lockers are toggled by 100 people — Person $k$ toggles every $k$-th locker (locker $k$, $2k$, $3k$, ...). A locker ends up **open** if it is toggled an **odd** number of times, and **closed** if toggled an **even** number of times. The number of times a locker is toggled equals the number of **factors** it has.

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Factor pairs</b><br>
Every factor of a number has a "partner factor" so that the pair multiplies to give the number. For example, for 6: $1\times 6$ and $2\times 3$, so factors are $1, 2, 3, 6$ — an <b>even</b> count (4 factors), so locker 6 ends up closed.<br><br>
For a number like $36 = 6\times 6$, the pair $6\times 6$ has both numbers equal — this "middle" factor doesn't get a distinct partner, so 36 has an <b>odd</b> number of factors: $1,2,3,4,6,9,12,18,36$ (9 factors).
</div>

**Conclusion:** A number has an odd number of factors **only when it is a perfect square**, because exactly one factor pairs with itself. So the lockers that remain open are exactly the **square numbers**: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100$.

Lockers toggled _exactly twice_ have exactly two factors — these are the **prime numbers**: $2, 3, 5, 7, 11, \ldots$, giving the passcode $2\text{-}3\text{-}5\text{-}7\text{-}11$.

---

### 1.1 Square Numbers

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Where "square" comes from</b><br>
The area of a square of side length $s$ (in units) is $s \times s$ (in square units). Because this matches multiplying a number by itself, such numbers are called <b>square numbers</b>.
</div>

| Side length (units) | Area (sq. units)    |
| ------------------- | ------------------- |
| 1                   | $1\times 1 = 1$     |
| 2                   | $2\times 2 = 4$     |
| 3                   | $3\times 3 = 9$     |
| 4                   | $4\times 4 = 16$    |
| 5                   | $5\times 5 = 25$    |
| 10                  | $10\times 10 = 100$ |

<div style="border-left:4px solid #16a34a;padding:8px 14px;background:#f0fdf4;margin:12px 0;">
<b>Formula — Square notation</b>
$$n \times n = n^2 \quad (\text{read as "}n\text{ squared"})$$
The squares of natural numbers ($1, 4, 9, 16, 25, \ldots$) are called <b>perfect squares</b>.
</div>

A square can be formed with any side length, not just whole numbers:
$$\left(\tfrac{3}{5}\right)^2 = \tfrac{3}{5}\times\tfrac{3}{5} = \tfrac{9}{25}, \qquad (2.5)^2 = 2.5\times 2.5 = 6.25$$

Below is a dot-pattern picture of the first four square numbers:

<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="55" r="4" fill="#2563eb"/>
  <text x="20" y="95" font-size="11" text-anchor="middle" fill="#1e293b">1² = 1</text>

  <g fill="#2563eb">
    <circle cx="65" cy="45" r="4"/><circle cx="79" cy="45" r="4"/>
    <circle cx="65" cy="59" r="4"/><circle cx="79" cy="59" r="4"/>
  </g>
  <text x="72" y="95" font-size="11" text-anchor="middle" fill="#1e293b">2² = 4</text>

  <g fill="#2563eb">
    <circle cx="130" cy="35" r="4"/><circle cx="144" cy="35" r="4"/><circle cx="158" cy="35" r="4"/>
    <circle cx="130" cy="49" r="4"/><circle cx="144" cy="49" r="4"/><circle cx="158" cy="49" r="4"/>
    <circle cx="130" cy="63" r="4"/><circle cx="144" cy="63" r="4"/><circle cx="158" cy="63" r="4"/>
  </g>
  <text x="144" y="95" font-size="11" text-anchor="middle" fill="#1e293b">3² = 9</text>

  <g fill="#2563eb">
    <circle cx="215" cy="25" r="4"/><circle cx="229" cy="25" r="4"/><circle cx="243" cy="25" r="4"/><circle cx="257" cy="25" r="4"/>
    <circle cx="215" cy="39" r="4"/><circle cx="229" cy="39" r="4"/><circle cx="243" cy="39" r="4"/><circle cx="257" cy="39" r="4"/>
    <circle cx="215" cy="53" r="4"/><circle cx="229" cy="53" r="4"/><circle cx="243" cy="53" r="4"/><circle cx="257" cy="53" r="4"/>
    <circle cx="215" cy="67" r="4"/><circle cx="229" cy="67" r="4"/><circle cx="243" cy="67" r="4"/><circle cx="257" cy="67" r="4"/>
  </g>
  <text x="236" y="95" font-size="11" text-anchor="middle" fill="#1e293b">4² = 16</text>
</svg>

#### Table of Squares (1–30)

| $n$ | $n^2$ | $n$ | $n^2$ | $n$ | $n^2$ |
| --- | ----- | --- | ----- | --- | ----- |
| 1   | 1     | 11  | 121   | 21  | 441   |
| 2   | 4     | 12  | 144   | 22  | 484   |
| 3   | 9     | 13  | 169   | 23  | 529   |
| 4   | 16    | 14  | 196   | 24  | 576   |
| 5   | 25    | 15  | 225   | 25  | 625   |
| 6   | 36    | 16  | 256   | 26  | 676   |
| 7   | 49    | 17  | 289   | 27  | 729   |
| 8   | 64    | 18  | 324   | 28  | 784   |
| 9   | 81    | 19  | 361   | 29  | 841   |
| 10  | 100   | 20  | 400   | 30  | 900   |

#### Patterns in the Units Digit

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Units digit of a perfect square</b><br>
Every perfect square ends in $0, 1, 4, 5, 6,$ or $9$. <b>No</b> perfect square ends in $2, 3, 7,$ or $8$.<br>
If a number has units digit $1$ or $9$, its square ends in $1$. If a number has units digit $4$ or $6$, its square ends in $6$ (e.g. $4^2=16$, $6^2=36$, $14^2=196$, $16^2=256$, $24^2=576$, $26^2=676$).
</div>

<div style="border-left:4px solid #d97706;padding:8px 14px;background:#fffbeb;margin:12px 0;">
<b>Common Mistake</b><br>
Ending in $0,1,4,5,6,9$ does <b>not</b> guarantee a number is a perfect square. For example, $16$ and $36$ both end in $6$ and are squares, but $26$ also ends in $6$ and is <b>not</b> a square ($5^2=25$, $6^2=36$, and $26$ lies strictly between them). The units-digit test can only rule squares <b>out</b> (if it ends in $2,3,7,8$), never confirm them.
</div>

#### Zeros at the End of a Square

<div style="border-left:4px solid #16a34a;padding:8px 14px;background:#f0fdf4;margin:12px 0;">
<b>Formula — Trailing zeros rule</b><br>
If a number ends in $k$ zeros, its square ends in exactly $2k$ zeros.
$$10^2=100,\quad 100^2=10000,\quad 900^2=810000$$
Consequence: a perfect square can only ever have an <b>even</b> number of zeros at the end.
</div>

#### Parity of a Square

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Parity</b><br>
The square of an even number is even; the square of an odd number is odd.
</div>

#### Perfect Squares and Consecutive Odd Numbers

Differences of consecutive squares: $4-1=3,\ 9-4=5,\ 16-9=7,\ 25-16=9,\ldots$ — these differences are exactly the odd numbers.

<div style="border-left:4px solid #16a34a;padding:8px 14px;background:#f0fdf4;margin:12px 0;">
<b>Formula — Sum of consecutive odd numbers</b>
$$1 = 1^2,\quad 1+3=2^2,\quad 1+3+5=3^2,\quad 1+3+5+7=4^2,\ \ldots$$
$$1+3+5+\cdots+(2n-1) = n^2$$
The $n$-th odd number is $2n-1$.
</div>

This "inverted-L" (gnomon) picture shows _why_ each new odd number extends a square into the next square:

<svg viewBox="0 0 150 140" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="8" fill="#2563eb"/>
  <circle cx="65" cy="30" r="8" fill="#dc2626"/>
  <circle cx="65" cy="65" r="8" fill="#dc2626"/>
  <circle cx="30" cy="65" r="8" fill="#dc2626"/>
  <circle cx="100" cy="30" r="8" fill="#16a34a"/>
  <circle cx="100" cy="65" r="8" fill="#16a34a"/>
  <circle cx="100" cy="100" r="8" fill="#16a34a"/>
  <circle cx="65" cy="100" r="8" fill="#16a34a"/>
  <circle cx="30" cy="100" r="8" fill="#16a34a"/>
  <text x="65" y="130" font-size="11" text-anchor="middle" fill="#1e293b">1 + 3 + 5 = 9 = 3²</text>
</svg>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Testing 25 by repeated subtraction</b><br>
Subtract consecutive odd numbers starting from 1, until we reach 0:
$$25-1=24,\ \ 24-3=21,\ \ 21-5=16,\ \ 16-7=9,\ \ 9-9=0$$
We reached $0$ after subtracting 5 odd numbers ($1,3,5,7,9$), so $25 = 1+3+5+7+9 = 5^2$. Hence $25$ is a perfect square with square root $5$.
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Find $36^2$, given $35^2 = 1225$</b><br>
$1225$ is the sum of the first 35 odd numbers. To get $36^2$ we add the 36th odd number.<br>
The $n$-th odd number is $2n-1$, so the 36th odd number $= 2(36)-1 = 71$.
$$36^2 = 1225 + 71 = 1296$$
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Showing 38 is NOT a perfect square</b><br>
$$38-1=37,\ \ 37-3=34,\ \ 34-5=29,\ \ 29-7=22,\ \ 22-9=13,\ \ 13-11=2,\ \ 2-13=-11$$
We cross below $0$ (get $-11$) without ever landing exactly on $0$. So $38$ cannot be written as a sum of consecutive odd numbers starting from $1$, and is therefore <b>not</b> a perfect square.
</div>

#### Numbers Between Consecutive Perfect Squares

<div style="border-left:4px solid #16a34a;padding:8px 14px;background:#f0fdf4;margin:12px 0;">
<b>Formula — Count between consecutive squares</b><br>
If $p$ and $q$ are consecutive perfect squares, the numbers strictly between them number $q-p-1$. Between $n^2$ and $(n+1)^2$ specifically:
$$(n+1)^2 - n^2 - 1 = 2n$$
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example</b><br>
Numbers between $16^2=256$ and $17^2=289$: using $2n$ with $n=16$, that's $2\times16=32$ numbers.<br>
Numbers between $99^2$ and $100^2$: $2\times 99 = 198$ numbers.
</div>

#### Perfect Squares and Triangular Numbers

Triangular numbers ($1, 3, 6, 10, 15,\ldots$) count dots arranged in a triangle. Adding two _consecutive_ triangular numbers gives a perfect square:
$$1+3=4=2^2,\qquad 3+6=9=3^2,\qquad 6+10=16=4^2$$

<div style="border-left:4px solid #16a34a;padding:8px 14px;background:#f0fdf4;margin:12px 0;">
<b>Formula — Triangular numbers and squares</b>
$$T_{n-1} + T_n = n^2$$
where $T_n$ is the $n$-th triangular number.
</div>

<svg viewBox="0 0 150 130" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="7" fill="#2563eb"/><circle cx="60" cy="30" r="7" fill="#2563eb"/><circle cx="90" cy="30" r="7" fill="#2563eb"/>
  <circle cx="60" cy="60" r="7" fill="#2563eb"/><circle cx="90" cy="60" r="7" fill="#2563eb"/>
  <circle cx="90" cy="90" r="7" fill="#2563eb"/>
  <circle cx="30" cy="60" r="7" fill="#dc2626"/>
  <circle cx="30" cy="90" r="7" fill="#dc2626"/><circle cx="60" cy="90" r="7" fill="#dc2626"/>
  <text x="60" y="120" font-size="11" text-anchor="middle" fill="#1e293b">T₂ + T₃ = 3 + 6 = 9 = 3²</text>
</svg>

---

### Square Roots

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Definition</b><br>
If $y = x^2$, then $x$ is called the <b>square root</b> of $y$, written $x = \sqrt{y}$. Every positive perfect square has <b>two</b> integer square roots — one positive, one negative:
$$8^2 = 64 \text{ and } (-8)^2 = 64 \ \Rightarrow\ \sqrt{64} = \pm 8$$
In general $\sqrt{n^2} = \pm n$. In this chapter, only the <b>positive (principal)</b> square root is used unless stated otherwise.
</div>

**Example:** Area of a square is $49\ \text{cm}^2$. Since $7\times7=49$, the side length is $\sqrt{49}=7$ cm.

#### Methods to Find / Test Square Roots

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Method 1: Listing squares in sequence</b><br>
Is 576 a perfect square? Starting from $20^2=400$:
$$20^2=400,\ 21^2=441,\ 22^2=484,\ 23^2=529,\ 24^2=576$$
$576 = 24^2$, so it is a perfect square with $\sqrt{576}=24$. (Slow for large numbers.)
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Method 2: Repeated subtraction of odd numbers</b><br>
Is 81 a perfect square?
$$81{-}1{=}80,\ 80{-}3{=}77,\ 77{-}5{=}72,\ 72{-}7{=}65,\ 65{-}9{=}56,\ 56{-}11{=}45,\ 45{-}13{=}32,\ 32{-}15{=}17,\ 17{-}17{=}0$$
We reached $0$ at the 9th step, so $\sqrt{81}=9$.
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Method 3: Prime factorisation</b><br>
<u>Is 324 a perfect square?</u>
$$324 = 2\times2\times3\times3\times3\times3 = (2\times2)\times(3\times3)\times(3\times3)$$
The prime factors split into two identical groups: $324 = (2\times3\times3)\times(2\times3\times3) = (18)^2$. So $324$ is a perfect square and $\sqrt{324}=18$.<br><br>
<u>Is 156 a perfect square?</u>
$$156 = 2\times2\times3\times13$$
These factors cannot be split into two identical groups (the $3$ and $13$ are unpaired), so $156$ is <b>not</b> a perfect square.
</div>

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Perfect square test</b><br>
A number is a perfect square if and only if its prime factors can be split into two identical groups (i.e., every prime occurs an <b>even</b> number of times in the factorisation).
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Method 4: Estimation, $\sqrt{1936}$</b><br>
(i) $1936$ lies between $1600=40^2$ and $2500=50^2$, so $40 < \sqrt{1936} < 50$.<br>
(ii) Units digit of $1936$ is $6$, so the square root's units digit must be $4$ or $6$ — candidates $44$ or $46$.<br>
(iii) Check the midpoint: $45^2 = (40+5)^2 = 40^2+2(40)(5)+5^2 = 1600+400+25 = 2025$.<br>
(iv) $2025 > 1936$, so $40 < \sqrt{1936} < 45$.<br>
(v) Combining with step (ii), the answer must be $44$. Check: $44^2 = 1936$. ✓
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Estimating a non-perfect-square root, $\sqrt{250}$</b><br>
$100 < 250 < 400 \Rightarrow 10 < \sqrt{250} < 20$. Narrowing further: $15^2=225$ and $16^2=256$, so $15<\sqrt{250}<16$. Since $256$ is much closer to $250$ than $225$ is, $\sqrt{250}\approx 16$ (but strictly less than 16).
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Cloth/handkerchief problem</b><br>
A square cloth has area $125\ \text{cm}^2$. Can a handkerchief of side $15$ cm be cut out? $15^2 = 225 > 125$, so no. Since $125$ is not a perfect square, find the closest smaller perfect square: $11^2=121$ and $12^2=144$. As $121<125<144$, the largest integer side that fits is $11$ cm.
</div>

<div style="border-left:4px solid #7c3aed;padding:8px 14px;background:#f5f3ff;margin:12px 0;">
<b>Try It Yourself</b> (from the textbook's "Figure it Out")<br>
1. Which are not perfect squares: (i) $2032$&nbsp;(ii) $2048$&nbsp;(iii) $1027$&nbsp;(iv) $1089$? <i>(Answer: (i), (ii), (iii) are not perfect squares — each falls strictly between $45^2=2025$ and $46^2=2116$ (for 2032, 2048) or between $32^2=1024$ and $33^2=1089$ (for 1027). Only $1089 = 33^2$ is a perfect square.)</i><br>
2. Which of $64^2, 108^2, 292^2, 36^2$ has last digit 4? <i>(Answer: $108^2$ and $292^2$.)</i><br>
3. Given $125^2=15625$, find $126^2$. <i>(Answer: $15625+251 = 15876$, using the 126th odd number $=2(126)-1=251$.)</i><br>
4. Side of a square of area $441\ \text{m}^2$? <i>(Answer: $21$ m.)</i><br>
5. Smallest square number divisible by $4, 9,$ and $10$? <i>(Answer: $900$.)</i><br>
6. Smallest multiplier for $9408$ to make it a perfect square, and the resulting square root? <i>(Answer: multiply by $3$; $\sqrt{28224}=168$.)</i><br>
7. Numbers between $16^2$ & $17^2$, and between $99^2$ & $100^2$? <i>(Answer: $32$ and $198$.)</i><br>
8. Pattern: $4^2+5^2+20^2=(\_\_)^2$ and $9^2+10^2+(\_\_)^2=(\_\_)^2$. <i>(Answer: $21^2$; and $90, 91$.)</i>
</div>
