/* ==========================================================================
   Timetable JavaScript
   Complete timetable generation and interaction logic
   ========================================================================== */

class TimetableManager {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      department: "cse",
      year: "3",
      section: "A",
      viewMode: "normal",
      ...options,
    };

    this.currentWeek = 0;
    this.timeSlots = [
      { time: "8:00-8:50", period: "1" },
      { time: "8:50-9:40", period: "2" },
      { time: "9:40-10:30", period: "3" },
      { time: "10:45-11:35", period: "4" },
      { time: "11:35-12:25", period: "5" },
      { time: "1:30-2:20", period: "6" },
      { time: "2:20-3:10", period: "7" },
      { time: "3:10-4:00", period: "8" },
      { time: "4:00-4:50", period: "9" },
    ];

    this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    this.dayAbbr = ["MON", "TUE", "WED", "THU", "FRI"];

    this.timetableData = null;
    this.init();
  }

  async init() {
    await this.loadData();
    this.render();
    this.setupEventListeners();
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 60000); // Update every minute
  }

  async loadData() {
    // In a real application, this would fetch from an API
    // For now, we'll use sample data
    this.timetableData = this.generateSampleData();
  }

  generateSampleData() {
    const subjects = {
      theory: [
        {
          code: "CS301",
          name: "Data Structures & Algorithms",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-101",
        },
        {
          code: "CS302",
          name: "Database Management Systems",
          faculty: "Prof. K.Saraswathi",
          room: "CSE-102",
        },
        {
          code: "CS303",
          name: "Operating Systems",
          faculty: "Dr. V.VijayAnand",
          room: "CSE-103",
        },
        {
          code: "CS304",
          name: "Computer Networks",
          faculty: "Prof. K.Naveena ",
          room: "CSE-104",
        },
        {
          code: "CS305",
          name: "Software Engineering",
          faculty: "Dr. V.VijayAnand",
          room: "CSE-105",
        },
      ],
      lab: [
        {
          code: "CS351",
          name: "Data Structures Lab",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-Lab-1",
        },
        {
          code: "CS352",
          name: "Database Systems Lab",
          faculty: "Prof. K.Saraswathi",
          room: "CSE-Lab-2",
        },
        {
          code: "CS353",
          name: "Web Technologies Lab",
          faculty: "Prof. S.Thirunavukarasar",
          room: "CSE-Lab-3",
        },
      ],
      project: [
        {
          code: "CS391",
          name: "Major Project",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "Project Lab",
        },
      ],
      seminar: [
        {
          code: "CS381",
          name: "Technical Seminar",
          faculty: "Dr. V.VijayAnand",
          room: "Seminar Hall",
        },
      ],
      gate: [
        {
          code: "GATE01",
          name: "GATE Coaching - Aptitude",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-201",
        },
        {
          code: "GATE02",
          name: "GATE Coaching - Technical",
          faculty: "Prof. K.Saraswathi",
          room: "CSE-202",
        },
      ],
      practical: [
        {
          code: "CS371",
          name: "Mini Project",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-Lab-4",
        },
      ],
    };

    // Generate timetable data
    const timetable = {};

    this.days.forEach((day) => {
      timetable[day] = [];

      // Add regular classes
      if (day === "Monday") {
        timetable[day].push({
          time: "8:00-8:50",
          subject: subjects.theory[0],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "8:50-9:40",
          subject: subjects.theory[1],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "9:40-10:30",
          subject: subjects.theory[2],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "10:45-11:35",
          subject: subjects.lab[0],
          type: "lab",
          span: 2,
        });
        timetable[day].push({
          time: "11:35-12:25",
          subject: subjects.lab[0],
          type: "lab",
          span: 2,
        });
        timetable[day].push({
          time: "1:30-2:20",
          break: true,
          type: "lunch",
        });
        timetable[day].push({
          time: "2:20-3:10",
          subject: subjects.gate[0],
          type: "gate",
          span: 1,
        });
        timetable[day].push({
          time: "3:10-4:00",
          subject: subjects.practical[0],
          type: "practical",
          span: 1,
        });
      } else if (day === "Tuesday") {
        timetable[day].push({
          time: "8:00-8:50",
          subject: subjects.theory[3],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "8:50-9:40",
          subject: subjects.theory[4],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "9:40-10:30",
          subject: subjects.lab[1],
          type: "lab",
          span: 2,
        });
        timetable[day].push({
          time: "10:45-11:35",
          subject: subjects.lab[1],
          type: "lab",
          span: 2,
        });
        timetable[day].push({
          time: "1:30-2:20",
          subject: subjects.project[0],
          type: "project",
          span: 3,
        });
        timetable[day].push({
          time: "2:20-3:10",
          subject: subjects.project[0],
          type: "project",
          span: 3,
        });
        timetable[day].push({
          time: "3:10-4:00",
          subject: subjects.project[0],
          type: "project",
          span: 3,
        });
      } else if (day === "Wednesday") {
        timetable[day].push({
          time: "8:00-8:50",
          subject: subjects.theory[1],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "8:50-9:40",
          subject: subjects.theory[2],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "9:40-10:30",
          break: true,
          type: "break",
        });
        timetable[day].push({
          time: "10:45-11:35",
          subject: subjects.lab[2],
          type: "lab",
          span: 2,
        });
        timetable[day].push({
          time: "11:35-12:25",
          subject: subjects.lab[2],
          type: "lab",
          span: 2,
        });
        timetable[day].push({
          time: "1:30-2:20",
          subject: subjects.seminar[0],
          type: "seminar",
          span: 2,
        });
        timetable[day].push({
          time: "2:20-3:10",
          subject: subjects.seminar[0],
          type: "seminar",
          span: 2,
        });
      } else if (day === "Thursday") {
        timetable[day].push({
          time: "8:00-8:50",
          subject: subjects.theory[0],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "8:50-9:40",
          subject: subjects.theory[3],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "9:40-10:30",
          subject: subjects.theory[4],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "10:45-11:35",
          subject: subjects.gate[1],
          type: "gate",
          span: 1,
        });
        timetable[day].push({
          time: "11:35-12:25",
          subject: subjects.practical[0],
          type: "practical",
          span: 1,
        });
        timetable[day].push({
          time: "1:30-2:20",
          subject: subjects.lab[0],
          type: "lab",
          span: 2,
        });
        timetable[day].push({
          time: "2:20-3:10",
          subject: subjects.lab[0],
          type: "lab",
          span: 2,
        });
      } else if (day === "Friday") {
        timetable[day].push({
          time: "8:00-8:50",
          subject: subjects.theory[2],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "8:50-9:40",
          subject: subjects.theory[1],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "9:40-10:30",
          subject: subjects.theory[0],
          type: "theory",
          span: 1,
        });
        timetable[day].push({
          time: "10:45-11:35",
          subject: subjects.project[0],
          type: "project",
          span: 2,
        });
        timetable[day].push({
          time: "11:35-12:25",
          subject: subjects.project[0],
          type: "project",
          span: 2,
        });
        timetable[day].push({
          time: "1:30-2:20",
          subject: subjects.lab[1],
          type: "lab",
          span: 2,
        });
        timetable[day].push({
          time: "2:20-3:10",
          subject: subjects.lab[1],
          type: "lab",
          span: 2,
        });
      }
    });

    return timetable;
  }

  render() {
    if (!this.container || !this.timetableData) return;

    this.container.innerHTML = "";

    // Create timetable container
    const timetableElement = document.createElement("div");
    timetableElement.className = `timetable ${this.options.department} ${this.options.viewMode}`;

    // Create header
    const header = this.createHeader();
    timetableElement.appendChild(header);

    // Create body
    const body = this.createBody();
    timetableElement.appendChild(body);

    this.container.appendChild(timetableElement);

    // Add week navigation
    this.addWeekNavigation();

    // Add controls
    this.addControls();
  }

  createHeader() {
    const header = document.createElement("div");
    header.className = "timetable-header";

    // Time slot header
    const timeHeader = document.createElement("div");
    timeHeader.className = "time-header";
    timeHeader.textContent = "Time";
    header.appendChild(timeHeader);

    // Day headers
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1; // Convert Sunday (0) to 6, Monday (1) to 0

    this.days.forEach((day, index) => {
      const dayHeader = document.createElement("div");
      dayHeader.className = "day-header";
      dayHeader.innerHTML = `
                ${day}
                <span class="day-abbr">${this.dayAbbr[index]}</span>
                ${
                  index === dayIndex ? '<span class="current-day">T</span>' : ""
                }
            `;
      header.appendChild(dayHeader);
    });

    return header;
  }

  createBody() {
    const body = document.createElement("div");
    body.className = "timetable-body";

    this.timeSlots.forEach((timeSlot) => {
      // Time slot cell
      const timeCell = document.createElement("div");
      timeCell.className = "time-slot";
      timeCell.innerHTML = `
                <div class="time">${timeSlot.time}</div>
                <div class="period">Period ${timeSlot.period}</div>
            `;

      // Check if this is the current time slot
      if (this.isCurrentTime(timeSlot.time)) {
        timeCell.classList.add("current-time");
      }

      body.appendChild(timeCell);

      // Subject cells for each day
      this.days.forEach((day) => {
        const daySchedule = this.timetableData[day];
        const classAtTime = daySchedule.find((c) => c.time === timeSlot.time);

        const subjectCell = document.createElement("div");
        subjectCell.className = "subject-cell";

        if (classAtTime) {
          if (classAtTime.break) {
            subjectCell.classList.add(classAtTime.type);
            subjectCell.innerHTML = "";
          } else {
            subjectCell.classList.add(classAtTime.type);
            if (classAtTime.span > 1) {
              subjectCell.classList.add(`span-${classAtTime.span}`);
            }

            subjectCell.innerHTML = `
                            <div class="subject-content">
                                <div class="subject-code">${classAtTime.subject.code}</div>
                                <div class="subject-name">${classAtTime.subject.name}</div>
                                <div class="subject-faculty">
                                    <i class="fas fa-user"></i>
                                    ${classAtTime.subject.faculty}
                                </div>
                                <div class="subject-room">${classAtTime.subject.room}</div>
                            </div>
                            <div class="subject-badge ${classAtTime.type}"></div>
                        `;

            // Add click event for subject details
            subjectCell.addEventListener("click", () => {
              this.showSubjectDetails(classAtTime.subject);
            });
          }
        } else {
          subjectCell.classList.add("empty");
        }

        // Check if this is the current class
        if (this.isCurrentClass(day, timeSlot.time)) {
          subjectCell.classList.add("current");
        }

        body.appendChild(subjectCell);
      });
    });

    return body;
  }

  addWeekNavigation() {
    const navigation = document.createElement("div");
    navigation.className = "week-navigation";

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 4);

    navigation.innerHTML = `
            <button class="nav-btn prev">
                <i class="fas fa-chevron-left"></i>
                Previous Week
            </button>
            <div class="week-info">
                <div class="week-title">Week ${this.currentWeek + 1}</div>
                <div class="week-dates">
                    ${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}
                </div>
            </div>
            <button class="nav-btn next">
                Next Week
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

    this.container.insertBefore(navigation, this.container.firstChild);

    // Add event listeners
    navigation.querySelector(".prev").addEventListener("click", () => {
      this.currentWeek--;
      this.updateWeek();
    });

    navigation.querySelector(".next").addEventListener("click", () => {
      this.currentWeek++;
      this.updateWeek();
    });
  }

  addControls() {
    const controls = document.createElement("div");
    controls.className = "timetable-controls";

    controls.innerHTML = `
            <div class="view-controls">
                <button class="view-btn ${
                  this.options.viewMode === "compact" ? "active" : ""
                }" data-view="compact">
                    Compact
                </button>
                <button class="view-btn ${
                  this.options.viewMode === "normal" ? "active" : ""
                }" data-view="normal">
                    Normal
                </button>
                <button class="view-btn ${
                  this.options.viewMode === "detailed" ? "active" : ""
                }" data-view="detailed">
                    Detailed
                </button>
            </div>
            <div class="export-controls">
                <button class="export-btn" data-export="print">
                    <i class="fas fa-print"></i>
                    Print
                </button>
                <button class="export-btn" data-export="pdf">
                    <i class="fas fa-file-pdf"></i>
                    PDF
                </button>
                <button class="export-btn" data-export="json">
                    <i class="fas fa-code"></i>
                    JSON
                </button>
            </div>
        `;

    this.container.insertBefore(controls, this.container.firstChild);

    // Add event listeners
    controls.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.options.viewMode = e.target.dataset.view;
        this.render();
      });
    });

    controls.querySelectorAll(".export-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.exportTimetable(e.target.dataset.export);
      });
    });
  }

  isCurrentTime(timeSlot) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    const [start, end] = timeSlot.split("-");
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);

    const currentTime = currentHours * 60 + currentMinutes;
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    return currentTime >= startTime && currentTime <= endTime;
  }

  isCurrentClass(day, timeSlot) {
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1;
    const currentDayIndex = this.days.indexOf(this.days[dayIndex]);

    if (this.days.indexOf(day) !== currentDayIndex) return false;

    return this.isCurrentTime(timeSlot);
  }

  updateCurrentTime() {
    // Update current time highlights
    const timeSlots = this.container.querySelectorAll(".time-slot");
    const subjectCells = this.container.querySelectorAll(".subject-cell");

    timeSlots.forEach((slot) => {
      slot.classList.remove("current-time");
      const time = slot.querySelector(".time").textContent;
      if (this.isCurrentTime(time)) {
        slot.classList.add("current-time");
      }
    });

    subjectCells.forEach((cell) => {
      cell.classList.remove("current");
      // This would need to check the day and time for each cell
    });
  }

  showSubjectDetails(subject) {
    const modal = document.getElementById("subjectModal");
    const details = document.getElementById("subjectDetails");

    if (!modal || !details) return;

    details.innerHTML = `
            <div class="subject-detail">
                <div class="detail-header">
                    <h4>${subject.name}</h4>
                    <span class="subject-code">${subject.code}</span>
                </div>
                <div class="detail-info">
                    <div class="info-row">
                        <i class="fas fa-chalkboard-teacher"></i>
                        <strong>Faculty:</strong> ${subject.faculty}
                    </div>
                    <div class="info-row">
                        <i class="fas fa-door-open"></i>
                        <strong>Room:</strong> ${subject.room}
                    </div>
                    <div class="info-row">
                        <i class="fas fa-clock"></i>
                        <strong>Timing:</strong> As per schedule
                    </div>
                    <div class="info-row">
                        <i class="fas fa-calendar-alt"></i>
                        <strong>Schedule:</strong> Weekly classes
                    </div>
                </div>
                <div class="detail-actions">
                    <button class="btn btn-primary">
                        <i class="fas fa-book"></i> View Syllabus
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-envelope"></i> Contact Faculty
                    </button>
                </div>
            </div>
        `;

    modal.classList.add("active");

    // Close modal when clicking outside or on close button
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.classList.contains("modal-close")) {
        modal.classList.remove("active");
      }
    });
  }

  exportTimetable(format) {
    switch (format) {
      case "print":
        window.print();
        break;
      case "pdf":
        this.exportToPDF();
        break;
      case "json":
        this.exportToJSON();
        break;
    }
  }

  exportToPDF() {
    // PDF export implementation would go here
    alert("PDF export functionality will be implemented in the full version");
  }

  exportToJSON() {
    const data = {
      department: this.options.department,
      year: this.options.year,
      section: this.options.section,
      timetable: this.timetableData,
      generated: new Date().toISOString(),
    };

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `timetable_${this.options.department}_${this.options.year}_${this.options.section}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  updateWeek() {
    // Update week display and re-render if needed
    const weekTitle = this.container.querySelector(".week-title");
    const weekDates = this.container.querySelector(".week-dates");

    if (weekTitle && weekDates) {
      weekTitle.textContent = `Week ${this.currentWeek + 1}`;

      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(
        today.getDate() - today.getDay() + 1 + this.currentWeek * 7
      );
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 4);

      weekDates.textContent = `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    }
  }

  setupEventListeners() {
    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.currentWeek--;
        this.updateWeek();
      } else if (e.key === "ArrowRight") {
        this.currentWeek++;
        this.updateWeek();
      }
    });
  }

  updateOptions(options) {
    this.options = { ...this.options, ...options };
    this.render();
  }
}

// Initialize timetable for preview page
function loadPreviewTimetable() {
  const dept = document.getElementById("deptSelect").value;
  const year = document.getElementById("yearSelect").value;
  const section = document.getElementById("sectionSelect").value;

  const container = document.getElementById("previewTimetableContainer");
  if (!container) return;

  container.innerHTML = '<div class="timetable-loading"></div>';

  // Simulate loading
  setTimeout(() => {
    const timetable = new TimetableManager("previewTimetableContainer", {
      department: dept,
      year: year,
      section: section,
    });
  }, 500);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize accessibility features
  setupAccessibility();

  // Initialize timetable if on schedule page
  if (document.getElementById("mainTimetable")) {
    const timetable = new TimetableManager("mainTimetable");
  }

  // Initialize preview timetable if on home page
  if (document.getElementById("previewTimetableContainer")) {
    loadPreviewTimetable();
  }
});

// Accessibility setup
function setupAccessibility() {
  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);

      // Update icon
      const icon = this.querySelector("i");
      icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

      // Save preference
      localStorage.setItem("theme", newTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const icon = themeToggle.querySelector("i");
    icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  // High contrast mode
  const highContrastBtn = document.getElementById("highContrastBtn");
  if (highContrastBtn) {
    highContrastBtn.addEventListener("click", function () {
      document.body.classList.toggle("high-contrast");
      localStorage.setItem(
        "highContrast",
        document.body.classList.contains("high-contrast")
      );
    });

    // Load saved preference
    if (localStorage.getItem("highContrast") === "true") {
      document.body.classList.add("high-contrast");
    }
  }

  // Text size adjustment
  const textSizeBtn = document.getElementById("textSizeBtn");
  if (textSizeBtn) {
    textSizeBtn.addEventListener("click", function () {
      const currentSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      let newSize = currentSize + 2;
      if (newSize > 24) newSize = 16; // Reset if too large
      document.documentElement.style.fontSize = newSize + "px";
      localStorage.setItem("fontSize", newSize);
    });

    // Load saved preference
    const savedSize = localStorage.getItem("fontSize");
    if (savedSize) {
      document.documentElement.style.fontSize = savedSize + "px";
    }
  }

  // Read aloud feature
  const readAloudBtn = document.getElementById("readAloudBtn");
  if (readAloudBtn) {
    readAloudBtn.addEventListener("click", function () {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance();
        speech.text =
          document.title +
          ". " +
          document.querySelector("h1")?.textContent +
          ". " +
          document.querySelector("p")?.textContent;
        window.speechSynthesis.speak(speech);
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Alt + T for theme toggle
    if (e.altKey && e.key === "t") {
      themeToggle?.click();
    }

    // Alt + C for high contrast
    if (e.altKey && e.key === "c") {
      highContrastBtn?.click();
    }

    // Alt + P for print
    if (e.altKey && e.key === "p") {
      window.print();
    }

    // Escape to close modals
    if (e.key === "Escape") {
      const modal = document.querySelector(".modal.active");
      if (modal) {
        modal.classList.remove("active");
      }
    }
  });
}

// Setup navigation
function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navItems.forEach((item) => {
    const link = item.querySelector(".nav-link");
    if (link) {
      const href = link.getAttribute("href");
      if (
        href === currentPage ||
        (currentPage === "" && href === "index.html") ||
        (currentPage.includes(href.replace(".html", "")) &&
          href !== "index.html")
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  });
}

// Setup keyboard shortcuts info
function setupKeyboardShortcuts() {
  const shortcutsBtn = document.getElementById("keyboardShortcutsBtn");
  if (shortcutsBtn) {
    shortcutsBtn.addEventListener("click", function () {
      alert(`Keyboard Shortcuts:
• Alt + T: Toggle Theme
• Alt + C: Toggle High Contrast
• Alt + P: Print Timetable
• Escape: Close Modal
• Arrow Keys: Navigate Weeks`);
    });
  }
}
