/* ==========================================================================
   Sample Timetable Data
   Complete dataset for TPGIT departments
   ========================================================================== */

const timetableData = {
  // Computer Science & Engineering - III Year - Section A
  cse_3_a: {
    department: "Computer Science & Engineering",
    year: "III",
    section: "A",
    timetable: {
      Monday: [
        {
          time: "8:00-8:50",
          subject: "CS301 - Data Structures & Algorithms",
          faculty: "Dr. R. Kumar",
          room: "CSE-101",
          type: "theory",
          credits: 3,
        },
        {
          time: "8:50-9:40",
          subject: "CS302 - Database Management Systems",
          faculty: "Prof. S. Priya",
          room: "CSE-102",
          type: "theory",
          credits: 4,
        },
        {
          time: "9:40-10:30",
          subject: "CS303 - Operating Systems",
          faculty: "Dr. M. Verma",
          room: "CSE-103",
          type: "theory",
          credits: 3,
        },
        {
          time: "10:45-12:25",
          subject: "CS351 - Data Structures Lab",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-Lab-1",
          type: "lab",
          credits: 2,
          span: 2,
        },
        { time: "1:30-2:20", subject: "LUNCH BREAK", type: "break", span: 1 },
        {
          time: "2:20-3:10",
          subject: "GATE Coaching - Aptitude",
          faculty: "Prof. R. Desai",
          room: "CSE-201",
          type: "gate",
          credits: 1,
        },
        {
          time: "3:10-4:00",
          subject: "CS371 - Mini Project",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-Lab-4",
          type: "practical",
          credits: 2,
        },
      ],
      Tuesday: [
        {
          time: "8:00-8:50",
          subject: "CS304 - Computer Networks",
          faculty: "Prof. A. Sharma",
          room: "CSE-104",
          type: "theory",
          credits: 4,
        },
        {
          time: "8:50-9:40",
          subject: "CS305 - Software Engineering",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-105",
          type: "theory",
          credits: 3,
        },
        {
          time: "9:40-11:20",
          subject: "CS352 - Database Systems Lab",
          faculty: "Prof. P. Singh",
          room: "CSE-Lab-2",
          type: "lab",
          credits: 2,
          span: 2,
        },
        { time: "11:35-12:25", subject: "BREAK", type: "break", span: 1 },
        {
          time: "1:30-4:00",
          subject: "CS391 - Major Project",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "Project Lab",
          type: "project",
          credits: 6,
          span: 3,
        },
      ],
      Wednesday: [
        {
          time: "8:00-8:50",
          subject: "CS302 - Database Management Systems",
          faculty: "Prof. S. Priya",
          room: "CSE-102",
          type: "theory",
          credits: 4,
        },
        {
          time: "8:50-9:40",
          subject: "CS303 - Operating Systems",
          faculty: "Dr. M. Verma",
          room: "CSE-103",
          type: "theory",
          credits: 3,
        },
        { time: "9:40-10:30", subject: "BREAK", type: "break", span: 1 },
        {
          time: "10:45-12:25",
          subject: "CS353 - Web Technologies Lab",
          faculty: "Prof. R. Patel",
          room: "CSE-Lab-3",
          type: "lab",
          credits: 2,
          span: 2,
        },
        {
          time: "1:30-3:10",
          subject: "CS381 - Technical Seminar",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "Seminar Hall",
          type: "seminar",
          credits: 1,
          span: 2,
        },
      ],
      Thursday: [
        {
          time: "8:00-8:50",
          subject: "CS301 - Data Structures & Algorithms",
          faculty: "Dr. R. Kumar",
          room: "CSE-101",
          type: "theory",
          credits: 3,
        },
        {
          time: "8:50-9:40",
          subject: "CS304 - Computer Networks",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-104",
          type: "theory",
          credits: 4,
        },
        {
          time: "9:40-10:30",
          subject: "CS305 - Software Engineering",
          faculty: "Dr. K. Reddy",
          room: "CSE-105",
          type: "theory",
          credits: 3,
        },
        {
          time: "10:45-11:35",
          subject: "GATE Coaching - Technical",
          faculty: "Prof. S. Nair",
          room: "CSE-202",
          type: "gate",
          credits: 1,
        },
        {
          time: "11:35-12:25",
          subject: "CS371 - Mini Project",
          faculty: "Dr. N.Thirugnanasamdandan",
          room: "CSE-Lab-4",
          type: "practical",
          credits: 2,
        },
        {
          time: "1:30-3:10",
          subject: "CS351 - Data Structures Lab",
          faculty: "Prof. N. Gupta",
          room: "CSE-Lab-1",
          type: "lab",
          credits: 2,
          span: 2,
        },
      ],
      Friday: [
        {
          time: "8:00-8:50",
          subject: "CS303 - Operating Systems",
          faculty: "Dr. M. Verma",
          room: "CSE-103",
          type: "theory",
          credits: 3,
        },
        {
          time: "8:50-9:40",
          subject: "CS302 - Database Management Systems",
          faculty: "Prof. S. Priya",
          room: "CSE-102",
          type: "theory",
          credits: 4,
        },
        {
          time: "9:40-10:30",
          subject: "CS301 - Data Structures & Algorithms",
          faculty: "Dr. R. Kumar",
          room: "CSE-101",
          type: "theory",
          credits: 3,
        },
        {
          time: "10:45-12:25",
          subject: "CS391 - Major Project",
          faculty: "Dr. S. Mehta",
          room: "Project Lab",
          type: "project",
          credits: 6,
          span: 2,
        },
        {
          time: "1:30-3:10",
          subject: "CS352 - Database Systems Lab",
          faculty: "Prof. P. Singh",
          room: "CSE-Lab-2",
          type: "lab",
          credits: 2,
          span: 2,
        },
      ],
    },
    faculty: [
      {
        name: "Dr. R. Kumar",
        designation: "Professor",
        email: "r.kumar@tpgit.ac.in",
        subjects: ["Data Structures", "Algorithms"],
      },
      {
        name: "Prof. S. Priya",
        designation: "Associate Professor",
        email: "s.priya@tpgit.ac.in",
        subjects: ["Database Systems"],
      },
      {
        name: "Dr. M. Verma",
        designation: "Professor",
        email: "m.verma@tpgit.ac.in",
        subjects: ["Operating Systems"],
      },
      {
        name: "Prof. A. Sharma",
        designation: "Assistant Professor",
        email: "a.sharma@tpgit.ac.in",
        subjects: ["Computer Networks"],
      },
      {
        name: "Dr. K. Reddy",
        designation: "Professor",
        email: "k.reddy@tpgit.ac.in",
        subjects: ["Software Engineering"],
      },
      {
        name: "Prof. N. Gupta",
        designation: "Assistant Professor",
        email: "n.gupta@tpgit.ac.in",
        subjects: ["Data Structures Lab"],
      },
      {
        name: "Prof. P. Singh",
        designation: "Assistant Professor",
        email: "p.singh@tpgit.ac.in",
        subjects: ["Database Lab"],
      },
      {
        name: "Prof. R. Patel",
        designation: "Assistant Professor",
        email: "r.patel@tpgit.ac.in",
        subjects: ["Web Technologies"],
      },
      {
        name: "Dr. S. Mehta",
        designation: "Professor",
        email: "s.mehta@tpgit.ac.in",
        subjects: ["Project Guidance"],
      },
      {
        name: "Dr. A. Joshi",
        designation: "Associate Professor",
        email: "a.joshi@tpgit.ac.in",
        subjects: ["Seminars"],
      },
      {
        name: "Prof. R. Desai",
        designation: "GATE Coordinator",
        email: "r.desai@tpgit.ac.in",
        subjects: ["GATE Coaching"],
      },
      {
        name: "Prof. S. Nair",
        designation: "Assistant Professor",
        email: "s.nair@tpgit.ac.in",
        subjects: ["GATE Technical"],
      },
      {
        name: "Prof. K. Menon",
        designation: "Assistant Professor",
        email: "k.menon@tpgit.ac.in",
        subjects: ["Mini Projects"],
      },
    ],
  },

  // Electronics & Communication Engineering - III Year - Section A
  ece_3_a: {
    department: "Electronics & Communication Engineering",
    year: "III",
    section: "A",
    timetable: {
      Monday: [
        {
          time: "8:00-8:50",
          subject: "EC301 - Digital Signal Processing",
          faculty: "Dr. V. Sharma",
          room: "ECE-101",
          type: "theory",
          credits: 4,
        },
        {
          time: "8:50-9:40",
          subject: "EC302 - Communication Systems",
          faculty: "Prof. M. Reddy",
          room: "ECE-102",
          type: "theory",
          credits: 4,
        },
        {
          time: "9:40-11:20",
          subject: "EC351 - DSP Lab",
          faculty: "Prof. S. Kumar",
          room: "ECE-Lab-1",
          type: "lab",
          credits: 2,
          span: 2,
        },
        {
          time: "1:30-3:10",
          subject: "EC391 - Project Work",
          faculty: "Dr. A. Verma",
          room: "Project Lab",
          type: "project",
          credits: 6,
          span: 2,
        },
      ],
      // ... similar structure for other days
    },
    faculty: [
      // ECE faculty data
    ],
  },

  // Electrical & Electronics Engineering - III Year - Section A
  eee_3_a: {
    department: "Electrical & Electronics Engineering",
    year: "III",
    section: "A",
    timetable: {
      Monday: [
        {
          time: "8:00-8:50",
          subject: "EE301 - Power Systems",
          faculty: "Dr. P. Singh",
          room: "EEE-101",
          type: "theory",
          credits: 4,
        },
        {
          time: "8:50-10:30",
          subject: "EE351 - Power Systems Lab",
          faculty: "Prof. R. Gupta",
          room: "EEE-Lab-1",
          type: "lab",
          credits: 2,
          span: 2,
        },
        // ... rest of the schedule
      ],
      // ... similar structure for other days
    },
    faculty: [
      // EEE faculty data
    ],
  },

  // Mechanical Engineering - III Year - Section A
  mech_3_a: {
    department: "Mechanical Engineering",
    year: "III",
    section: "A",
    timetable: {
      Monday: [
        {
          time: "8:00-9:40",
          subject: "ME301 - Thermodynamics",
          faculty: "Dr. S. Rajan",
          room: "MECH-101",
          type: "theory",
          credits: 4,
          span: 2,
        },
        {
          time: "10:45-12:25",
          subject: "ME351 - Thermodynamics Lab",
          faculty: "Prof. K. Nair",
          room: "MECH-Lab-1",
          type: "lab",
          credits: 2,
          span: 2,
        },
        // ... rest of the schedule
      ],
      // ... similar structure for other days
    },
    faculty: [
      // Mechanical faculty data
    ],
  },

  // Civil Engineering - III Year - Section A
  civil_3_a: {
    department: "Civil Engineering",
    year: "III",
    section: "A",
    timetable: {
      Monday: [
        {
          time: "8:00-9:40",
          subject: "CE301 - Structural Analysis",
          faculty: "Dr. R. Menon",
          room: "CIVIL-101",
          type: "theory",
          credits: 4,
          span: 2,
        },
        {
          time: "10:45-12:25",
          subject: "CE351 - Structures Lab",
          faculty: "Prof. S. Desai",
          room: "CIVIL-Lab-1",
          type: "lab",
          credits: 2,
          span: 2,
        },
        // ... rest of the schedule
      ],
      // ... similar structure for other days
    },
    faculty: [
      // Civil faculty data
    ],
  },
};

