# Quadrilaterals — Kite, Trapezium & Practice

### (Continued — Grade content, Part 3)

---

## 21. PLAYING WITH QUADRILATERALS — GEOBOARD & JOINING TRIANGLES

### 🔑 Activity 1: Geoboard (Perpendicular Equal Diagonals)

Placing two rubber bands **perpendicular** to each other, of **equal length**, as diagonals, and joining their endpoints gives a **square** (equal + perpendicular + bisecting diagonals = square, per Deduction 5).

If one diagonal is then **extended by 2 cm on both sides** (making it longer than the other, but they still cross at the same point, still perpendicular, but no longer bisecting each other equally... or if extended symmetrically, still bisecting but now unequal length): the resulting quadrilateral becomes a **rhombus** (since the diagonals remain perpendicular and — if extended equally on both sides from the center — still bisect each other, but are now unequal lengths, giving all 4 sides equal but not all angles 90°).

### 🔑 Activity 2: Joining Triangles

**(a) Two equilateral triangles (all sides equal, all angles 60°):**
Joining two equilateral triangles of side 8 cm along a shared side gives a **rhombus** (all 4 sides = 8cm, but angles are 60° and 120°, not 90°).

```
        /\        /\        A_________B
       /  \      /  \       /\       /
      / 60°\    /60° \     /  \     /
     /______\  /______\   /____\   /
                          D    (rhombus with 60°/120° angles)
```

**(b) Two isosceles triangles (8cm, 8cm, 6cm):**
Depending on HOW they're joined (along the 8cm side or along the 6cm side), different quadrilaterals result:

- Joining along the **6cm side**: gives a **rhombus**-like shape if all 4 outer sides are 8cm (kite-shape depending on orientation).
- Joining along an **8cm side**: gives a **kite** (two pairs of adjacent equal sides: 8,8 and 6,6 arranged appropriately) — since the resulting quadrilateral has AB=BC and CD=DA type equal adjacent pairs, not all 4 sides equal.

