<template>
  <div id="container" :style="{ transform: 'rotate(' + rotation + 'deg)' }">
    <div id="hourglass">
      <div class="a"></div>
      <div class="b"></div>
      <div class="c"></div>
      <div class="d"></div>
      <div class="e"></div>
      <div class="f"></div>
      <div class="f"></div>
      <div class="e"></div>
      <div class="d"></div>
      <div class="c"></div>
      <div class="b"></div>
      <div class="a"></div>
    </div>
    <div id="sand">
      <div class="grain g1" :class="{ moveg1: moveg1 }"></div>
      <div class="grain g2" :class="{ moveg2: moveg2 }"></div>
      <div class="grain g3" :class="{ moveg3: moveg3 }"></div>
      <div class="grain g4" :class="{ moveg4: moveg4 }"></div>
      <div class="grain g5" :class="{ moveg5: moveg5 }"></div>
      <div class="grain g6" :class="{ moveg6: moveg6 }"></div>
      <div class="grain g7" :class="{ moveg7: moveg7 }"></div>
      <div class="grain g8" :class="{ moveg8: moveg8 }"></div>
      <div class="grain g9" :class="{ moveg9: moveg9 }"></div>
      <div class="grain g10" :class="{ moveg10: moveg10 }"></div>
      <div class="grain g11" :class="{ hide: hideg11 }"></div>
      <div class="grain g12" :class="{ hide: hideg12 }"></div>
      <div class="grain g13" :class="{ hide: hideg13 }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HourglassAnimation",
  data() {
    return {
      moveg1: false,
      moveg2: false,
      moveg3: false,
      moveg4: false,
      moveg5: false,
      moveg6: false,
      moveg7: false,
      moveg8: false,
      moveg9: false,
      moveg10: false,
      hideg11: false,
      hideg12: true,
      hideg13: false,
      rotation: 0,
      intervalIds: [],
    };
  },
  mounted() {
    this.startAnimation();
  },
  beforeUnmount() {
    // Clear intervals when component is destroyed
    this.intervalIds.forEach((id) => clearInterval(id));
  },
  methods: {
    startAnimation() {
      // Initial setTimeouts for the first cycle
      this.initialCycle();

      // Set up intervals for continuous animation
      const intervalId1 = setInterval(() => {
        this.animationCycle();
      }, 5250);

      const intervalId2 = setInterval(() => {
        this.toggleGrain12();
      }, 350);

      // Store interval IDs to clear later
      this.intervalIds.push(intervalId1, intervalId2);
    },
    initialCycle() {
      const timeouts = [
        { delay: 350, action: () => (this.moveg1 = !this.moveg1) },
        { delay: 700, action: () => (this.moveg3 = !this.moveg3) },
        { delay: 1050, action: () => (this.moveg4 = !this.moveg4) },
        { delay: 1400, action: () => (this.moveg2 = !this.moveg2) },
        { delay: 1750, action: () => (this.moveg6 = !this.moveg6) },
        { delay: 2100, action: () => (this.moveg5 = !this.moveg5) },
        { delay: 2450, action: () => (this.moveg7 = !this.moveg7) },
        { delay: 2800, action: () => (this.moveg9 = !this.moveg9) },
        { delay: 3150, action: () => (this.moveg8 = !this.moveg8) },
        { delay: 3500, action: () => (this.moveg10 = !this.moveg10) },
        { delay: 3850, action: () => (this.rotation += 45) },
        { delay: 4200, action: () => (this.rotation += 45) },
        { delay: 4550, action: () => (this.rotation += 45) },
        { delay: 4900, action: () => (this.rotation += 45) },
        {
          delay: 5250,
          action: () => {
            this.rotation += 180;
            this.toggleAllGrains();
          },
        },
      ];

      timeouts.forEach(({ delay, action }) => {
        setTimeout(action, delay);
      });
    },
    animationCycle() {
      const timeouts = [
        { delay: 350, action: () => (this.moveg1 = !this.moveg1) },
        { delay: 700, action: () => (this.moveg3 = !this.moveg3) },
        { delay: 1050, action: () => (this.moveg4 = !this.moveg4) },
        { delay: 1400, action: () => (this.moveg2 = !this.moveg2) },
        { delay: 1750, action: () => (this.moveg6 = !this.moveg6) },
        { delay: 2100, action: () => (this.moveg5 = !this.moveg5) },
        { delay: 2450, action: () => (this.moveg7 = !this.moveg7) },
        { delay: 2800, action: () => (this.moveg9 = !this.moveg9) },
        { delay: 3150, action: () => (this.moveg8 = !this.moveg8) },
        { delay: 3500, action: () => (this.moveg10 = !this.moveg10) },
        { delay: 3850, action: () => (this.rotation += 45) },
        { delay: 4200, action: () => (this.rotation += 45) },
        { delay: 4550, action: () => (this.rotation += 45) },
        { delay: 4900, action: () => (this.rotation += 45) },
        {
          delay: 5250,
          action: () => {
            this.rotation += 180;
            this.toggleAllGrains();
          },
        },
      ];

      timeouts.forEach(({ delay, action }) => {
        setTimeout(action, delay);
      });
    },
    toggleAllGrains() {
      this.moveg1 = !this.moveg1;
      this.moveg2 = !this.moveg2;
      this.moveg3 = !this.moveg3;
      this.moveg4 = !this.moveg4;
      this.moveg5 = !this.moveg5;
      this.moveg6 = !this.moveg6;
      this.moveg7 = !this.moveg7;
      this.moveg8 = !this.moveg8;
      this.moveg9 = !this.moveg9;
      this.moveg10 = !this.moveg10;
    },
    toggleGrain12() {
      this.hideg12 = !this.hideg12;
      if (this.hideg12) {
        this.hideg11 = false;
        this.hideg13 = false;
      } else {
        this.hideg11 = true;
        this.hideg13 = true;
      }
    },
  },
};
</script>

