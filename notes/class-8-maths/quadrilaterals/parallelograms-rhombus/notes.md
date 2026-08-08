# Quadrilaterals — Parallelograms & Rhombus
### (Continued — Grade content, Part 2)

---

## 12. PARALLELOGRAMS — DEFINITION & CONSTRUCTION

### 🔑 Definition
**Parallelogram:** A quadrilateral in which **opposite sides are parallel**.

### 📖 Explanation — A Broader Category
```
        A---------B
       /         /
      /         /
     D---------C
   (ABCD has AB||DC and AD||BC, but is NOT a rectangle - angles aren't 90°)
```
A rectangle has parallel opposite sides, so **every rectangle is a parallelogram** — but a parallelogram doesn't require 90° angles, so **not every parallelogram is a rectangle**.

### 🔑 Venn Diagram Update
```
   _________________________
  /     Parallelogram        \
  /    ___________            \
  |    | Rectangle |           |
  |    |  ______   |           |
  |    | |Square|  |           |
  |    | |______|  |           |
  |    |___________|           |
  \                            /
   \__________________________/
```

### 📖 Explanation — Constructing a Parallelogram
**Steps** (example: sides 4cm & 5cm, angle 30° between them):
1. Draw AB=4cm and AD=5cm with 30° angle between them at A.
2. Draw a line through D parallel to AB, and a line through B parallel to AD.
3. Mark their intersection point as C. **ABCD is the required parallelogram.**

```
        D-----------C
       /5cm        /
      /  30°      /
     A-----------B
          4cm
```

### ❓ Q&A
**Q1. Define a parallelogram.**
A. A quadrilateral in which **opposite sides are parallel**.