**(c) Two scalene triangles (6cm, 9cm, 12cm):**
Various joinings can produce **parallelograms** (if joined so opposite sides match up as pairs) or **kites**/**general quadrilaterals**, depending on which sides are joined together.

### ❓ Q&A

**Q1. What quadrilateral results from joining 2 equal perpendicular diagonals that bisect each other, on a geoboard?**
A. A **square**.

**Q2. What quadrilateral results from joining two equilateral triangles of the same side length along a shared side?**
A. A **rhombus** (all 4 sides equal, but angles are 60° and 120°).

**Q3. When joining two isosceles triangles (8,8,6), what determines whether you get a rhombus-type shape or a kite?**
A. It depends on **which side is used as the shared/joining side** — joining along different sides changes which pairs of sides end up adjacent versus opposite in the final quadrilateral.

**Q4 (own). If you join two congruent right-angled triangles along their hypotenuse, what quadrilateral do you typically get?**
A. Depending on the specific triangle and orientation, you typically get a **rectangle** (if the two legs match up as opposite sides) or a more general parallelogram/kite, depending on the joining orientation.

---

## 22. KITE — DEFINITION & PROPERTIES

### 🔑 Definition

**Kite:** A quadrilateral that can be labelled ABCD such that **AB=BC** and **CD=DA** (two DISTINCT pairs of adjacent equal sides).

### 📖 Explanation — Visual Structure

```
            B
           / \
          /   \
         A     C
          \   /  \
           \ /    \
            O      \
             \      \
              \      D  -- wait, let's redo cleanly:

         B
        / \
       /   \
      A     C
       \   /
        \ /
         D
   (AB=BC, and CD=DA - kite shape, symmetric along diagonal BD)
```

- The **diagonal BD** is the axis of symmetry.
- **Property 1:** The diagonal BD:
  (i) **Bisects** ∠ABC and ∠ADC (the angles between the unequal-length side pairs)
  (ii) **Bisects diagonal AC** (i.e., AO=OC) and is **perpendicular** to it.

**Proof hint:** Show ΔAOB ≅ ΔCOB (using AB=BC, BO common, and the fact that BD bisects ∠ABC, giving ∠ABO=∠CBO) — this gives AO=OC and the right angle at O.

### ❓ Q&A

**Q1. Define a kite in terms of its side lengths.**
A. A quadrilateral ABCD where **AB=BC** and **CD=DA** — two separate pairs of adjacent (not opposite) equal sides.

**Q2. What does diagonal BD do in a kite (2 things)?**
A. It **(i)** bisects angles ∠ABC and ∠ADC, and **(ii)** bisects diagonal AC (crossing it at its midpoint) while being **perpendicular** to AC.

**Q3. Which triangles would you compare to prove diagonal BD bisects AC and is perpendicular to it?**
A. **ΔAOB and ΔCOB** (where O is the intersection of the diagonals).

**Q4 (own). Is every rhombus a kite? Explain using the definitions.**
A. **Yes** — a rhombus has all 4 sides equal, which trivially satisfies AB=BC and CD=DA (the kite condition), so every rhombus is technically a special kite. However, **not every kite is a rhombus** (a kite only needs 2 pairs of adjacent equal sides, not all 4 sides equal).

**Q5 (own). Are the diagonals of a general kite equal in length?**
A. **Not necessarily** — unlike a rectangle, a kite's two diagonals are typically of **different lengths** (only one diagonal, BD, is the axis of symmetry and gets bisected perpendicularly by the other).

---

## 23. TRAPEZIUM & ISOSCELES TRAPEZIUM — DEFINITION & PROPERTIES

### 🔑 Definition

**Trapezium:** A quadrilateral with **at least one pair of parallel opposite sides**.

**Isosceles Trapezium:** A trapezium in which the **non-parallel sides (legs) have equal length**.

### 📖 Explanation — General Trapezium

```
        P-----------Q
       /             \
      /               \
     S-----------------R
   (PQ || SR, but PS and QR are NOT necessarily equal)
```

**Property 1:** Since PQ||SR (with PS and QR as transversals): **∠S+∠P=180°** and **∠R+∠Q=180°** (co-interior angles).

### 📖 Explanation — Isosceles Trapezium

```
        X-----------W
       /             \
      /               \
     U-----------------V
   (UV || XW, and UX = VW - equal legs)
```

**Construction:** Draw UV||XW, and mark X,W such that **UX=VW** (equal non-parallel sides).

**Proof that ∠U=∠V (Property 2):**

- Draw perpendiculars XY and WZ from X and W down to line UV.
- Since XW||UV: a=90° and b=90° (co-interior angles with the perpendiculars), so **XWZY is a rectangle**.
- Then ΔUXY ≅ ΔVWZ (using UX=VW, right angles at Y,Z, and XY=WZ since XWZY is a rectangle).
- Therefore **∠U = ∠V**.

**Property 2:** In an isosceles trapezium, the **angles opposite the equal (non-parallel) sides are equal**.

### ❓ Q&A

**Q1. Define a trapezium.**
A. A quadrilateral with **at least one pair of parallel opposite sides**.

**Q2. Define an isosceles trapezium.**
A. A trapezium whose **non-parallel sides (legs) are of equal length**.

**Q3. In a general trapezium PQRS (PQ||SR), what is the relationship between ∠S and ∠P?**
A. **∠S + ∠P = 180°** (co-interior angles, since PS is a transversal to the parallel sides PQ and SR).

**Q4. What auxiliary construction is used to prove Property 2 (angles opposite equal sides are equal) in an isosceles trapezium?**
A. Drawing **perpendiculars from the two "upper" vertices down to the base**, forming a rectangle (XWZY) and two congruent right triangles (ΔUXY≅ΔVWZ).

**Q5 (own). If a trapezium has angles P=110° and Q=70°, and PQ||SR, find angles S and R.**
A. ∠S = 180−∠P = 180−110 = **70°**. ∠R = 180−∠Q = 180−70 = **110°**.

**Q6 (own). Is a parallelogram considered a special type of trapezium?**
A. **Yes, by the standard "at least one pair" definition** — since a parallelogram has BOTH pairs of opposite sides parallel, it technically satisfies "at least one pair," making it a special (broader) case of a trapezium under this inclusive definition.

---

## 24. FIGURE IT OUT — ALL SOLVED QUESTIONS

### Section 4.1 (Rectangles & Squares) — Page 94

**Q1. Find all the other angles inside the following rectangles.**

_(i) Rectangle ABCD with diagonal angle 30° marked at A/B region:_
A. ∠ABD=30°, ∠CAD=60°, ∠ADB=60°, ∠BDC=30°, ∠ACD=30°, ∠ACB=60°

_(ii) Rectangle PQRS with diagonal intersection angle 110°:_
A. ∠POS=110°, ∠QOP=70°, ∠ROS=70°, ∠OQR=35°, ∠ORQ=35°, ∠OQP=55°, ∠OPQ=55°, ∠ORS=55°, ∠OSR=55°

**Q2. Draw a quadrilateral whose diagonals have equal lengths of 8 cm that bisect each other, and intersect at an angle of (i) 30° (ii) 40° (iii) 90° (iv) 140°.**
A. **Method:** Draw line segment AB=8cm. Mark midpoint O. At O, draw the given angle (30°/40°/90°/140°) to a second line. Mark points 4cm from O along this new line (both directions) as C and D. Join A-D, D-B, B-C, C-A. This gives the required rectangle (which becomes a square specifically at 90°). All four angle cases produce valid rectangles, per Deduction 3's general proof.

**Q3. Consider a circle with centre O. Line segments PL and AM are two perpendicular diameters of the circle. What is figure APML?**
A. **APML is a square.** (Since PL and AM are diameters, they're equal in length (both = 2×radius) and bisect each other at O (the center); since they're also perpendicular, by Deduction 5's logic, APML satisfies all conditions for a square.)

**Q4. How do we make an exact 90° using two sticks of equal length and a thread (no paper)?**
A. Let AB and CD be the two equal sticks. Overlap them so their **midpoints coincide** at point O. Use the thread to connect the four endpoints (A to C to B to D back to A). Since ACBD has diagonals (the sticks) that are **equal and bisect each other**, by the rectangle's diagonal-based definition, **ACBD is a rectangle**, so ∠C=90° (or any resulting corner angle is 90°).

**Q5. Is "opposite sides parallel" (alone) a valid definition of a rectangle? Is every quadrilateral with parallel AND equal opposite sides a rectangle?**
A. **No**, this cannot be used as a sole definition of a rectangle. A quadrilateral with opposite sides parallel and equal is actually the definition of a **parallelogram** — this doesn't guarantee 90° angles (e.g., a "slanted" parallelogram has parallel+equal opposite sides but is NOT a rectangle).

---

### Section 4.3 (Parallelograms) — Page 102

**Q1. Find the remaining angles in the following quadrilaterals.**

_(i) Parallelogram with ∠P=40°:_
A. ∠E=140°, ∠R=∠E=140°(wait, checking structure)... **∠A=∠P=40°** (opposite angles equal), and adjacent **∠E=∠R=140°** (supplementary to 40°).

_(ii) Parallelogram with one angle=110°:_
A. **∠Q=70°, ∠S=70°, ∠R=110°** (opposite angles equal to 110° and adjacent angles=70°, supplementary).

_(iii) Rhombus-type figure with angle 30°:_
A. ∠XVU=∠XVW=30°, ∠WXU=∠UVW=60°, so ∠UXV=∠WXV=30°. ∠U=180−60=**120°**, ∠W=∠U=**120°**.

_(iv) Parallelogram with angle 20°:_
A. **∠OEI=20°, ∠AOE=20°, ∠EOI=20°, ∠A=140°, ∠I=140°**

**Q2. Using the diagonal properties, construct a parallelogram whose diagonals are 7cm and 5cm, intersecting at 140°.**
A. **Method:** Draw AB=7cm. Mark midpoint O. At O, draw a 140° angle to a new line. Mark points 2.5cm from O on both sides along this line (since the second diagonal is 5cm, half is 2.5cm) as C and D. Join A-C, C-B, B-D, D-A to complete the parallelogram (note: only bisecting — NOT necessarily equal — so this is a general parallelogram since 7≠5).

**Q3. Using the diagonal properties, construct a rhombus whose diagonals are 4cm and 5cm.**
A. **Method:** Draw AB=5cm. Mark midpoint O. At O, draw a **perpendicular (90°)** line (since rhombus diagonals meet at 90°). Mark points 2cm from O on both sides along this perpendicular (since the second diagonal is 4cm, half is 2cm) as C and D. Join A-D, D-B, B-C, C-A to complete the rhombus.

---

### Section 4.6 (Kite & Trapezium) — Page 107

**Q1. Find all sides and angles of the quadrilateral obtained by joining two equilateral triangles with sides 4cm.**
A. The resulting quadrilateral (a **rhombus**) has all **4 sides = 4cm**, and angles of **60°, 120°, 60°, 120°** (since two 60° angles combine at the shared vertices, and the equilateral triangle's other angles remain 60° at the outer vertices).

**Q2. Construct a kite whose diagonals are 6cm and 8cm.**
A. **Method:** Draw diagonal PQ=6cm. Draw its **perpendicular bisector** (since kite diagonals are perpendicular, with one bisecting the other). Let it intersect PQ at T. Along the perpendicular bisector, mark points R and S such that RS=8cm (this diagonal does NOT need to be bisected by PQ, only PQ needs to be bisected/perpendicular to RS — matching kite Property 1). Join P-R, R-Q, Q-S, S-P to complete the kite.

**Q3. Find the remaining angles in the following trapeziums.**

_(i) Trapezium PQRS with angles 100° and 135° given, PQ||RS:_
A. **∠R=75°** (co-interior with the 105°-adjacent angle, using 180−105=75), **∠S=45°** (co-interior with 135°, using 180−135=45).

_(ii) Isosceles trapezium ABCD with AD=BC and ∠A=80° given:_
A. Since AD=BC (isosceles trapezium), **∠B=∠A=80°** (angles opposite equal sides are equal, Property 2).

**Q4. Draw a Venn diagram showing parallelograms, kites, rhombuses, rectangles, and squares. Answer sub-questions:**
A. _(See Section 20's master Venn diagram, with Kite added as a separate/overlapping category intersecting Rhombus at the Square/Rhombus region.)_

(i) **What quadrilateral is both a kite and a parallelogram?**
A. **A rhombus (or specifically, a square)** — since these are the only kites where ALL sides are equal (making opposite sides equal AND parallel, satisfying the parallelogram condition too).

(ii) **Can there be a quadrilateral that is both a kite and a rectangle?**
A. **No** (generally) — a kite has two DISTINCT pairs of adjacent equal sides (unless it's a square, in which case all 4 sides are equal, making it simultaneously a kite AND a rectangle — but a "proper" kite with genuinely different adjacent pairs cannot also be a rectangle unless it degenerates into a square).

(iii) **Is every kite a rhombus? If not, what is the correct relationship?**
A. **No, not every kite is a rhombus.** The correct relationship: **every rhombus IS a kite** (since equal sides trivially satisfy the kite's adjacent-equal-pairs condition), **but a kite need not be a rhombus** (a kite only requires 2 pairs of adjacent equal sides, not all 4 equal).

**Q5. If PAIR and RODS are two rectangles, find ∠IOD** (given specific angle 30° and side lengths in the figure).
A. **∠IOD = 30°**

**Q6. Construct a square with diagonal 6cm without using a protractor.**
A. **Method:** Draw AB=6cm. Using a **compass**, construct the **perpendicular bisector** of AB (this avoids needing a protractor for the 90° angle). Let this perpendicular meet AB at midpoint O. Mark points C and D on this perpendicular, each 3cm from O (half of the OTHER equal diagonal, also 6cm). Join A-C, C-B, B-D, D-A to complete the square.

**Q7. CASE is a square; U,V,W,X are midpoints of its sides. What type of quadrilateral is UVWX?**
A. **UVWX is also a square.** _(Proof: Let the side of CASE be x, so half-side = x/2. In right triangle CUV, using the Pythagorean theorem, UV²=(x/2)²+(x/2)²=x²/2, so UV=x/√2. By symmetry, all four sides UV, VW, WX, XU are equal to x/√2. Additionally, since ∠C=90° and CU=CV (both x/2), triangle CUV is isosceles right-angled, giving ∠1=∠2=45°; since ∠1+∠3+∠5=180° (linear pair) and by symmetry ∠3=45° too, we get ∠5=90°. Similarly all four angles of UVWX are 90°. Since UVWX has all sides equal AND all angles 90°, it is a square.)_

**Q8. If a quadrilateral has four equal sides and one angle of 90°, will it be a square?**
A. **Yes.** A quadrilateral with 4 equal sides is a rhombus. In a rhombus, opposite angles are equal and adjacent angles are supplementary. If one angle is 90°, its adjacent angle = 180−90=90°, and its opposite angle = 90° too. This forces **all four angles to be 90°**, making it a square (equal sides + all 90° angles).

**Q9. What type of quadrilateral has opposite sides equal? Justify using congruent triangles.**
A. **A parallelogram.** _(Proof: Draw diagonal AC in quadrilateral ABCD where AB=CD and BC=AD. In ΔABC and ΔCDA: AB=CD, BC=AD, and AC=AC (common side). By SSS congruence, ΔABC≅ΔCDA. This gives ∠1=∠4 and ∠2=∠3 (corresponding angles). Since ∠1 and ∠4 are alternate angles for lines AB and CD (with transversal AC), AB||CD. Similarly, ∠3 and ∠2 being alternate angles for BC and AD means BC||AD. Since both pairs of opposite sides are parallel, ABCD is a parallelogram.)_

**Q10. Will the sum of angles in a "dart" or concave quadrilateral (like the arrowhead example) also be 360°?**
A. **Yes.** _(Proof: Join diagonal BD, splitting the concave quadrilateral ADCB into ΔADB and ΔBDC. Sum of angles of ΔADB=180°, sum of angles of ΔBDC=180°. Adding these gives the total angle sum of the quadrilateral = 360°, matching the general angle-sum property proven in Section 11, even for non-convex shapes.)_

**Q11. State whether True or False, with justification:**

(i) **A quadrilateral whose diagonals are equal AND bisect each other must be a square.**
A. **False.** This describes a **rectangle** (the diagonal-based definition), not necessarily a square — a square ADDITIONALLY requires the diagonals to be perpendicular.

(ii) **A quadrilateral having three right angles must be a rectangle.**
A. **True.** Since the angle sum is always 360°, and 90+90+90=270°, the fourth angle is forced to be 360−270=**90°** as well — making all 4 angles 90°, which is the definition of a rectangle.

(iii) **A quadrilateral whose diagonals bisect each other must be a parallelogram.**
A. **True.** (As proven in Q9's logic and Deduction 8's converse — bisecting diagonals is sufficient to guarantee a parallelogram.)

(iv) **A quadrilateral whose diagonals are perpendicular to each other must be a rhombus.**
A. **False.** It could also be a **kite** — a kite has perpendicular diagonals but does NOT necessarily have all 4 sides equal (only two pairs of adjacent equal sides), so perpendicularity alone doesn't guarantee a rhombus.

(v) **A quadrilateral in which opposite angles are equal must be a parallelogram.**
A. **True.**

(vi) **A quadrilateral in which all angles are equal is a rectangle.**
A. **True.** (If all 4 angles are equal, and they sum to 360°, each must be 360/4=90°, satisfying the rectangle definition.)

(vii) **Isosceles trapeziums are parallelograms.**
A. **False.** The other pair of opposite sides (the two parallel sides themselves) are generally of DIFFERENT lengths in a trapezium (that's what distinguishes it from a parallelogram) — only the non-parallel legs are equal in an isosceles trapezium, not both pairs of opposite sides.

---

## 25. CHAPTER SUMMARY

| Quadrilateral           | Definition                                                | Key Properties                                                                                          |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Rectangle**           | All angles = 90°                                          | Opposite sides equal & parallel; diagonals equal & bisect each other                                    |
| **Square**              | All angles = 90° AND all sides equal                      | All rectangle properties + diagonals bisect each other at 90° + diagonals bisect the angles             |
| **Parallelogram**       | Opposite sides parallel                                   | Opposite sides equal; adjacent angles supplementary, opposite angles equal; diagonals bisect each other |
| **Rhombus**             | All sides equal                                           | All parallelogram properties + diagonals bisect each other at 90° + diagonals bisect the angles         |
| **Kite**                | Two distinct pairs of adjacent equal sides (AB=BC, CD=DA) | One diagonal bisects the angles it passes through AND perpendicularly bisects the other diagonal        |
| **Trapezium**           | At least one pair of parallel opposite sides              | Co-interior angles on the same leg sum to 180°                                                          |
| **Isosceles Trapezium** | Trapezium with equal non-parallel sides (legs)            | Angles opposite the equal legs are equal                                                                |

### 🔑 Universal Rule

> **The sum of all interior angles in ANY quadrilateral (convex or concave) is always 360°.**

### 🔑 Master Hierarchy (Set Relationships)

```
Trapezium ⊃ Parallelogram ⊃ Rectangle ⊃ Square
                          ⊃ Rhombus  ⊃ Square
Kite ⊃ Rhombus (rhombus is a special kite)
```

---

## 26. EXTRA PRACTICE QUESTIONS (SELF-MADE)

### Rectangles & Squares

1. The diagonals of a rectangle intersect at an angle of 50°. Find all four angles formed at the intersection point, and find the base angles of the isosceles triangles formed.
2. A quadrilateral has diagonals of length 10cm and 12cm. Can it be a rectangle? Explain why or why not.
3. Construct a square with a given side length of 5cm (not diagonal) using only compass and ruler; describe your steps.
4. If a rectangle's diagonal makes a 35° angle with one of its sides, find all the angles of the triangle formed by that diagonal and the two sides it connects.

### Angle Sum & General Quadrilaterals

5. Three angles of a quadrilateral are 65°, 92°, and 108°. Find the fourth angle.
6. Can a quadrilateral have angles in the ratio 1:2:3:4? If so, find each angle.
7. Explain, using the diagonal-splitting method, why a pentagon's (5-sided figure) angle sum is 540°, extending the logic used for quadrilaterals.

### Parallelograms

8. In a parallelogram, one angle exceeds another (adjacent) angle by 30°. Find all four angles.
9. A parallelogram has sides 6cm and 9cm. What can you conclude about its perimeter? Can you determine its angles from this information alone?
10. If the diagonals of a quadrilateral bisect each other, prove (using congruent triangles) that it must be a parallelogram, mirroring the logic in Figure It Out Q9.

### Rhombus

11. A rhombus has a side length of 7cm and one angle of 130°. Find the length of each diagonal in terms of trigonometric reasoning (conceptual, no calculation needed) — describe which triangle you'd use.
12. If both diagonals of a rhombus are equal in length, what additional shape must it become? Justify using properties learned.
13. Construct a rhombus with side 5cm and one angle 60°, and identify what additional special quadrilateral this specific rhombus resembles (hint: connects to two equilateral triangles).

### Kite & Trapezium

14. A kite has diagonals of 10cm and 6cm, with the 10cm diagonal being the axis of symmetry. Find the two triangles formed and state which sides/angles are equal.
15. An isosceles trapezium has legs of 5cm each and parallel sides of 8cm and 14cm. If one base angle is 65°, find the other three angles.
16. Is a kite always convex, or can it be non-convex (like a dart shape)? Explain what changes if a kite becomes non-convex.

### Mixed/Applied

17. Classify a quadrilateral that has: all sides equal, but only one pair of angles equal (not all four angles equal). What shape is this, and is this description internally consistent?
18. A quadrilateral ABCD has ∠A=∠C and ∠B=∠D, but its diagonals are NOT equal. Is this quadrilateral necessarily a parallelogram? Justify.
19. Design a real-world scenario (like the Carpenter's Problem) where you'd need to verify a shape is a rhombus using only diagonal measurements (no protractor). Describe the steps.
20. True or False, with justification: "A quadrilateral with one pair of parallel sides and one pair of equal sides must be an isosceles trapezium." (Hint: consider if the equal sides could be the parallel pair instead of the legs.)

---

_End of Notes — Ready for question-paper preparation, topic-wise._
