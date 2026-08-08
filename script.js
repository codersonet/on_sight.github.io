/**
 * NIT SIKKIM // STUDENT NEXUS
 * Shared Interactive Logic & Dynamic Canvas Background
 */

// Global Club Projects Dataset
const clubProjects = [
  {
    id: 1,
    title: "SYNAPSE_AUTONOMOUS_ROVER",
    club: "ROBOTICS SOCIETY",
    category: "robotics",
    description: "Alpine high-altitude terrain mapping rover equipped with LiDAR and real-time obstacle avoidance algorithms.",
    progress: 88,
    stack: "ROS2, C++, Python, OpenCV",
    status: "TESTING_IN_FIELD"
  },
  {
    id: 2,
    title: "NEURAL_CAMPUS_OS",
    club: "WEBDEV & CODING CLUB",
    category: "tech",
    description: "Centralized student query, attendance automation, and course material exchange system built for NIT Sikkim.",
    progress: 94,
    stack: "Next.js, Node.js, PostgreSQL",
    status: "DEPLOYED"
  },
  {
    id: 3,
    title: "ALPINE_ENERGY_HARVESTER",
    club: "GREEN TECH CLUB",
    category: "robotics",
    description: "Low-temperature piezoelectric kinetic energy generators tailored for mountain micro-grids.",
    progress: 62,
    stack: "Embedded C, MATLAB, IoT",
    status: "PROTOTYPING"
  },
  {
    id: 4,
    title: "KANCHENJUNGA_VR_ARCHIVE",
    club: "DESIGN & MEDIA CELL",
    category: "creative",
    description: "Photogrammetry and spatial computing reconstruction of Sikkim's cultural heritage and mountain geology.",
    progress: 75,
    stack: "Three.js, WebGL, Blender",
    status: "IN_DEVELOPMENT"
  },
  {
    id: 5,
    title: "QUANTUM_FINTECH_NODE",
    club: "E-CELL NIT SIKKIM",
    category: "tech",
    description: "Decentralized micro-finance platform tailored for rural Himalayan entrepreneurs and artisanal markets.",
    progress: 45,
    stack: "Solidity, Web3.js, React",
    status: "ALPHA_STAGE"
  },
  {
    id: 6,
    title: "AERO_SIKKIM_DRONE_NET",
    club: "AERO-MODELLING CLUB",
    category: "robotics",
    description: "Autonomous essential medical cargo delivery drone designed for turbulent mountain wind corridors.",
    progress: 80,
    stack: "PX4 Autopilot, MAVLink, PX4",
    status: "FLIGHT_TRIALS"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initMountainCanvas();
  highlightActiveNavLink();
  
  if (document.getElementById("projects-container")) {
    renderProjects(clubProjects);
    initFilters();
  }
  
  if (document.querySelectorAll(".count-up").length > 0) {
    initStatsCounter();
  }
  
  initModal();
});

/* Highlight current active page link */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");
  
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/* Interactive Dynamic Vector Mountain Canvas */
function initMountainCanvas() {
  const canvas = document.getElementById("mountain-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  let offset = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;

    const layers = [
      { amplitude: 80, frequency: 0.003, speed: 0.002, heightOffset: height * 0.7 },
      { amplitude: 120, frequency: 0.002, speed: 0.001, heightOffset: height * 0.75 },
      { amplitude: 160, frequency: 0.001, speed: 0.0005, heightOffset: height * 0.85 }
    ];

    layers.forEach((layer) => {
      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const y = layer.heightOffset + Math.sin(x * layer.frequency + offset * layer.speed) * layer.amplitude
                  + Math.cos(x * 0.005) * 20;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });

    offset += 1;
    requestAnimationFrame(draw);
  }

  draw();
}

