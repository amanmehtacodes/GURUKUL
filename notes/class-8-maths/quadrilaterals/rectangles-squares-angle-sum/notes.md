# QUADRILATERALS — Complete Study Notes
### (Grade 8 Ganita Prakash — Chapter 4)

---

## 📑 TABLE OF CONTENTS

1. [Introduction — What is a Quadrilateral?](#1-introduction--what-is-a-quadrilateral)
2. [Rectangles — Definition & The Carpenter's Problem](#2-rectangles--definition--the-carpenters-problem)
3. [Deduction 1 — Diagonals of a Rectangle are Equal](#3-deduction-1--diagonals-of-a-rectangle-are-equal)
4. [Deduction 2 — Diagonals of a Rectangle Bisect Each Other](#4-deduction-2--diagonals-of-a-rectangle-bisect-each-other)
5. [Deduction 3 — Angle Between Diagonals & The General Rectangle Result](#5-deduction-3--angle-between-diagonals--the-general-rectangle-result)
6. [Alternate Definition of Rectangle & The Process of Finding Properties](#6-alternate-definition-of-rectangle--the-process-of-finding-properties)
7. [Deduction 4 — All Angles 90° Implies a Rectangle](#7-deduction-4--all-angles-90-implies-a-rectangle)
8. [Properties of a Rectangle (Full List)](#8-properties-of-a-rectangle-full-list)
9. [Squares — Definition, Venn Diagrams, and Deduction 5](#9-squares--definition-venn-diagrams-and-deduction-5)
10. [Properties of a Square (Full List)](#10-properties-of-a-square-full-list)
11. [Angle Sum Property of Quadrilaterals](#11-angle-sum-property-of-quadrilaterals)
12. [Parallelograms — Definition & Construction](#12-parallelograms--definition--construction)
13. [Deduction 6 — Angles of a Parallelogram](#13-deduction-6--angles-of-a-parallelogram)
14. [Deduction 7 — Sides of a Parallelogram](#14-deduction-7--sides-of-a-parallelogram)
15. [Deduction 8 — Diagonals of a Parallelogram Bisect Each Other](#15-deduction-8--diagonals-of-a-parallelogram-bisect-each-other)
16. [Properties of a Parallelogram (Full List)](#16-properties-of-a-parallelogram-full-list)
17. [Rhombus — Definition & Construction](#17-rhombus--definition--construction)
18. [Deduction 9 — Angles in a Rhombus](#18-deduction-9--angles-in-a-rhombus)
19. [Deduction 10 — Diagonals of a Rhombus Meet at 90°](#19-deduction-10--diagonals-of-a-rhombus-meet-at-90)
20. [Properties of a Rhombus (Full List) & Venn Diagram of All Quadrilaterals](#20-properties-of-a-rhombus-full-list--venn-diagram-of-all-quadrilaterals)
21. [Playing with Quadrilaterals — Geoboard & Joining Triangles](#21-playing-with-quadrilaterals--geoboard--joining-triangles)
22. [Kite — Definition & Properties](#22-kite--definition--properties)
23. [Trapezium & Isosceles Trapezium — Definition & Properties](#23-trapezium--isosceles-trapezium--definition--properties)
24. [Figure It Out — All Solved Questions](#24-figure-it-out--all-solved-questions)
25. [Chapter Summary](#25-chapter-summary)
26. [Extra Practice Questions (Self-made)](#26-extra-practice-questions-self-made)

---

## 1. INTRODUCTION — WHAT IS A QUADRILATERAL?

### 🔑 Definition
A **quadrilateral** is a closed four-sided figure. The word comes from Latin: *quadri* (four) + *latus* (side).
- The **angles of a quadrilateral** are the angles formed between its adjacent sides at each vertex.

### 📖 Explanation
Not every four-cornered shape drawn is a quadrilateral — the figure must be **closed**, made of exactly **4 straight sides**, and must not be **self-intersecting** (crossing over itself) to be considered a "simple quadrilateral" studied in this chapter.

```
  Valid quadrilateral:        Invalid (self-intersecting):
     A-------B                    A-------B
     |       |                     \     /
     |       |                      \   /
     D-------C                       \ /
                                      X  (crosses itself - "bowtie")
                                     / \
                                    D---C
```

### ❓ Q&A
**Q1. Why are some four-sided figures NOT considered quadrilaterals in this chapter's sense?**
A. Because a proper quadrilateral must be a **closed, simple** (non-self-intersecting) figure with exactly 4 straight sides. Figures that cross over themselves or aren't fully closed don't qualify.

**Q2. What does the word "quadrilateral" literally mean, based on its Latin origin?**
A. **"Four sides"** — *quadri* means four, *latus* means side.

**Q3 (own). Is a triangle with an extra point added on one side (making it look like 4 sides but 3 are collinear) a quadrilateral?**
A. No — for it to be a true quadrilateral, all 4 sides must be **distinct straight segments** meeting at 4 distinct vertices, forming actual angles at each corner (not a flat 180° "angle").

---

## 2. RECTANGLES — DEFINITION & THE CARPENTER'S PROBLEM

### 🔑 Definition
**Rectangle:** A quadrilateral in which:
(i) All angles are **right angles (90°)**, and
(ii) **Opposite sides** are of **equal length**.

### 📖 Explanation — The Carpenter's Problem
A carpenter wants to join two thin wooden strips (which act as **diagonals**) so that a thread through their endpoints forms a rectangle. She has one strip of **8 cm**. The problem asks:
1. What length should the other strip be?
2. Where should the strips be joined (what point of intersection)?
3. What angle should be between them?

```
        B
        |
        O   <- point where strips (diagonals) cross
        |
        A
   (Strips AC and BD will become diagonals of rectangle ABCD)
```

We answer these using **geometric deduction** — reasoning step-by-step from known facts (like congruence rules) to prove new properties, rather than just measuring and guessing.

### ❓ Q&A
**Q1. What are the two defining conditions of a rectangle (initial definition)?**
A. **(i)** All angles are 90°, **(ii)** opposite sides are equal in length.

**Q2. In the Carpenter's Problem, what do the wooden strips represent geometrically?**
A. They represent the **diagonals** of the rectangle to be formed — the rectangle's vertices are the strips' endpoints.

**Q3. What three questions must be answered to solve the Carpenter's Problem?**
A. **(1)** Length of the other diagonal, **(2)** point of intersection of the diagonals, **(3)** angle between the diagonals.

**Q4 (own). Why does the carpenter need to know the angle between the diagonals, not just their lengths?**
A. Because even if two diagonals have equal length and bisect each other, the **angle** between them determines the shape of the resulting quadrilateral (as we'll see, only a 90° angle between equal, bisecting diagonals with appropriate side lengths gives certain shapes — the general case still gives a rectangle regardless of angle, but a square specifically needs 90°).

---

## 3. DEDUCTION 1 — DIAGONALS OF A RECTANGLE ARE EQUAL

### 🔑 Result
> **The diagonals of a rectangle are always equal in length.**

### 📖 Explanation — Proof via Congruence
```
        B---------C
        |         |
        |         |
        A---------D
   (Rectangle ABCD; compare triangles ADC and DAB)
```
In rectangle ABCD:
- AB = CD (opposite sides of rectangle)
- ∠BAD = ∠CDA = 90°
- AD is common to both triangles ΔADC and ΔDAB

By **SAS (Side-Angle-Side) congruence**: ΔADC ≅ ΔDAB
Therefore, **AC = BD** (corresponding parts of congruent triangles), proving the diagonals are equal.

### ❓ Q&A
**Q1. Which congruence condition is used to prove the diagonals of a rectangle are equal?**
A. **SAS (Side-Angle-Side)** congruence.

**Q2. In the Carpenter's Problem, if one diagonal is 8 cm, what must the other diagonal's length be?**
A. **8 cm** — since the diagonals of a rectangle are always equal.

**Q3. Which two triangles are compared to prove this property, and what three facts about them are used?**
A. ΔADC and ΔDAB are compared, using: AB=CD (opposite sides equal), ∠BAD=∠CDA=90° (right angles), and AD is a common side.

**Q4 (own). If a quadrilateral's diagonals are NOT equal, can it still be a rectangle?**
A. **No** — equal diagonals is a **necessary** property of every rectangle (though, as we'll see, equal diagonals alone aren't sufficient to guarantee a rectangle without the bisection condition too).

---

## 4. DEDUCTION 2 — DIAGONALS OF A RECTANGLE BISECT EACH OTHER

### 🔑 Result
> **The diagonals of a rectangle always intersect at their midpoints** (i.e., they **bisect** each other).

### 🔑 Definition
**Bisect:** To divide a quantity into two **equal parts**.

### 📖 Explanation — Proof via Congruence
```
        B---------C
        |\       /|
        | \     / |
        |  \   /  |
        |   \ /   |
        |    O    |   <- intersection point of diagonals
        |   / \   |
        |  /   \  |
        | /     \ |
        A---------D
```
- The angles marked at O (vertically opposite) are equal.
- ∠1 and ∠2 (formed with the right angles at B) are shown equal: since ∠B=90°, ∠3+∠1=90°; and in ΔBCD, ∠3+∠2+90°=180°, so ∠3+∠2=90°. Therefore **∠1 = ∠2**.
- By the **AAS (Angle-Angle-Side)** condition: ΔAOB ≅ ΔCOD
- Therefore **OA = OC** and **OB = OD** (corresponding parts of congruent triangles)
- So **O is the midpoint** of both AC and BD.

### ❓ Q&A
**Q1. What does it mean for diagonals to "bisect each other"?**
A. It means they **cross at a point that is the midpoint of both diagonals** — each diagonal is divided into two equal halves at the intersection point.

**Q2. Which congruence condition proves that the diagonals of a rectangle bisect each other?**
A. **AAS (Angle-Angle-Side)** condition, applied to ΔAOB and ΔCOD.

**Q3. Can the following equalities be used to establish ΔAOD ≅ ΔCOB? AO=CO (proved), ∠AOB=∠COD (vertically opposite), AD=CB.**
A. *(Math Talk from textbook)* We need to check the angle used is the **included** angle for SAS, or find a valid alternate set. Using AO=CO, AD=CB, and the vertical angle ∠AOD=∠COB (not ∠AOB=∠COD as stated, which corresponds to a different pair) — with correctly matched vertical angles, **yes**, SAS congruence can establish ΔAOD ≅ ΔCOB.

**Q4 (own). If a quadrilateral's diagonals bisect each other but are NOT equal, is it necessarily a rectangle?**
A. **No** — bisecting diagonals alone give a **parallelogram** (a broader category); equal length is an ADDITIONAL requirement specifically needed for a rectangle.

---

## 5. DEDUCTION 3 — ANGLE BETWEEN DIAGONALS & THE GENERAL RECTANGLE RESULT

### 🔑 Result
> **Regardless of the angle between the diagonals**, if the diagonals of a quadrilateral are **equal in length AND bisect each other**, the quadrilateral formed is always a **rectangle** (all angles 90°, opposite sides equal).

### 📖 Explanation — Specific Case (60° angle)
```
        A---------B
         \   60° /
          \     /
           \   /
            \ /
             O
            / \
           /   \
          /     \
         /  120° \
        D---------C
```
With diagonals equal, bisecting each other, and a 60° angle between them:
- In ΔAOB (isosceles, since OA=OB): base angles are equal, call them **a**. Then a+a+60°=180° → **a=60°**.
- Working through all four small triangles, we get angles of 60°,60°,30°,30° repeating, and each corner angle of the quadrilateral = 30°+60° = **90°**.
- Since ΔAOB≅ΔCOD and ΔAOD≅ΔCOB, we get AB=CD and AD=CB (opposite sides equal).
- **Conclusion: ABCD is a rectangle.**

### 📖 Explanation — General Case (angle = x)
```
        A---------B
         \   x   /
          \     /
     180-x \   / 180-x
            \ /
             O
            / \
     180-x /   \ 180-x
          /     \
         /   x   \
        D---------C
```
Let the angle between diagonals be a general value **x**. The four angles formed at O are: **x, x, (180−x), (180−x)**.

- In isosceles ΔAOB: base angles **a** satisfy 2a+x=180° → **a = 90 − x/2**
- In isosceles ΔAOD: base angles **b** satisfy 2b+(180−x)=180° → **b = x/2**
- Each corner angle of the quadrilateral = a+b = (90 − x/2) + (x/2) = **90°** — for ANY value of x!

**Key takeaway:** No matter what angle x is chosen between equal, bisecting diagonals, all four resulting angles are always 90°, and opposite sides are always equal. **This proves the quadrilateral is always a rectangle.**

### ❓ Q&A
**Q1. If the angle between two equal, bisecting diagonals is 60°, what is angle 'a' in the isosceles triangle formed?**
A. **a = 60°** (from a+a+60=180 → 2a=120 → a=60)

**Q2. In the general case with angle x between the diagonals, find the base angle 'a' of the isosceles triangle with vertex angle x.**
A. **a = 90 − x/2** (from 2a+x=180)

**Q3. In the general case, find the base angle 'b' of the isosceles triangle with vertex angle (180−x).**
A. **b = x/2** (from 2b+(180−x)=180 → 2b=x → b=x/2)

**Q4. Show that a+b always equals 90°, regardless of x.**
A. a+b = (90 − x/2) + (x/2) = 90 − x/2 + x/2 = **90°** ✓ (the x/2 terms cancel out)

**Q5. Why is this result significant for the Carpenter's Problem?**
A. It shows that **any angle** can be chosen between the diagonals (as long as they're equal and bisect each other) and the result will **always** be a rectangle — the carpenter doesn't need to worry about a specific angle, only about equal length and bisection at the midpoint.

**Q6 (own). If x=90° in the general formula, what shape do we get, and why is this special?**
A. When x=90°, we get a=90−45=45° and b=45°, and since the diagonals are equal AND perpendicular AND bisecting, this special case gives a **square** (a rectangle with additionally perpendicular diagonals, which — combined with equal diagonals — forces all sides equal too, as we see later).

---

## 6. ALTERNATE DEFINITION OF RECTANGLE & THE PROCESS OF FINDING PROPERTIES

### 🔑 Alternate Definition
**Rectangle (2nd definition):** A quadrilateral whose **diagonals are equal and bisect each other**.

### 📖 Explanation — Two Equivalent Definitions
Both of these describe the exact same class of shapes:
1. **Angle-based definition:** All angles 90° + opposite sides equal.
2. **Diagonal-based definition:** Diagonals equal + diagonals bisect each other.

### 🔑 Key Concept: Deduction vs. Conjecture
- **Deduction (proof):** Using logical/geometric reasoning to show a property **must always** be true, for every case.
- **Conjecture:** A statement we're **highly confident** about (based on observation/measurement of a few examples) but haven't yet **proven** to always hold.

⚠️ **Important:** Measuring a few rectangles and observing that diagonals bisect each other does NOT guarantee this holds for the 1000th rectangle constructed. Only a **proof** (like Deduction 2) gives certainty.

### 📖 Real-World Application
- **Carpenters in Europe** use the "equal diagonals bisecting each other" method to construct rectangular frames.
- **Farmers in Mozambique** use this same method to construct rectangular house bases.

### ❓ Q&A
**Q1. State the alternate (diagonal-based) definition of a rectangle.**
A. A rectangle is a quadrilateral whose **diagonals are equal and bisect each other**.

**Q2. What is the difference between a "conjecture" and a "deduction" (proof) in geometry?**
A. A **conjecture** is a confident guess based on limited observation/measurement, not yet proven for all cases. A **deduction** is a logical proof showing the property MUST hold true in every case, using established rules (like congruence).

**Q3. Why can't we be 100% sure a property holds for all rectangles just by measuring a few examples?**
A. Because measurement only checks the **specific examples tested** — there's no guarantee the pattern continues for every possible rectangle (e.g., the "1000th rectangle") unless it's logically **proven**.

**Q4 (own). Name two real-world professions/practices mentioned that use the "equal + bisecting diagonals" method to construct rectangles.**
A. **Carpenters in Europe** (for rectangular frames) and **farmers in Mozambique** (for rectangular house bases).

---

## 7. DEDUCTION 4 — ALL ANGLES 90° IMPLIES A RECTANGLE

### 🔑 Result
> **If all four angles of a quadrilateral are 90°, then its opposite sides must be equal** — meaning the quadrilateral is necessarily a rectangle.

This means the rectangle definition can be **simplified** to just: **"A rectangle is a quadrilateral in which all angles are 90°"** (the equal-opposite-sides condition follows automatically!).

### 📖 Explanation — Proof via Congruence
```
        B---------C
        |        /|
        |       / |
        |      /  |
        |     /   |
        A---------D
   (Join diagonal BD; compare triangles BAD and DCB)
```
Consider quadrilateral ABCD with **all angles = 90°**. Join diagonal BD.
- BD is common to both ΔBAD and ΔDCB.
- Since ∠B=90°: ∠3+∠1=90° (where ∠1 is part of angle B in triangle BAD)
- In ΔBCD: ∠3+∠2+90°=180°, so ∠3+∠2=90°
- Therefore **∠1 = ∠2**
- By **AAS congruence**: ΔBAD ≅ ΔDCB
- Therefore **AD=CB** and **DC=BA** (corresponding sides of congruent triangles) — opposite sides are equal!

### ⚠️ Congruence Notation Care
**Q (textbook):** Is it wrong to write ΔBAD ≅ ΔCDB instead of ΔBAD ≅ ΔDCB?
A. **Yes, it would be wrong** — the order of vertices in a congruence statement must match corresponding vertices exactly. ΔBAD≅ΔDCB means B↔D, A↔C, D↔B in that specific correspondence; writing ΔCDB changes which vertices are claimed to correspond, which may not match the actual congruence relationship proven.

### ❓ Q&A
**Q1. What does Deduction 4 prove, in one sentence?**
A. That **if all angles of a quadrilateral are 90°, its opposite sides must automatically be equal**, making it a rectangle.

**Q2. What is the simplified (shortest) definition of a rectangle, based on this deduction?**
A. **"A rectangle is a quadrilateral in which all the angles are 90°."** (The equal-sides condition is no longer needed as a separate requirement — it follows automatically.)

**Q3. Which diagonal is drawn to prove Deduction 4, and which two triangles are compared?**
A. Diagonal **BD** is drawn; triangles **ΔBAD and ΔDCB** are compared.

**Q4. Why is it important to write congruence statements with vertices in the correct corresponding order?**
A. Because the **order indicates which specific angles/sides correspond** to each other — writing vertices in the wrong order could incorrectly imply equalities between parts that aren't actually equal.

**Q5 (own). Try constructing a quadrilateral with all angles 90° but opposite sides NOT equal. Why is this impossible?**
A. It's impossible because Deduction 4 **proves** that all-90°-angles forces opposite sides to be equal — there's no way to construct a counterexample, since the geometric constraint mathematically guarantees equal opposite sides.

---

## 8. PROPERTIES OF A RECTANGLE (FULL LIST)

### 🔑 Complete Property List
| # | Property |
|---|---|
| 1 | All angles of a rectangle are **90°** |
| 2 | **Opposite sides** of a rectangle are **equal** |
| 3 | **Opposite sides** of a rectangle are **parallel** to each other |
| 4 | **Diagonals** of a rectangle are of **equal length** and they **bisect each other** |

### 📖 Explanation — Why Opposite Sides are Parallel (Property 3)
```
        B---------C
        |         |
        |         |
        A---------D
```
AB acts as a **transversal** to AD and BC. Since ∠A + ∠B = 90°+90° = **180°**, and when the sum of interior angles on the same side of a transversal is 180°, the two lines must be **parallel**. Therefore **AD || BC**.
Similarly, using BC (or another transversal), we can show **AB || DC**.

### ❓ Q&A
**Q1. List all 4 properties of a rectangle.**
A. **(1)** All angles 90°, **(2)** opposite sides equal, **(3)** opposite sides parallel, **(4)** diagonals equal and bisect each other.

**Q2. Using the transversal rule, prove that AB is parallel to DC.**
A. AD acts as a transversal to AB and DC. Since ∠A+∠D = 90°+90° = 180° (co-interior angles on the same side of transversal AD), we conclude **AB || DC**.

**Q3. What rule about transversals and parallel lines is used to prove Property 3?**
A. **If the sum of interior angles on the same side of a transversal is 180°, the two lines are parallel.**

**Q4 (own). Is it possible for a rectangle to have all four properties EXCEPT equal diagonals? Explain.**
A. **No** — all four properties are proven consequences of the basic definition (all angles 90°); they always occur together in every rectangle, never independently.

---

## 9. SQUARES — DEFINITION, VENN DIAGRAMS, AND DEDUCTION 5

### 🔑 Definition
**Square:** A quadrilateral in which **all angles are 90°** AND **all sides are of equal length**.

### 📖 Explanation — A Square is a Special Rectangle
Since a square has all angles 90°, it satisfies the rectangle definition. It's simply a rectangle with the **extra condition** that all sides (not just opposite sides) are equal.

> **Every square is a rectangle, but not every rectangle is a square.**

### 🔑 Venn Diagram Representation
```
   ___________________
  /  Rectangle         \
  /   ___________       \
  |   |  Square   |      |
  |   |___________|      |
  \                      /
   \____________________/
```
Each point inside the "Square" circle represents a square; since every square is also a rectangle, the "Square" circle sits **entirely inside** the "Rectangle" circle.

### 📖 Deduction 5 — Angle Between Diagonals of a Square
**Result:** The diagonals of a square **bisect each other at right angles (90°)**.

```
        A---------B
         \       /
          \     /
           \   /
            \ /
             O
            / \
           /   \
          /     \
        D---------C
   (diagonals AC and BD meet at O at 90°)
```

**Proof:** In square ABCD, consider ΔBOA and ΔBOC:
- BO is common to both.
- BA = BC (all sides of a square are equal).
- AO = CO (diagonals bisect each other, proven for rectangles, and squares are rectangles).
- By **SSS congruence**: ΔBOA ≅ ΔBOC
- Therefore ∠BOA = ∠BOC (corresponding angles of congruent triangles)
- Since ∠BOA + ∠BOC = 180° (they form a straight angle/straight line), and they're equal, each must be **90°**.

**Conclusion:** To construct a square, diagonals must be **equal in length** AND **bisect each other at right angles (90°)**.

### ❓ Q&A
**Q1. Define a square.**
A. A quadrilateral with **all angles 90°** and **all sides of equal length**.

**Q2. Why is every square automatically a rectangle?**
A. Because a square satisfies the rectangle's defining condition (**all angles = 90°**) — it's simply a rectangle with the added constraint of equal side lengths.

**Q3. What congruence condition is used in Deduction 5 to find the angle between the diagonals of a square?**
A. **SSS (Side-Side-Side)** congruence, applied to ΔBOA and ΔBOC.

**Q4. What two conditions must the diagonals satisfy for a quadrilateral to be a square (using the diagonal-based approach)?**
A. The diagonals must be **equal in length** AND must **bisect each other at right angles (90°)**.

**Q5 (own). Construct (describe in words) how you would draw a square with diagonal length 8 cm, using the diagonal method.**
A. Draw a line segment of 8 cm; mark its midpoint O. Through O, draw a perpendicular line (90° to the first). On this perpendicular line, mark two points 4 cm on either side of O (so the second diagonal is also 8 cm, bisected at O). Connect the four endpoints in order to form the square.

---

## 10. PROPERTIES OF A SQUARE (FULL LIST)

### 🔑 Complete Property List
| # | Property |
|---|---|
| 1 | All **sides** of a square are **equal** to each other |
| 2 | **Opposite sides** of a square are **parallel** |
| 3 | All **angles** of a square are **90°** |
| 4 | **Diagonals** are of **equal length** and **bisect each other at 90°** |
| 5 | **Diagonals bisect the angles** of the square (each corner angle splits into two 45° angles) |

### 📖 Explanation — Property 5 (Diagonals Bisect Angles)
```
        A---------B
        |\       /|
        | \  2  / |
        |1 \   /  |
        |    \ /  4
        |    /|\  |
        | 3 / | \ |
        |  /  |  \|
        D---------C
```
In ΔADC: ∠1 + ∠3 + 90° = 180° (since ∠ADC=90°). Since AD=DC (equal sides of square), the triangle is isosceles, so **∠1 = ∠3**. Solving: 2∠1 = 90°, so **∠1 = ∠3 = 45°**.
By similar reasoning, **∠2 = ∠4 = 45°** as well — showing each 90° corner angle is split into two equal 45° halves by the diagonal.

### ❓ Q&A
**Q1. List all 5 properties of a square.**
A. **(1)** All sides equal, **(2)** opposite sides parallel, **(3)** all angles 90°, **(4)** diagonals equal & bisect at 90°, **(5)** diagonals bisect the angles.

**Q2. What angle do the diagonals of a square create when they bisect a 90° corner angle?**
A. Each diagonal splits the 90° angle into two **45°** angles.

**Q3. Which property is UNIQUE to a square among the properties listed (not shared with a general rectangle)?**
A. Properties **1** (all sides equal), **4**'s "at 90°" part, and **5** (diagonals bisect angles) are unique to squares — a general rectangle has equal diagonals that bisect each other, but NOT necessarily at 90°, and doesn't have all sides equal or angle-bisecting diagonals.

**Q4 (own). If a rectangle's diagonals bisect each other at 90°, what additional property must it then have?**
A. It must have **all sides equal** — meaning it becomes a **square**.

---

## 11. ANGLE SUM PROPERTY OF QUADRILATERALS

### 🔑 Result
> **The sum of all interior angles in any quadrilateral is always 360°.**

### 📖 Explanation — Proof via Triangulation
```
        S-----------O
       / \          |
      /   \    5     |
     / 4   \        |
    /   1   \   6    |
   /_________\_______|
  E     3    M       (drawing diagonal SM splits SOME into 2 triangles)
```
Consider quadrilateral SOME. Draw diagonal **SM**, splitting it into ΔSEM and ΔSOM.
- In ΔSEM: ∠1+∠2+∠3 = 180°
- In ΔSOM: ∠4+∠5+∠6 = 180°
- Adding all six angles: (∠1+∠2+∠3) + (∠4+∠5+∠6) = 180°+180° = **360°**
- Regrouping: (∠1+∠4) + (∠3+∠6) + ∠2 + ∠5 = 360°, where (∠1+∠4), (∠3+∠6), ∠2, and ∠5 are the **four actual angles of the quadrilateral**.

**Conclusion:** The four angles of ANY quadrilateral always sum to 360°.

### ✅ Key Consequence
This explains why it's **impossible** for a quadrilateral to have exactly **three right angles (90°) with the fourth angle NOT 90°** — since 90+90+90=270°, the fourth angle would be forced to be 360−270=90° as well (making all four angles 90°, i.e., a rectangle).

### ❓ Q&A
**Q1. What is the sum of all interior angles in any quadrilateral?**
A. **360°**.

**Q2. How is the 360° result proven, using triangles?**
A. By drawing **one diagonal**, splitting the quadrilateral into **2 triangles**. Since each triangle's angles sum to 180°, the total for both triangles is 180°+180°=360°, which equals the sum of the quadrilateral's four angles (after regrouping the six triangle-angles into the four actual corner angles).

**Q3. Why can't a quadrilateral have exactly three 90° angles and a fourth angle that ISN'T 90°?**
A. Because 90+90+90 = 270°, and since all four angles must total exactly 360°, the fourth angle is **forced to be exactly 90°** (360−270=90) — there's no freedom for it to be anything else.

**Q4 (own). If three angles of a quadrilateral are 100°, 80°, and 95°, what is the fourth angle?**
A. 360 − (100+80+95) = 360 − 275 = **85°**.

**Q5 (own). Does the angle sum property (360°) apply even to non-convex (concave) quadrilaterals, like an arrowhead shape?**
A. **Yes** — as shown in the textbook's "Try This" question, the same diagonal-splitting proof method works even for such quadrilaterals, and the sum remains 360° (verified both by construction/measurement and by geometric reasoning).

---
