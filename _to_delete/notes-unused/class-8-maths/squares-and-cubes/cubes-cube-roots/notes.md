# A Square and a Cube — Cubes & Cube Roots

### (Class 8 · Chapter 1, NCERT Ganita Prakash)

---

### 1.2 Cubic Numbers

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — What is a cube number?</b><br>
A cube is a solid figure where all sides meet at right angles and are equal. A cube of side 2 cm is made of $2\times2\times2=8$ unit cubes; a cube of side 3 cm needs $3\times3\times3=27$ unit cubes; a cube of side 4 units needs $4\times4\times4=64$ unit cubes (4 layers, each layer $4\times4=16$ unit cubes).
</div>

<svg viewBox="0 0 200 190" xmlns="http://www.w3.org/2000/svg">
  <polygon points="100,10 170,50 100,90 30,50" fill="#93c5fd" stroke="#1e293b" stroke-width="1.5"/>
  <polygon points="30,50 100,90 100,170 30,130" fill="#1e40af" stroke="#1e293b" stroke-width="1.5"/>
  <polygon points="100,90 170,50 170,130 100,170" fill="#2563eb" stroke="#1e293b" stroke-width="1.5"/>
  <!-- top face grid -->
  <line x1="65" y1="30" x2="135" y2="70" stroke="#ffffff" stroke-width="1.2"/>
  <line x1="135" y1="30" x2="65" y2="70" stroke="#ffffff" stroke-width="1.2"/>
  <!-- left face grid -->
  <line x1="30" y1="90" x2="100" y2="130" stroke="#ffffff" stroke-width="1.2"/>
  <line x1="65" y1="70" x2="65" y2="150" stroke="#ffffff" stroke-width="1.2"/>
  <!-- right face grid -->
  <line x1="170" y1="90" x2="100" y2="130" stroke="#ffffff" stroke-width="1.2"/>
  <line x1="135" y1="70" x2="135" y2="150" stroke="#ffffff" stroke-width="1.2"/>
  <text x="100" y="185" font-size="11" text-anchor="middle" fill="#1e293b">2 × 2 × 2 = 8 unit cubes</text>
</svg>

<div style="border-left:4px solid #16a34a;padding:8px 14px;background:#f0fdf4;margin:12px 0;">
<b>Formula — Cube notation</b>
$$n \times n \times n = n^3 \quad (\text{read as "}n\text{ cubed"})$$
$1, 8, 27, 125, \ldots$ are <b>perfect cubes</b>. Note: $9$ is not a cube ($2^3=8$, $3^3=27$), nor is any number from $10$ to $26$.
</div>

#### Table of Cubes (1–20)

| $n$ | $n^3$ | $n$ | $n^3$ |
| --- | ----- | --- | ----- |
| 1   | 1     | 11  | 1331  |
| 2   | 8     | 12  | 1728  |
| 3   | 27    | 13  | 2197  |
| 4   | 64    | 14  | 2744  |
| 5   | 125   | 15  | 3375  |
| 6   | 216   | 16  | 4096  |
| 7   | 343   | 17  | 4913  |
| 8   | 512   | 18  | 5832  |
| 9   | 729   | 19  | 6859  |
| 10  | 1000  | 20  | 8000  |

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Units digit of cubes</b><br>
Unlike squares (which only end in $0,1,4,5,6,9$), <b>cubes can end in any digit $0$–$9$</b>. A cube can never end in exactly two zeroes — like squares, trailing zeros come in a fixed multiple (a number with $k$ trailing zeros gives a cube with $3k$ trailing zeros), so two zeros is impossible.
</div>

Cubes can also be taken of fractions, decimals, and negative numbers:
$$\left(\tfrac{4}{6}\right)^3 = \tfrac{4}{6}\times\tfrac{4}{6}\times\tfrac{4}{6} = \tfrac{64}{216}, \qquad (13.08)^3 = 2237.810112, \qquad (-6)^3 = -216$$

#### Taxicab Numbers

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — The Hardy–Ramanujan Number</b><br>
When Hardy remarked that taxicab number $1729$ seemed "dull," Ramanujan replied it was the smallest number expressible as the sum of two cubes in two different ways:
$$1729 = 1^3+12^3 = 9^3+10^3$$
Numbers with this property are called <b>taxicab numbers</b>. The next two taxicab numbers are $4104 = 2^3+16^3 = 9^3+15^3$ and $13832 = 2^3+24^3=18^3+20^3$.
</div>