/* Render Projects Cards */
function renderProjects(projects) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach((item) => {
    const card = document.createElement("div");
    card.className = "glass-card project-card";
    card.innerHTML = `
      <div>
        <div class="card-header">
          <span class="label-mono text-muted">// ${item.club}</span>
          <span class="label-mono">[${item.status}]</span>
        </div>
        <h3 class="card-title">${item.title}</h3>
        <p class="body-md">${item.description}</p>
      </div>

      <div>
        <div class="progress-container">
          <div class="card-header" style="margin: 0;">
            <span class="label-mono">OPTIMIZATION_INDEX</span>
            <span class="label-mono">${item.progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${item.progress}%"></div>
          </div>
        </div>

        <div class="card-footer">
          <span class="label-mono text-muted">${item.stack.split(',')[0]}</span>
          <button class="btn btn-ghost details-btn" data-id="${item.id}">VIEW_SPECS</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/* Filter Logic */
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.filter;
      if (category === "all") {
        renderProjects(clubProjects);
      } else {
        const filtered = clubProjects.filter((p) => p.category === category);
        renderProjects(filtered);
      }
    });
  });
}

/* Stats Counter Animation */
function initStatsCounter() {
  const counters = document.querySelectorAll(".count-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute("data-target");
        let count = 0;
        const speed = Math.max(1, target / 30);

        const updateCount = () => {
          count += speed;
          if (count < target) {
            entry.target.innerText = Math.ceil(count);
            setTimeout(updateCount, 40);
          } else {
            entry.target.innerText = target;
          }
        };

        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach((counter) => observer.observe(counter));
}

/* Modal Logic */
function initModal() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close");
  const container = document.getElementById("projects-container");

  if (!modal) return;

  if (container) {
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("details-btn")) {
        const id = parseInt(e.target.dataset.id);
        const project = clubProjects.find((p) => p.id === id);

        if (project) {
          document.getElementById("modal-club-tag").innerText = `${project.club} // TECH_SPEC`;
          document.getElementById("modal-title").innerText = project.title;
          document.getElementById("modal-description").innerText = project.description;
          document.getElementById("modal-stack").innerText = project.stack;
          document.getElementById("modal-status").innerText = project.status;

          modal.classList.add("active");
        }
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  }
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
}

/*MARQUEE LOOP LOGIC*/
function initInfiniteMarquee() {
  const track = document.getElementById("marquee-track");
  if (track) {
    track.innerHTML += track.innerHTML;
  }
}

/*GLOBAL FOOTER INJECTOR*/
/* STREAMING_CHUNK:Initializing footer injection logic */
document.addEventListener("DOMContentLoaded", () => {
  // Call the function
  loadGlobalFooter();
});

function loadGlobalFooter() {
  const footerContainer = document.getElementById("footer-container");
  
  if (!footerContainer) {
    console.warn("DEBUG: footer-container NOT FOUND. Check your HTML for <div id='footer-container'></div>");
    return;
  }
  footerContainer.innerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <!-- Brand Section -->
        <div class="footer-brand">
          <span class="brand-title glow-text">NIT_SIKKIM</span>
          <p class="label-mono text-muted">NATIONAL INSTITUTE OF TECHNOLOGY SIKKIM</p>
        </div>

        <!-- Links Section -->
        <div class="footer-links">
          <span class="label-mono text-muted">[ TERMINAL_LINKS ]</span>
          <a href="index.html" class="nav-link">OVERVIEW</a>
          <a href="clubs.html" class="nav-link">CLUBS</a>
          <a href="alumni.html" class="nav-link">ALUMNI</a>
          <a href="metrics.html" class="nav-link">METRICS</a>
          <a href="events.html" class="nav-link">EVENTS</a>
          <a href="companies.html" class="nav-link">RECRUITERS</a>
        </div>

        <!-- Newsletter HUD Section -->
        <div class="footer-newsletter">
          <span class="label-mono text-muted">[ NETWORK_SYNC ]</span>
          <p class="label-mono text-muted">Establish connection for the latest campus updates, metrics, and alumni networking opportunities.</p>
          
          <form class="hud-form" onsubmit="event.preventDefault(); this.innerHTML = '<span class=\\'label-mono glow-text\\' style=\\'color: var(--primary);\\'>[✓] CONNECTION_ESTABLISHED</span>';">
            <input type="email" class="hud-input" placeholder="ENTER_EMAIL" required>
            <button type="submit" class="hud-submit">INITIATE</button>
          </form>

          <!-- Social Icons -->
          <div class="footer-social">
            <a href="https://github.com/opb_nitsikkim" class="social-icon" target="_blank"><i class="fa-brands fa-github"></i></a>
            <a href="https://www.instagram.com/opb_nitsikkim" class="social-icon" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.linkedin.com/school/opb-nit-sikkim/" class="social-icon" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://twitter.com/opb_nitsikkim" class="social-icon" target="_blank"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://discord.com/invite/MD2sD4yRvw" class="social-icon" target="_blank"><i class="fa-brands fa-discord"></i></a>
          </div>
        </div>
      </div>

      <div class="footer-meta">
        <span class="label-mono text-muted">&copy; ${new Date().getFullYear()} NIT SIKKIM STUDENT COMMUNITY</span>
        <span class="label-mono text-muted">MADE WITH 🤍 FOR SIKKIMITES</span>
      </div>
    </footer>
  `;
}
