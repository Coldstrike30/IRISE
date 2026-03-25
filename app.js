(function () {
  const pages = {
    home: document.getElementById("page-home"),
    submissions: document.getElementById("page-submissions"),
  };

  const navItems = document.querySelectorAll(".nav__item");
  const layout = document.querySelector(".layout");
  const menuToggle = document.getElementById("menuToggle");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const mobileBreakpoint = window.matchMedia("(max-width: 860px)");

  function setMenuExpanded(isOpen) {
    if (menuToggle) menuToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function openSidebar() {
    if (!layout || !mobileBreakpoint.matches) return;
    layout.classList.add("sidebar-open");
    setMenuExpanded(true);
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!layout) return;
    layout.classList.remove("sidebar-open");
    setMenuExpanded(false);
    document.body.style.overflow = els?.reviewOverlay?.style.display === "flex" ? "hidden" : "auto";
  }

  function showPage(key) {
    Object.values(pages).forEach(p => p.classList.remove("is-visible"));
    pages[key]?.classList.add("is-visible");

    navItems.forEach(btn => btn.classList.remove("is-active"));
    const activeBtn = document.querySelector(`.nav__item[data-page="${key}"]`);
    if (activeBtn) activeBtn.classList.add("is-active");
  }

  navItems.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.page;
      if (!key || !pages[key]) return;
      showPage(key);
      if (mobileBreakpoint.matches) closeSidebar();
    });
  });

  menuToggle?.addEventListener("click", () => {
    if (layout?.classList.contains("sidebar-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  sidebarBackdrop?.addEventListener("click", closeSidebar);

  mobileBreakpoint.addEventListener("change", (event) => {
    if (!event.matches) {
      if (layout) layout.classList.remove("sidebar-open");
      setMenuExpanded(false);
      document.body.style.overflow = els?.reviewOverlay?.style.display === "flex" ? "hidden" : "auto";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && layout?.classList.contains("sidebar-open")) {
      closeSidebar();
    }
  });

  const data = [
  { staff: "Jane Smith", team: "Sales", core: "Excellence", date: "04/22/2024", evidence: 2, status: "Reviewed", score: 4.0, review: { authenticity: 4, initiative: 4, impact: 3, alignment: 5 } },
  { staff: "Emily Roberts", team: "Marketing", core: "Synergy", date: "04/22/2024", evidence: 1, status: "Reviewed", score: 4.3, review: { authenticity: 4, initiative: 5, impact: 4, alignment: 4 } },
  { staff: "Michael Lee", team: "Data", core: "Innovation", date: "04/21/2024", evidence: 0, status: "Pending", score: 3.6, review: { authenticity: 3, initiative: 4, impact: 3, alignment: 4 } },
  { staff: "Sarah Tan", team: "CSI", core: "Integrity", date: "04/20/2024", evidence: 3, status: "Reviewed", score: 4.8, review: { authenticity: 5, initiative: 5, impact: 4, alignment: 5 } },
  { staff: "David Thompson", team: "Front-end", core: "Resilience", date: "04/19/2024", evidence: 2, status: "Pending", score: 3.4, review: { authenticity: 3, initiative: 3, impact: 4, alignment: 4 } },
  { staff: "Amina Bello", team: "Project management", core: "Synergy", date: "04/18/2024", evidence: 1, status: "Reviewed", score: 4.1, review: { authenticity: 4, initiative: 4, impact: 4, alignment: 4 } },
  { staff: "Tunde Adeyemi", team: "Back end", core: "Innovation", date: "04/17/2024", evidence: 2, status: "Pending", score: 3.2, review: { authenticity: 3, initiative: 3, impact: 3, alignment: 4 } },
  { staff: "Chinedu Okeke", team: "Sales", core: "Integrity", date: "04/16/2024", evidence: 1, status: "Reviewed", score: 4.5, review: { authenticity: 4, initiative: 5, impact: 4, alignment: 5 } },
  { staff: "Kemi Adebayo", team: "Finance", core: "Excellence", date: "04/15/2024", evidence: 0, status: "Pending", score: 3.0, review: { authenticity: 3, initiative: 3, impact: 3, alignment: 3 } },
  { staff: "Uche Eze", team: "AI", core: "Resilience", date: "04/14/2024", evidence: 4, status: "Reviewed", score: 4.4, review: { authenticity: 4, initiative: 4, impact: 5, alignment: 4 } },
];

  const els = {
    tbody: document.getElementById("submissionsTbody"),
    sumTotal: document.getElementById("sumTotal"),
    sumTopName: document.getElementById("sumTopName"),
    sumTopScore: document.getElementById("sumTopScore"),
    pager: document.getElementById("pager"),
    prev: document.getElementById("btnPrev"),
    next: document.getElementById("btnNext"),
    filter: document.getElementById("btnFilter"),
    reset: document.getElementById("btnReset"),
    qSearch: document.getElementById("qSearch"),
    qCore: document.getElementById("qCoreValue"),
    qTeam: document.getElementById("qTeam"),
    qStatus: document.getElementById("qStatus"),
    reviewOverlay: document.getElementById("overseerReviewOverlay"),
    reviewClose: document.getElementById("closeOverseerReview"),
    ovStaff: document.getElementById("ovStaff"),
    ovTeam: document.getElementById("ovTeam"),
    ovCore: document.getElementById("ovCore"),
    ovDate: document.getElementById("ovDate"),
    ovEvidenceOne: document.getElementById("ovEvidenceOne"),
    ovEvidenceTwo: document.getElementById("ovEvidenceTwo"),
    ovComment: document.getElementById("ovComment"),
    ovAuthStars: document.getElementById("ovAuthStars"),
    ovInitStars: document.getElementById("ovInitStars"),
    ovImpactStars: document.getElementById("ovImpactStars"),
    ovAlignStars: document.getElementById("ovAlignStars"),
    ovFinalScore: document.getElementById("ovFinalScore"),
  };

  let filtered = [...data];
  let page = 1;
  const pageSize = 6;

  function badgeClass(status) {
  const s = status.toLowerCase();
  if (s === "pending") return "badge badge--pending";
  if (s === "reviewed") return "badge badge--approved";
  return "badge";
}

  function renderSummary() {
    els.sumTotal.textContent = String(data.length);

    const top = [...data].sort((a, b) => b.score - a.score)[0];
    els.sumTopName.textContent = top?.staff ?? "—";
    els.sumTopScore.textContent = top ? top.score.toFixed(1) : "—";
  }

  function applyFilters() {
    const s = (els.qSearch.value || "").trim().toLowerCase();
    const core = els.qCore.value || "";
    const team = els.qTeam.value || "";
    const status = els.qStatus.value || "";

    filtered = data.filter(r => {
      const matchName = !s || r.staff.toLowerCase().includes(s);
      const matchCore = !core || r.core === core;
      const matchTeam = !team || r.team === team;
      const matchStatus = !status || r.status === status;
      return matchName && matchCore && matchTeam && matchStatus;
    });

    page = 1;
    renderTable();
    renderPager();
  }

  function resetFilters() {
    els.qSearch.value = "";
    els.qCore.value = "";
    els.qTeam.value = "";
    els.qStatus.value = "";
    filtered = [...data];
    page = 1;
    renderTable();
    renderPager();
  }

  function renderTable() {
    if (!els.tbody) return;

    const start = (page - 1) * pageSize;
    const rows = filtered.slice(start, start + pageSize);

    els.tbody.innerHTML = rows.map((r, index) => `
      <tr class="is-clickable" data-row-index="${start + index}">
        <td>
          <div class="cell-user">
            <div class="avatar"><i class="fa-solid fa-user"></i></div>
            <div>${r.staff}</div>
          </div>
        </td>
        <td>${r.team}</td>
        <td>${r.core}</td>
        <td>${r.date}</td>
        <td>${r.evidence} file${r.evidence === 1 ? "" : "s"}</td>
        <td><span class="${badgeClass(r.status)}">${r.status}</span></td>
        <td>${r.score.toFixed(1)}</td>
        
      </tr>
    `).join("");

   
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    els.prev.disabled = page <= 1;
    els.next.disabled = page >= totalPages;

    els.tbody.querySelectorAll("tr.is-clickable").forEach(row => {
      row.addEventListener("click", () => {
        const record = filtered[Number(row.dataset.rowIndex)];
        if (record) openReviewModal(record);
      });
    });
  }


  function renderStaticStars(container, value) {
    if (!container) return;
    container.innerHTML = Array.from({ length: 5 }, (_, index) => {
      const active = index < value ? "active" : "";
      return `<span class="${active}">&#9733;</span>`;
    }).join("");
  }

  function openReviewModal(record) {
    if (!els.reviewOverlay) return;

    els.ovStaff.textContent = record.staff;
    els.ovTeam.textContent = record.team;
    els.ovCore.textContent = record.core;
    els.ovDate.textContent = record.date;
    els.ovEvidenceOne.textContent = `Evidence_${record.staff.replace(/\s+/g, "_")}_1.pdf`;
    els.ovEvidenceTwo.textContent = record.evidence > 1 ? `Evidence_${record.staff.replace(/\s+/g, "_")}_2.png` : "Manager-note-placeholder.txt";
    els.ovComment.textContent = "Strong ownership shown throughout the submission. The manager review highlighted clear initiative, useful documentation, and visible team impact.";

    const review = record.review || { authenticity: 4, initiative: 4, impact: 3, alignment: 5 };
    renderStaticStars(els.ovAuthStars, review.authenticity);
    renderStaticStars(els.ovInitStars, review.initiative);
    renderStaticStars(els.ovImpactStars, review.impact);
    renderStaticStars(els.ovAlignStars, review.alignment);

    const average = ((review.authenticity + review.initiative + review.impact + review.alignment) / 4).toFixed(1);
    els.ovFinalScore.textContent = `${average} / 5.0`;

    els.reviewOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeReviewModal() {
    if (!els.reviewOverlay) return;
    els.reviewOverlay.style.display = "none";
    if (layout?.classList.contains("sidebar-open") && mobileBreakpoint.matches) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  function renderPager() {
    if (!els.pager) return;

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    els.pager.innerHTML = "";

    
    const maxPills = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxPills - 1);
    start = Math.max(1, end - maxPills + 1);

    for (let p = start; p <= end; p++) {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "page-pill" + (p === page ? " is-current" : "");
      pill.textContent = String(p);
      pill.addEventListener("click", () => {
        page = p;
        renderTable();
        renderPager();
      });
      els.pager.appendChild(pill);
    }
  }

 
  els.filter?.addEventListener("click", applyFilters);
  els.reset?.addEventListener("click", resetFilters);
  els.prev?.addEventListener("click", () => {
    page = Math.max(1, page - 1);
    renderTable();
    renderPager();
  });
  els.next?.addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    page = Math.min(totalPages, page + 1);
    renderTable();
    renderPager();
  });

  els.reviewClose?.addEventListener("click", closeReviewModal);
  els.reviewOverlay?.addEventListener("click", (event) => {
    if (event.target === els.reviewOverlay) closeReviewModal();
  });

 
  renderSummary();
  renderTable();
  renderPager();
  showPage("home");
})();