<style scoped>
#container {
  width: 104px;
  height: 176px;
}

#hourglass {
  width: 104px;
  margin: 0 auto;
}

#sand {
  margin: 0 auto;
  width: 56px;
  height: 120px;
  position: relative;
  top: -144px;
}

.grain {
  height: 8px;
  width: 8px;
  position: absolute;
  transition: all 0.35s linear;
}

.a,
.b,
.c,
.d,
.e,
.f {
  background-color: #ffffff;
  height: 8px;
  margin: 0 auto;
}

.a,
.b,
.c,
.d,
.e,
.f {
  border-right: 16px solid black;
  border-left: 16px solid black;
}

.a {
  width: 72px;
  border-top: 8px solid black;
  border-bottom: 8px solid black;
}

.b {
  width: 72px;
  height: 32px;
  border-right: 8px solid black;
  border-left: 8px solid black;
}

.c {
  width: 56px;
}

.d {
  width: 40px;
}

.e {
  width: 24px;
}

.f {
  width: 8px;
}

.g1 {
  top: 0px;
  left: 0px;
}

.g2 {
  top: 0px;
  left: 16px;
}

.g3 {
  top: 0px;
  left: 32px;
}

.g4 {
  top: 0px;
  left: 48px;
}

.g5 {
  top: 8px;
  left: 8px;
}

.g6 {
  top: 8px;
  left: 24px;
}

.g7 {
  top: 8px;
  left: 40px;
}

.g8 {
  top: 16px;
  left: 16px;
}

.g9 {
  top: 16px;
  left: 32px;
}

.g10 {
  top: 24px;
  left: 24px;
}

.g11 {
  top: 40px;
  left: 24px;
}

.g12 {
  top: 64px;
  left: 24px;
}

.g13 {
  top: 72px;
  left: 24px;
}

.hide {
  display: none;
}

.moveg1 {
  left: 16px !important;
  top: 112px !important;
}

.moveg2 {
  left: 48px !important;
  top: 112px !important;
}

.moveg3 {
  left: 0px !important;
  top: 112px !important;
}

.moveg4 {
  left: 24px !important;
  top: 104px !important;
}

.moveg5 {
  left: 0px !important;
  top: 112px !important;
}

.moveg6 {
  left: 8px !important;
  top: 104px !important;
}

.moveg7 {
  left: 0px !important;
  top: 104px !important;
}

.moveg8 {
  top: 96px !important;
}

.moveg9 {
  top: 96px !important;
}

.moveg10 {
  top: 88px !important;
}

.g1,
.g5 {
  background-color: #ffd700;
}

/* Gold */
.g2,
.g6 {
  background-color: #ffa500;
}

/* Orange */
.g3,
.g7 {
  background-color: #daa520;
}

/* Goldenrod */
.g4,
.g8 {
  background-color: #f4a460;
}

/* Sandy brown */
.g9,
.g11 {
  background-color: #d2691e;
}

/* Chocolate */
.g10,
.g12,
.g13 {
  background-color: #b8860b;
}

/* Dark goldenrod */
</style>
