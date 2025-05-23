import { onMounted } from "vue";
import confetti from "canvas-confetti";

export default function useConfetti() {
  onMounted(() => {
    confetti.create(document.getElementById("canvas"), {
      resize: true,
      useWorker: true,
    })({ particleCount: 500, spread: 200 });
  });
}