#### Perfect Cubes and Consecutive Odd Numbers

$$1=1^3,\quad 3+5=2^3,\quad 7+9+11=3^3,\quad 13+15+17+19=4^3,\quad 21+23+25+27+29=5^3,\quad 31+33+35+37+39+41=6^3$$

<div style="border-left:4px solid #16a34a;padding:8px 14px;background:#f0fdf4;margin:12px 0;">
<b>Formula — Sum of consecutive odd numbers as a cube</b><br>
The $n$-th group of consecutive odd numbers (with $n$ terms in that group) sums to $n^3$.
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example</b><br>
Find $91+93+95+97+99+101+103+105+107+109$ without adding term by term. This is a block of <b>10</b> consecutive odd numbers, so by the pattern above it equals $10^3 = 1000$.
</div>

#### Cube Roots

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Definition</b><br>
If $y=x^3$, then $x$ is the <b>cube root</b> of $y$, written $x=\sqrt[3]{y}$.
$$\sqrt[3]{8}=\sqrt[3]{2^3}=2,\qquad \sqrt[3]{27}=\sqrt[3]{3^3}=3,\qquad \sqrt[3]{1000}=\sqrt[3]{10^3}=10,\qquad \sqrt[3]{n^3}=n$$
</div>

<div style="border-left:4px solid #0d9488;padding:8px 14px;background:#f0fdfa;margin:12px 0;">
<b>Worked Example — Prime factorisation method for cube roots</b><br>
<u>Is 3375 a perfect cube?</u>
$$3375 = 3\times3\times3\times5\times5\times5 = (3\times3\times3)\times(5\times5\times5) = 3^3\times5^3 = (3\times5)^3 = 15^3$$
So $3375$ is a perfect cube and $\sqrt[3]{3375}=15$.<br><br>
<u>Is 500 a perfect cube?</u>
$$500 = 2\times2\times5\times5\times5$$
The factors cannot be split into three identical groups (only two 2's, no third), so $500$ is <b>not</b> a perfect cube.
</div>

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — Perfect cube test</b><br>
A number is a perfect cube if and only if its prime factors can be split into three identical groups (every prime occurs a multiple-of-3 number of times).
</div>

| Number | Prime factorisation | Cube's prime factorisation            |
| ------ | ------------------- | ------------------------------------- |
| 4      | $2\times2$          | $4^3 = 2^3\times2^3 = 64$             |
| 6      | $2\times3$          | $6^3 = 2^3\times3^3 = 216$            |
| 15     | $3\times5$          | $15^3 = 3^3\times5^3 = 3375$          |
| 12     | $2\times2\times3$   | $12^3 = 2^3\times2^3\times3^3 = 1728$ |

<div style="border-left:4px solid #d97706;padding:8px 14px;background:#fffbeb;margin:12px 0;">
<b>Common Mistake</b><br>
Don't confuse the square test (pairs of prime factors) with the cube test (triples of prime factors). $324=2^2\times3^4$ is a perfect square but not a cube; $3375=3^3\times5^3$ is a perfect cube but not a square.
</div>

#### Successive Differences

For perfect squares, taking differences of consecutive terms once gives odd numbers (Level 1), and differencing again gives a constant (Level 2):

<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg">
  <text x="8" y="24" font-size="10" fill="#64748b">Squares</text>
  <text x="20" y="24" font-size="12" fill="#1e293b">1</text>
  <text x="70" y="24" font-size="12" fill="#1e293b">4</text>
  <text x="120" y="24" font-size="12" fill="#1e293b">9</text>
  <text x="170" y="24" font-size="12" fill="#1e293b">16</text>
  <text x="220" y="24" font-size="12" fill="#1e293b">25</text>
  <text x="270" y="24" font-size="12" fill="#1e293b">36</text>
  <text x="8" y="64" font-size="10" fill="#64748b">Level 1</text>
  <text x="45" y="64" font-size="12" fill="#dc2626">3</text>
  <text x="95" y="64" font-size="12" fill="#dc2626">5</text>
  <text x="145" y="64" font-size="12" fill="#dc2626">7</text>
  <text x="195" y="64" font-size="12" fill="#dc2626">9</text>
  <text x="245" y="64" font-size="12" fill="#dc2626">11</text>
  <text x="8" y="104" font-size="10" fill="#64748b">Level 2</text>
  <text x="70" y="104" font-size="12" fill="#16a34a">2</text>
  <text x="120" y="104" font-size="12" fill="#16a34a">2</text>
  <text x="170" y="104" font-size="12" fill="#16a34a">2</text>
  <text x="220" y="104" font-size="12" fill="#16a34a">2</text>
</svg>

For perfect cubes, it takes differencing **three times** to reach a constant:

<svg viewBox="0 0 340 160" xmlns="http://www.w3.org/2000/svg">
  <text x="8" y="24" font-size="10" fill="#64748b">Cubes</text>
  <text x="30" y="24" font-size="12" fill="#1e293b">1</text>
  <text x="80" y="24" font-size="12" fill="#1e293b">8</text>
  <text x="128" y="24" font-size="12" fill="#1e293b">27</text>
  <text x="176" y="24" font-size="12" fill="#1e293b">64</text>
  <text x="222" y="24" font-size="12" fill="#1e293b">125</text>
  <text x="272" y="24" font-size="12" fill="#1e293b">216</text>
  <text x="8" y="64" font-size="10" fill="#64748b">Level 1</text>
  <text x="55" y="64" font-size="12" fill="#dc2626">7</text>
  <text x="100" y="64" font-size="12" fill="#dc2626">19</text>
  <text x="150" y="64" font-size="12" fill="#dc2626">37</text>
  <text x="200" y="64" font-size="12" fill="#dc2626">61</text>
  <text x="248" y="64" font-size="12" fill="#dc2626">91</text>
  <text x="8" y="104" font-size="10" fill="#64748b">Level 2</text>
  <text x="80" y="104" font-size="12" fill="#ea580c">12</text>
  <text x="128" y="104" font-size="12" fill="#ea580c">18</text>
  <text x="176" y="104" font-size="12" fill="#ea580c">24</text>
  <text x="224" y="104" font-size="12" fill="#ea580c">30</text>
  <text x="8" y="144" font-size="10" fill="#64748b">Level 3</text>
  <text x="105" y="144" font-size="12" fill="#16a34a">6</text>
  <text x="153" y="144" font-size="12" fill="#16a34a">6</text>
  <text x="201" y="144" font-size="12" fill="#16a34a">6</text>
</svg>

<div style="border-left:4px solid #7c3aed;padding:8px 14px;background:#f5f3ff;margin:12px 0;">
<b>Try It Yourself</b> (from the textbook's "Figure it Out")<br>
1. Cube roots of $27000$ and $10648$. <i>(Answer: $30$ and $22$.)</i><br>
2. Multiply $1323$ by what to get a perfect cube? <i>(Answer: $7$, since $1323=3^3\times7^2$.)</i><br>
3. True/False: (i) cube of any odd number is even — <i>False</i>; (ii) no perfect cube ends in 8 — <i>False</i> (e.g. $12^3=1728$); (iii) cube of a 2-digit number may be a 3-digit number — <i>False</i> (smallest is $10^3=1000$, 4 digits); (iv) cube of a 2-digit number may have 7+ digits — <i>False</i> (largest is $99^3=970299$, 6 digits); (v) cube numbers have an odd number of factors — <i>False</i> in general.<br>
4. Cube roots of $1331, 4913, 12167, 32768$ (units-digit trick). <i>(Answer: $11, 17, 23, 32$.)</i><br>
5. Greatest among $67^3{-}66^3$, $43^3{-}42^3$, $67^2{-}66^2$, $43^2{-}42^2$? <i>(Answer: $67^3-66^3 = 13267$ is greatest.)</i>
</div>

---

### 1.3 A Pinch of History

<div style="border-left:4px solid #2563eb;padding:8px 14px;background:#eff6ff;margin:12px 0;">
<b>Key Concept — History of squares and cubes</b><br>
The Babylonians compiled the first known lists of perfect squares and cubes around <b>1700 BCE</b> on clay tablets, used for land measurement and architecture.<br><br>
In ancient Sanskrit mathematics (from at least the 3rd century BCE), <b>varga</b> meant both the square figure/area and the square power; <b>ghana</b> meant both the solid cube and the cube power; the fourth power was called <b>varga-varga</b>.<br><br>
Aryabhata (499 CE): "A square figure of four equal sides and the number representing its area are called varga. The product of two equal quantities is also called varga."<br><br>
The word "root" (as in square root) comes from the Sanskrit <b>mula</b> (root of a plant, origin) — used for roots since at least the 1st century BCE, and later echoed in Arabic (<i>jidhr</i>) and Latin (<i>radix</i>). <b>Varga-mula</b> = square root, <b>ghana-mula</b> = cube root. Another term was <b>pada</b> (foot/basis). Brahmagupta (628 CE): "The pada (root) of a krti (square) is that of which it is a square."
</div>

---

### Chapter Summary (as stated in the textbook)

- A number obtained by multiplying a number by itself is a **square number**; squares of natural numbers are **perfect squares**.
- All perfect squares end with $0, 1, 4, 5, 6,$ or $9$, and can only have an **even** number of zeros at the end.
- **Square root** is the inverse of squaring. Every perfect square has two integral square roots; the positive square root is denoted $\sqrt{\ }$, e.g. $\sqrt{9}=3$.
- A number obtained by multiplying a number by itself three times is a **cube**, e.g. $1, 8, 27,\ldots$
- A number is a perfect square if its prime factors split into **two** identical groups.
- A number is a perfect cube if its prime factors split into **three** identical groups.
- The symbol $\sqrt[3]{\ }$ denotes **cube root**, e.g. $\sqrt[3]{27}=3$.

<div style="border-left:4px solid #7c3aed;padding:8px 14px;background:#f5f3ff;margin:12px 0;">
<b>Try It Yourself — Square Pairs Puzzle</b><br>
The numbers $3, 6, 10, 15, 1$ are arranged so each adjacent pair sums to a perfect square: $3+6=9$, $6+10=16$, $10+15=25$, $15+1=16$. Try arranging the numbers $1$ to $17$ (no repeats) in a row so every adjacent pair sums to a square. Can it be done in more than one way? Can you do the same for $1$ to $32$ arranged in a <i>circle</i>?
</div>

---

### Quick Formula Sheet

| #   | Rule                                         | Formula (LaTeX)                                    |
| --- | -------------------------------------------- | -------------------------------------------------- |
| 1   | Area of a square, side $s$                   | $A = s\times s = s^2$                              |
| 2   | Square notation                              | $n\times n = n^2$                                  |
| 3   | Sum of first $n$ odd numbers                 | $1+3+5+\cdots+(2n-1) = n^2$                        |
| 4   | The $n$-th odd number                        | $2n-1$                                             |
| 5   | Square root definition                       | $y=x^2 \implies x=\sqrt{y}$                        |
| 6   | Both square roots of $n^2$                   | $\sqrt{n^2} = \pm n$                               |
| 7   | Numbers strictly between $n^2$ and $(n+1)^2$ | $2n$                                               |
| 8   | Triangular numbers → square                  | $T_{n-1}+T_n = n^2$                                |
| 9   | Trailing zeros rule                          | $k$ zeros in $n$ $\Rightarrow$ $2k$ zeros in $n^2$ |
| 10  | Perfect square test (prime factorisation)    | prime factors split into **2** identical groups    |
| 11  | Volume of a cube, edge $s$                   | $V = s\times s\times s = s^3$                      |
| 12  | Cube notation                                | $n\times n\times n = n^3$                          |
| 13  | Cube root definition                         | $y=x^3 \implies x=\sqrt[3]{y}$                     |
| 14  | Perfect cube test (prime factorisation)      | prime factors split into **3** identical groups    |
| 15  | Trailing zeros in cubes                      | $k$ zeros in $n$ $\Rightarrow$ $3k$ zeros in $n^3$ |
| 16  | $n$-term block of consecutive odd numbers    | sums to $n^3$                                      |
| 17  | Taxicab number (Hardy–Ramanujan)             | $1729 = 1^3+12^3 = 9^3+10^3$                       |