// Export function to get timetable data
function getTimetableData(dept, year, section) {
  const key = `${dept}_${year}_${section}`.toLowerCase();
  return timetableData[key] || timetableData.cse_3_a;
}

// Export function to get all departments
function getAllDepartments() {
  return [
    { id: "cse", name: "Computer Science & Engineering", color: "#2e86c1" },
    {
      id: "ece",
      name: "Electronics & Communication Engineering",
      color: "#8e44ad",
    },
    {
      id: "eee",
      name: "Electrical & Electronics Engineering",
      color: "#f39c12",
    },
    { id: "mech", name: "Mechanical Engineering", color: "#e74c3c" },
    { id: "civil", name: "Civil Engineering", color: "#27ae60" },
  ];
}

// Export function to get faculty by department
function getFacultyByDepartment(dept) {
  const faculties = {
    cse: [
      {
        name: "Dr. R. Kumar",
        designation: "Professor & HOD",
        experience: "15 years",
        specialization: "Algorithms",
      },
      {
        name: "Prof. S. Priya",
        designation: "Associate Professor",
        experience: "10 years",
        specialization: "Database Systems",
      },
      {
        name: "Dr. M. Verma",
        designation: "Professor",
        experience: "12 years",
        specialization: "Operating Systems",
      },
      {
        name: "Prof. A. Sharma",
        designation: "Assistant Professor",
        experience: "8 years",
        specialization: "Computer Networks",
      },
      {
        name: "Dr. K. Reddy",
        designation: "Professor",
        experience: "14 years",
        specialization: "Software Engineering",
      },
    ],
    ece: [
      {
        name: "Dr. V. Sharma",
        designation: "Professor & HOD",
        experience: "16 years",
        specialization: "Signal Processing",
      },
      {
        name: "Prof. M. Reddy",
        designation: "Associate Professor",
        experience: "11 years",
        specialization: "Communication Systems",
      },
    ],
    eee: [
      {
        name: "Dr. P. Singh",
        designation: "Professor & HOD",
        experience: "18 years",
        specialization: "Power Systems",
      },
    ],
    mech: [
      {
        name: "Dr. S. Rajan",
        designation: "Professor & HOD",
        experience: "20 years",
        specialization: "Thermodynamics",
      },
    ],
    civil: [
      {
        name: "Dr. R. Menon",
        designation: "Professor & HOD",
        experience: "17 years",
        specialization: "Structural Engineering",
      },
    ],
  };

  return faculties[dept] || faculties.cse;
}

