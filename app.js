(function () {
  const pages = {
    home: document.getElementById("page-home"),
    submissions: document.getElementById("page-submissions"),
  };

  const navItems = document.querySelectorAll(".nav__item");

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
    });
  });

  const data = [
  { staff: "Jane Smith", team: "Sales", core: "Excellence", date: "04/22/2024", evidence: 2, status: "Reviewed", score: 9 },
  { staff: "Emily Roberts", team: "Marketing", core: "Synergy", date: "04/22/2024", evidence: 1, status: "Reviewed", score: 9 },
  { staff: "Michael Lee", team: "Data", core: "Innovation", date: "04/21/2024", evidence: 0, status: "Pending", score: 8 },
  { staff: "Sarah Tan", team: "CSI", core: "Integrity", date: "04/20/2024", evidence: 3, status: "Reviewed", score: 10 },
  { staff: "David Thompson", team: "Front-end", core: "Resilience", date: "04/19/2024", evidence: 2, status: "Pending", score: 7 },
  { staff: "Amina Bello", team: "Project management", core: "Synergy", date: "04/18/2024", evidence: 1, status: "Reviewed", score: 8 },
  { staff: "Tunde Adeyemi", team: "Back end", core: "Innovation", date: "04/17/2024", evidence: 2, status: "Pending", score: 5 },
  { staff: "Chinedu Okeke", team: "Sales", core: "Integrity", date: "04/16/2024", evidence: 1, status: "Reviewed", score: 9 },
  { staff: "Kemi Adebayo", team: "Finance", core: "Excellence", date: "04/15/2024", evidence: 0, status: "Pending", score: 6 },
  { staff: "Uche Eze", team: "AI", core: "Resilience", date: "04/14/2024", evidence: 4, status: "Reviewed", score: 9 },
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
    els.sumTopScore.textContent = top?.score ?? "—";
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

    els.tbody.innerHTML = rows.map(r => `
      <tr>
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
        <td>${r.score}</td>
        
      </tr>
    `).join("");

    // disable prev/next appropriately
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    els.prev.disabled = page <= 1;
    els.next.disabled = page >= totalPages;
  }

  function renderPager() {
    if (!els.pager) return;

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    els.pager.innerHTML = "";

    // show up to 5 page pills
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

  // events
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

  // init
  renderSummary();
  renderTable();
  renderPager();
  showPage("home");
})();