**Q2. Is every rectangle a parallelogram? Is every parallelogram a rectangle?**
A. **Every rectangle IS a parallelogram** (since rectangles have parallel opposite sides), but **NOT every parallelogram is a rectangle** (a parallelogram doesn't require 90° angles).

**Q3. Describe the construction steps for a parallelogram with given adjacent side lengths and included angle.**
A. Draw the two adjacent sides from a common vertex at the given angle; then draw a line through the endpoint of each side, parallel to the OTHER side; their intersection gives the fourth vertex.

**Q4 (own). If a parallelogram has one angle of 30°, name the general relationship between this and its adjacent angles (without doing full calculation yet).**
A. The adjacent angles are **supplementary** (they add up to 180°) since they lie on the same side of a transversal to the parallel sides — full proof follows in Deduction 6.

---

## 13. DEDUCTION 6 — ANGLES OF A PARALLELOGRAM

### 🔑 Result
> **In a parallelogram: adjacent angles add up to 180° (supplementary), and opposite angles are equal.**

### 📖 Explanation — Proof
```
        D-----------C
       /150°    30°/
      /            /
     A-----------B
      30°     150°
```
In parallelogram ABCD (with AB||CD, AD is a transversal):
- **∠A + ∠D = 180°** (co-interior angles, since AB||CD and AD is a transversal)
- Similarly, since AD||BC (with AB, CD as transversals): **∠A+∠B=180°**, **∠C+∠D=180°**, **∠B+∠C=180°**

If ∠A=30°: then ∠D=180−30=**150°**, ∠B=180−30=**150°**, and ∠C=180−150=**30°**.

**General proof for opposite angles being equal:** Let ∠P=x. Since ∠P+∠R=180°, ∠R=180−x. Since ∠A+∠R=180° (another pair), ∠A=180−(180−x)=x. So **∠P=∠A=x**. Similarly ∠R=∠E=180−x.
**Conclusion: Opposite angles of a parallelogram are always equal.**

### ❓ Q&A
**Q1. In a parallelogram, if one angle is 30°, what are the other three angles?**
A. **150°, 30°, 150°** (adjacent angles are 150° each, and the angle opposite to the 30° angle is also 30°).

**Q2. State the two key angle relationships in any parallelogram.**
A. **(1)** Adjacent angles are supplementary (sum to 180°). **(2)** Opposite angles are equal.

**Q3. Why are adjacent angles in a parallelogram supplementary?**
A. Because the two parallel sides create a transversal relationship where the **co-interior (same-side) angles** must sum to 180°.

**Q4 (own). If one angle of a parallelogram is 72°, find all four angles.**
A. Adjacent angles: 180−72=**108°**. So the four angles are **72°, 108°, 72°, 108°** (opposite angles equal, adjacent angles supplementary).

---

## 14. DEDUCTION 7 — SIDES OF A PARALLELOGRAM

### 🔑 Result
> **The opposite sides of a parallelogram are always equal.**

### 📖 Explanation — Proof via Congruence
```
        D-----------C
       /           /
      /           /
     A-----------B
   (Compare triangles ABD and CDB, using diagonal BD)
```
In parallelogram ABCD, draw diagonal BD, forming ΔABD and ΔCDB.
- The angles marked with a **single arc** are equal (opposite angles of the parallelogram, from Deduction 6).
- Since AD||BC and BD is a transversal, the angles marked with **double arcs** are equal (alternate angles).
- BD is a **common side**.
- By **AAS condition**: ΔABD ≅ ΔCDB
- Therefore **AD = CB** and **AB = CD** (corresponding sides of congruent triangles).

**Conclusion:** Opposite sides of a parallelogram are always equal.

### ⚠️ Congruence Notation Care
**Q (textbook):** Is it wrong to write ΔABD ≅ ΔCBD instead of ΔABD ≅ ΔCDB?
A. **Yes** — the vertex correspondence must be exact; writing ΔCBD instead of ΔCDB implies a different (incorrect) matching of corresponding parts, which doesn't align with the actual proven congruence relationship.

### ❓ Q&A
**Q1. What congruence condition proves opposite sides of a parallelogram are equal?**
A. **AAS (Angle-Angle-Side)** condition, applied to ΔABD and ΔCDB.

**Q2. Which diagonal is drawn to prove this property, and what type of angles are used in the proof?**
A. Diagonal **BD** is drawn; the proof uses **opposite angles of the parallelogram** (equal, from Deduction 6) and **alternate angles** (from the parallel sides AD||BC with transversal BD).

**Q3. If a parallelogram has one side of length 4 cm, what can we say about the side opposite to it?**
A. It must also be **4 cm** (opposite sides of a parallelogram are always equal).

**Q4 (own). Are the diagonals of a parallelogram always equal in length, like a rectangle's diagonals?**
A. **No** — unlike a rectangle, a general parallelogram's diagonals are **not necessarily equal**; this can be verified by construction/measurement.

---

## 15. DEDUCTION 8 — DIAGONALS OF A PARALLELOGRAM BISECT EACH OTHER

### 🔑 Result
> **The diagonals of a parallelogram always bisect each other** (though they are not necessarily equal in length, and don't necessarily cross at 90°).

### 📖 Explanation — Proof via Congruence
```
        E-----------A
       /   \       /
      /     \ O   /
     /       \   /
    Y-----------S
   (Parallelogram EASY; diagonals AY and ES cross at O)
```
Consider parallelogram EASY, comparing ΔAOE and ΔYOS:
- **AE = YS** (opposite sides of the parallelogram, equal by Deduction 7)
- Angles marked with a **single arc** are equal (alternate angles, since AE||YS with transversal AY... or ES)
- Angles marked with a **double arc** are equal (alternate angles, from the other pair of parallel sides)
- By **ASA condition**: ΔAOE ≅ ΔYOS
- Therefore **OA = OY** and **OE = OS** (corresponding parts of congruent triangles)
- So **O is the midpoint of both diagonals.**

### ⚠️ Congruence Notation Care
**Q (textbook):** Is it wrong to write ΔAOE ≅ ΔSOY instead of ΔAOE ≅ ΔYOS?
A. **Yes** — again, vertex correspondence matters; ΔSOY implies a different vertex pairing than what was actually proven (ΔYOS), so it would misrepresent which specific parts are equal.

### ❓ Q&A
**Q1. What congruence condition is used to prove the diagonals of a parallelogram bisect each other?**
A. **ASA (Angle-Side-Angle)** condition, applied to ΔAOE and ΔYOS.

**Q2. Do the diagonals of a parallelogram bisect each other at a fixed angle (like 90° for a rhombus)?**
A. **No** — the diagonals of a GENERAL parallelogram bisect each other but do NOT necessarily meet at any particular fixed angle; this depends on the specific parallelogram.

**Q3. Summarize: what is proven about a parallelogram's diagonals, and what is NOT guaranteed?**
A. **Proven:** diagonals bisect each other (cross at their common midpoint). **NOT guaranteed:** that they are equal in length, or that they cross at 90°.

**Q4 (own). If a parallelogram's diagonals happen to ALSO be equal in length, what additional shape classification does it gain?**
A. It becomes a **rectangle** (equal + bisecting diagonals is the diagonal-based definition of a rectangle).

---

## 16. PROPERTIES OF A PARALLELOGRAM (FULL LIST)

### 🔑 Complete Property List
| # | Property |
|---|---|
| 1 | **Opposite sides** of a parallelogram are **equal** |
| 2 | **Opposite sides** of a parallelogram are **parallel** |
| 3 | **Adjacent angles** add up to **180°**; **opposite angles** are **equal** |
| 4 | **Diagonals** of a parallelogram **bisect each other** |

### ❓ Q&A
**Q1. List all 4 properties of a parallelogram.**
A. **(1)** Opposite sides equal, **(2)** opposite sides parallel, **(3)** adjacent angles supplementary & opposite angles equal, **(4)** diagonals bisect each other.

**Q2. How many of these 4 properties also apply to a rectangle?**
A. **All 4** — since a rectangle IS a parallelogram, all parallelogram properties apply, PLUS the rectangle's additional properties (all angles=90°, diagonals equal).

**Q3 (own). A quadrilateral has diagonals that bisect each other. What is the MINIMUM classification we can give it (without more information)?**
A. It must be at least a **parallelogram** (this is proven to be a sufficient condition, connecting to Figure It Out Q9 in the chapter, which shows bisecting diagonals imply a parallelogram).

---
## 17. RHOMBUS — DEFINITION & CONSTRUCTION

### 🔑 Definition
**Rhombus:** A quadrilateral in which **all sides have the same length**.

### 📖 Explanation — Not Just Squares!
Squares aren't the only quadrilaterals with equal side lengths. By choosing **any angle** (not just 90°) between two equal adjacent sides, and completing the quadrilateral with matching equal sides, we get a **rhombus**.

```
        D-----------C
       /           /
      /  50°      /
     A-----------B
   (All 4 sides equal length, but angle is 50°, not 90° - this is a rhombus, not a square)
```

**Construction method:** Draw two equal sides (e.g., AD and AB) at some angle (e.g., 50°) that are NOT perpendicular. Using a compass, mark point C such that its distance from both B and D equals the side length. Join to complete the rhombus.

### ❓ Q&A
**Q1. Define a rhombus.**
A. A quadrilateral in which **all four sides have the same length**.

**Q2. Is a square a rhombus? Is a rhombus always a square?**
A. **Every square IS a rhombus** (since all its sides are equal), but **NOT every rhombus is a square** (a rhombus can have angles other than 90°).

**Q3. Describe how to construct a rhombus given a side length and one angle (not 90°).**
A. Draw two sides of the given length from a common vertex, with the given angle between them; use a compass to mark the fourth vertex, equidistant (by the same side length) from the two open endpoints; join to complete the rhombus.

**Q4 (own). Can a rhombus have all angles different from 90°, and if so, is it still a valid quadrilateral with all standard rhombus properties?**
A. **Yes** — as long as all 4 sides are equal length, it's a rhombus regardless of its angles (except that opposite angles will still be equal, and adjacent angles supplementary, as proven for all parallelograms since a rhombus is also a parallelogram).

---

## 18. DEDUCTION 9 — ANGLES IN A RHOMBUS

### 🔑 Result
> **In any rhombus, a diagonal creates two pairs of equal base angles** (since the triangles formed are isosceles), **and opposite angles of the rhombus are equal.**

### 📖 Explanation — Proof
```
        E-----------M
       / a         b\
      /               \
     /  d           c  \
    G-------------------A
   (Rhombus GAME; diagonal GA splits it into 2 isosceles triangles)
```
In rhombus GAME:
- In ΔGAE: since **GE=GA** (sides of rhombus), the triangle is isosceles, so **a=d** (base angles opposite equal sides).
- In ΔMAE: since **ME=MA**, similarly **b=c**.
- It can be shown ΔGAE ≅ ΔMAE (using SSS, since all sides of a rhombus are equal and GA is common), giving **a=b, c=d**, and **∠G=∠M**.
- Combining: **a=b=c=d**.

**Applying to a specific rhombus (angle 50° at vertex A):**
In ΔADB: a+a+50°=180° → **a=65°**. So the rhombus angles work out to **50°, 130°, 50°, 130°** (opposite angles equal).

**Alternative method (using parallel sides):** Since a rhombus's diagonal creates equal alternate angles, we can show **GE||AM** and **EM||GA** — proving **every rhombus is also a parallelogram**! This means all parallelogram properties (adjacent angles supplementary, opposite angles equal) apply directly.

### ❓ Q&A
**Q1. In rhombus GAME with diagonal GA drawn, what does "a=d" and "b=c" represent?**
A. They represent the **equal base angles** of the two isosceles triangles (ΔGAE and ΔMAE) formed by the diagonal, since the sides of a rhombus are all equal.

**Q2. Is every rhombus also a parallelogram? Why?**
A. **Yes** — because the diagonal of a rhombus creates equal alternate angles, proving both pairs of opposite sides are parallel, satisfying the parallelogram definition.

**Q3. If one angle of a rhombus is 50°, what are the other three angles?**
A. **130°, 50°, 130°** (opposite angles equal; adjacent angles supplementary, following parallelogram rules).

**Q4 (own). If a rhombus has an angle of 110°, find all four angles.**
A. Opposite angle = **110°**; adjacent angles = 180−110 = **70°** each. So angles are **110°, 70°, 110°, 70°**.

---

## 19. DEDUCTION 10 — DIAGONALS OF A RHOMBUS MEET AT 90°

### 🔑 Result
> **The diagonals of a rhombus intersect each other at an angle of 90°** (perpendicular bisectors of each other).

### 📖 Explanation — Proof via Congruence
```
        E-----------M
        |\         /|
        | \       / |
        |  \     /  |
        |   \   /   |
        |    \ /    |
        |     O     |
        |    / \    |
        G-----------A
   (Rhombus GAME; diagonals GA and EM cross at O)
```
In rhombus GAME, compare ΔGEO and ΔMEO:
- (Using SSS or similar reasoning from the rhombus's equal sides and the fact that diagonals bisect each other, since a rhombus is a parallelogram)
- ΔGEO ≅ ΔMEO
- Therefore ∠GOE = ∠MOE (corresponding angles of congruent triangles)
- Since ∠GOE + ∠MOE = 180° (straight angle) and they're equal, each = **90°**.

### ❓ Q&A
**Q1. At what angle do the diagonals of a rhombus intersect?**
A. **90°** (they are perpendicular to each other).

**Q2. Which two triangles are compared to prove this property?**
A. **ΔGEO and ΔMEO** in rhombus GAME.

**Q3. Do the diagonals of a rhombus bisect each other AND meet at 90°? Compare this to a general parallelogram.**
A. **Yes to both** — a rhombus's diagonals bisect each other (since it's a parallelogram) AND additionally meet at 90° (a property specific to rhombuses, not true for general parallelograms).

**Q4 (own). If a quadrilateral's diagonals are perpendicular AND bisect each other, must it be a rhombus?**
A. **Yes** — this combination is essentially the diagonal-based signature of a rhombus (perpendicular + bisecting diagonals force all four sides to be equal, by the congruent right-triangles formed at the center).

---

## 20. PROPERTIES OF A RHOMBUS (FULL LIST) & VENN DIAGRAM OF ALL QUADRILATERALS

### 🔑 Complete Property List (Rhombus)
| # | Property |
|---|---|
| 1 | **All sides** of a rhombus are **equal** |
| 2 | **Opposite sides** of a rhombus are **parallel** |
| 3 | **Adjacent angles** add up to **180°**; **opposite angles** are **equal** |
| 4 | **Diagonals bisect each other** |
| 5 | **Diagonals bisect the angles** of the rhombus |
| 6 | **Diagonals intersect at 90°** |

### 📖 Master Venn Diagram
```
   ________________________________
  /         Parallelogram           \
  |    __________     __________    |
  |   | Rectangle |   |  Rhombus |   |
  |   |    ____   |   |          |   |
  |   |   |Square| <--+--------->|   |
  |   |   |______|   |           |   |
  |   |___________|   |__________|   |
  \                                 /
   \_______________________________/
```
- **Square = Rectangle ∩ Rhombus** (a square is exactly the overlap — it has BOTH all-90°-angles AND all-equal-sides).
- Every Rectangle and every Rhombus is a Parallelogram.
- Not every Parallelogram is a Rectangle or Rhombus.

### ❓ Q&A
**Q1. List all 6 properties of a rhombus.**
A. **(1)** All sides equal, **(2)** opposite sides parallel, **(3)** adjacent angles supplementary/opposite angles equal, **(4)** diagonals bisect each other, **(5)** diagonals bisect the angles, **(6)** diagonals meet at 90°.

**Q2. Where does a "square" sit in the Venn diagram relative to Rectangle and Rhombus?**
A. A square sits in the **overlapping region** of Rectangle and Rhombus — it's simultaneously a rectangle (all angles 90°) AND a rhombus (all sides equal).

**Q3. Are the diagonals of a rhombus always equal in length (like a rectangle's)?**
A. **Not necessarily** — a rhombus's diagonals are typically of DIFFERENT lengths (unless it's also a square); they bisect each other and meet at 90°, but equal-length diagonals is a rectangle-only requirement.

**Q4 (own). A quadrilateral has all sides equal AND all angles equal. What single shape must it be?**
A. A **square** — since all-sides-equal alone gives a rhombus, and adding all-angles-equal (which must be 90° each, from the 360° sum) upgrades it specifically to a square.

---
