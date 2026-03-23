 document.addEventListener("DOMContentLoaded", function () {
        const sidebar = document.getElementById("managerSidebar");
        const sidebarToggle = document.getElementById("managerSidebarToggle");
        const sidebarOverlay = document.getElementById("managerSidebarOverlay");

        function openSidebar() {
          sidebar.classList.add("active");
          sidebarOverlay.classList.add("active");
        }

        function closeSidebar() {
          sidebar.classList.remove("active");
          sidebarOverlay.classList.remove("active");
        }

        sidebarToggle.addEventListener("click", openSidebar);
        sidebarOverlay.addEventListener("click", closeSidebar);

        const filterBtn = document.getElementById("filterBtn");
        const filterPopover = document.getElementById("managerFilterPopover");
        const filterClose = document.getElementById("managerFilterClose");
        const filterReset = document.getElementById("managerFilterReset");
        const filterApply = document.getElementById("managerFilterApply");
        const filterFields = filterPopover.querySelectorAll("select");

        function toggleFilterPopover() {
          filterPopover.classList.toggle("active");
        }

        function closeFilterPopover() {
          filterPopover.classList.remove("active");
        }

        filterBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          toggleFilterPopover();
        });

        filterClose.addEventListener("click", closeFilterPopover);
        filterApply.addEventListener("click", closeFilterPopover);
        filterReset.addEventListener("click", function () {
          filterFields.forEach(field => field.value = "");
          closeFilterPopover();
        });

        document.addEventListener("click", function (e) {
          if (!filterPopover.contains(e.target) && !filterBtn.contains(e.target)) {
            closeFilterPopover();
          }
        });

        const reviewBtns = document.querySelectorAll(".reviewBtn");
        const overlay = document.getElementById("reviewOverlay");
        const closeBtn = document.getElementById("closeReview");
        const cancelBtn = document.getElementById("cancelReview");
        const finalScoreValue = document.getElementById("finalScoreValue");
        const criterionScores = {
          authenticity: 0,
          initiative: 0,
          impact: 0,
          alignment: 0
        };

        reviewBtns.forEach(btn => {
          btn.addEventListener("click", () => {
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden";
          });
        });

        function closePanel() {
          overlay.style.display = "none";
          document.body.style.overflow = "auto";
        }

        closeBtn.addEventListener("click", closePanel);
        cancelBtn.addEventListener("click", closePanel);

        overlay.addEventListener("click", function(e){
          if(e.target === overlay) closePanel();
        });

        function updateFinalScore() {
          const values = Object.values(criterionScores);
          const total = values.reduce((sum, value) => sum + value, 0);
          const average = total / values.length;
          finalScoreValue.textContent = average.toFixed(1) + " / 5.0";
        }

        document.querySelectorAll(".rubric-row").forEach(row => {
          const criterion = row.dataset.criterion;
          const stars = row.querySelectorAll(".rating-stars button");

          stars.forEach(star => {
            star.addEventListener("click", function () {
              const value = Number(this.dataset.value);
              criterionScores[criterion] = value;

              stars.forEach((button, index) => {
                button.classList.toggle("active", index < value);
              });

              updateFinalScore();
            });
          });
        });

        updateFinalScore();
      });