// Export function to get rooms by department
function getRoomsByDepartment(dept) {
  const rooms = {
    cse: [
      {
        code: "CSE-101",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi", "AC"],
      },
      {
        code: "CSE-102",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi"],
      },
      {
        code: "CSE-103",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi", "AC"],
      },
      {
        code: "CSE-104",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi"],
      },
      {
        code: "CSE-105",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi", "AC"],
      },
      {
        code: "CSE-Lab-1",
        type: "Laboratory",
        capacity: 30,
        floor: "2",
        facilities: ["Computers", "Projector", "WiFi", "AC"],
      },
      {
        code: "CSE-Lab-2",
        type: "Laboratory",
        capacity: 30,
        floor: "2",
        facilities: ["Computers", "Projector", "WiFi", "AC"],
      },
      {
        code: "CSE-Lab-3",
        type: "Laboratory",
        capacity: 30,
        floor: "2",
        facilities: ["Computers", "Projector", "WiFi", "AC"],
      },
      {
        code: "CSE-Lab-4",
        type: "Laboratory",
        capacity: 30,
        floor: "2",
        facilities: ["Computers", "Projector", "WiFi", "AC"],
      },
      {
        code: "CSE-201",
        type: "Seminar",
        capacity: 100,
        floor: "2",
        facilities: ["Projector", "WiFi", "AC", "Sound System"],
      },
      {
        code: "CSE-202",
        type: "Seminar",
        capacity: 100,
        floor: "2",
        facilities: ["Projector", "WiFi", "AC"],
      },
      {
        code: "Project Lab",
        type: "Project",
        capacity: 40,
        floor: "3",
        facilities: ["Computers", "WiFi", "AC", "Workstations"],
      },
      {
        code: "Seminar Hall",
        type: "Auditorium",
        capacity: 200,
        floor: "G",
        facilities: ["Projector", "WiFi", "AC", "Sound System", "Stage"],
      },
    ],
    ece: [
      {
        code: "ECE-101",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi"],
      },
      {
        code: "ECE-Lab-1",
        type: "Laboratory",
        capacity: 30,
        floor: "2",
        facilities: ["Equipment", "Projector", "WiFi"],
      },
    ],
    eee: [
      {
        code: "EEE-101",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi"],
      },
      {
        code: "EEE-Lab-1",
        type: "Laboratory",
        capacity: 20,
        floor: "2",
        facilities: ["Equipment", "Safety Gear", "WiFi"],
      },
    ],
    mech: [
      {
        code: "MECH-101",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi"],
      },
      {
        code: "MECH-Lab-1",
        type: "Workshop",
        capacity: 25,
        floor: "G",
        facilities: ["Machinery", "Tools", "Safety Gear"],
      },
    ],
    civil: [
      {
        code: "CIVIL-101",
        type: "Theory",
        capacity: 60,
        floor: "1",
        facilities: ["Projector", "WiFi"],
      },
      {
        code: "CIVIL-Lab-1",
        type: "Laboratory",
        capacity: 30,
        floor: "2",
        facilities: ["Testing Equipment", "Tools"],
      },
    ],
  };

  return rooms[dept] || rooms.cse;
}

// Export function to get subject types with colors
function getSubjectTypes() {
  return [
    { id: "theory", name: "Theory", color: "#3498db", icon: "fas fa-book" },
    { id: "lab", name: "Laboratory", color: "#2ecc71", icon: "fas fa-flask" },
    {
      id: "project",
      name: "Project",
      color: "#9b59b6",
      icon: "fas fa-project-diagram",
    },
    {
      id: "seminar",
      name: "Seminar",
      color: "#f1c40f",
      icon: "fas fa-chalkboard-teacher",
    },
    {
      id: "gate",
      name: "GATE Coaching",
      color: "#e74c3c",
      icon: "fas fa-graduation-cap",
    },
    {
      id: "practical",
      name: "Practical",
      color: "#1abc9c",
      icon: "fas fa-tools",
    },
  ];
}
