const entries = document.querySelectorAll(".entry");
const progressLine = document.getElementById("timeline-progress");
const timeline = document.querySelector(".timeline");

  function updateOnScroll() {
    const scrollTop = window.scrollY;
    const viewportH = window.innerHeight;
    const tlRect = timeline.getBoundingClientRect();
    const tlTop = scrollTop + tlRect.top;
    const tlHeight = tlRect.height;

        // Высота прогресс-бара
        const midScreen = scrollTop + viewportH / 2;
        console.log(midScreen)
        let progress = (midScreen - tlTop) / tlHeight;
        progress = Math.max(0, Math.min(1, progress));
        if(midScreen <= 472.5) {
            progressLine.style.height = 0 + "%";
        } else {
            progressLine.style.height = progress * 100 + "%";
        }
        

        entries.forEach((entry) => {
          const rect = entry.getBoundingClientRect();
          // появление
          if (rect.top < viewportH) {
            entry.classList.add("visible");
            entry.querySelector(".content").style.display = "block";
          }
          // закраска кнопки, если прогресс выше кнопки
          const btn = entry.querySelector(".btn");
          const btnY = scrollTop + rect.top + btn.offsetTop;
          const progressH =
            (parseFloat(progressLine.style.height) / 100) * tlHeight + tlTop;
          if (progressH >= btnY) btn.classList.add("passed");
          else btn.classList.remove("passed");
        });
      }

      // toggle вручную контент
      entries.forEach((entry) => {
        const btn = entry.querySelector(".btn");
        const content = entry.querySelector(".content");
        btn.addEventListener("click", () => {
          if (content.style.display === "none") {
            content.style.display = "block";
          } else {
            content.style.display = "none";
          }
        });
      });

      // Анимация появления картинок при загрузке
      document.querySelectorAll(".content img").forEach((img) => {
        if (img.complete) {
          img.classList.add("loaded");
        } else {
          img.addEventListener("load", () => {
            img.classList.add("loaded");
          });
        }
      });

export default updateOnScroll;