/**
 * ============================================================================
 * SEED DATA & INITIAL APP STATE
 * ============================================================================
 * Contains default student profile, subjects, tasks, timetable schedules,
 * upcoming exams with topic breakdowns and automated countdown reminders,
 * academic goals, and notification feeds matching the prototype.
 */

export const defaultState = {
  user: {
    id: 'usr_alex_01',
    firstName: 'Alex',
    lastName: 'Mercer',
    fullName: 'Alex Mercer',
    email: 'alex.student@university.edu',
    institution: 'State University of Technology',
    major: 'Computer Science, B.S.',
    currentYear: 'Junior (Year 3)',
    studentId: '5643212',
    bio: 'Computer Science major focusing on AI and Machine Learning. Passionate about building tools that help students succeed.',
    gpa: 3.8,
    maxGpa: 4.0,
    photoUrl: '',
    tags: ['Sophomore', "Dean's List", 'Enrolled']
  },

  subjects: [
    {
      id: 'sub_cs201',
      name: 'Data Structures',
      courseCode: 'CS201',
      instructor: 'Dr. Alan Turing',
      color: '#4F46E5',
      icon: 'code',
      totalTasks: 15,
      completedTasks: 12,
      nextMilestone: { type: 'Midterm', date: 'Nov 15' }
    },
    {
      id: 'sub_cs305',
      name: 'DBMS',
      courseCode: 'CS305',
      instructor: 'Prof. Grace Hopper',
      color: '#7C3AED',
      icon: 'database',
      totalTasks: 10,
      completedTasks: 5,
      nextMilestone: { type: 'Final', date: 'Dec 10' }
    },
    {
      id: 'sub_cs101',
      name: 'Python',
      courseCode: 'CS101',
      instructor: 'Dr. Guido van Rossum',
      color: '#059669',
      icon: 'code',
      totalTasks: 20,
      completedTasks: 18,
      nextMilestone: { type: 'Project', date: 'Nov 28' }
    },
    {
      id: 'sub_cs402',
      name: 'Web Tech',
      courseCode: 'CS402',
      instructor: 'Prof. Tim Berners-Lee',
      color: '#DC2626',
      icon: 'globe',
      totalTasks: 8,
      completedTasks: 2,
      nextMilestone: { type: 'Quiz', date: 'Oct 25' }
    }
  ],

  tasks: [
    // Today
    {
      id: 'tsk_01',
      title: 'Complete Linked List Assignment',
      description: 'Implement doubly linked list with reverse and deletion methods.',
      subjectId: 'sub_cs201',
      subjectName: 'Data Structures',
      subjectColor: '#4F46E5',
      dueDate: 'Today, 11:59 PM',
      priority: 'high',
      estimatedMinutes: 150,
      isCompleted: false
    },
    {
      id: 'tsk_02',
      title: 'Read Chapter 4: Thermodynamics',
      description: 'Review entropy formulations and solve sample problems 4.1 to 4.8.',
      subjectId: 'sub_phys',
      subjectName: 'Physics 101',
      subjectColor: '#059669',
      dueDate: 'Tomorrow, 5:00 PM',
      priority: 'medium',
      estimatedMinutes: 120,
      isCompleted: false
    },
    {
      id: 'tsk_03',
      title: 'Review History Flashcards',
      description: 'Spaced repetition flashcard deck for World History French Revolution.',
      subjectId: 'sub_hist',
      subjectName: 'World History',
      subjectColor: '#7C3AED',
      dueDate: 'Today, 7:00 PM',
      priority: 'low',
      estimatedMinutes: 30,
      isCompleted: true,
      completedDate: 'Oct 23'
    },
    // Upcoming
    {
      id: 'tsk_04',
      title: 'Database Management Project',
      description: 'ER diagram and relational schema modeling for library system.',
      subjectId: 'sub_cs305',
      subjectName: 'DBMS',
      subjectColor: '#7C3AED',
      dueDate: 'Oct 25, 11:59 PM',
      priority: 'medium',
      estimatedMinutes: 180,
      isCompleted: false
    },
    {
      id: 'tsk_05',
      title: 'Literature Review: Modernism',
      description: 'Comparative analysis of Virginia Woolf and James Joyce.',
      subjectId: 'sub_eng',
      subjectName: 'English Lit',
      subjectColor: '#059669',
      dueDate: 'Oct 27, 4:00 PM',
      priority: 'low',
      estimatedMinutes: 90,
      isCompleted: false
    },
    {
      id: 'tsk_06',
      title: 'Calculus Quiz Preparation',
      description: 'Practice integration by parts and trigonometric substitutions.',
      subjectId: 'sub_math',
      subjectName: 'Mathematics',
      subjectColor: '#DC2626',
      dueDate: 'Oct 28, 10:00 AM',
      priority: 'high',
      estimatedMinutes: 120,
      isCompleted: false
    },
    // Overdue
    {
      id: 'tsk_07',
      title: 'Web Tech Quiz Prep',
      description: 'Review CSS Flexbox, Grid properties and JavaScript event loop.',
      subjectId: 'sub_cs402',
      subjectName: 'Web Tech',
      subjectColor: '#DC2626',
      dueDate: 'Overdue Oct 22',
      priority: 'medium',
      estimatedMinutes: 120,
      isCompleted: false,
      isOverdue: true
    },
    {
      id: 'tsk_08',
      title: 'Python Scripting Assignment',
      description: 'File I/O and regular expressions parsing assignment.',
      subjectId: 'sub_cs101',
      subjectName: 'Python',
      subjectColor: '#059669',
      dueDate: 'Overdue Oct 21',
      priority: 'high',
      estimatedMinutes: 150,
      isCompleted: false,
      isOverdue: true
    },
    // Completed
    {
      id: 'tsk_09',
      title: 'DBMS Midterm Preparation',
      description: 'Relational algebra queries and B-tree index practice sets.',
      subjectId: 'sub_cs305',
      subjectName: 'DBMS',
      subjectColor: '#7C3AED',
      dueDate: 'Completed Oct 20',
      priority: 'high',
      estimatedMinutes: 150,
      isCompleted: true,
      completedDate: 'Oct 20'
    },
    {
      id: 'tsk_10',
      title: 'Linked List Assignment',
      description: 'Singly linked list node traversal and head-insertion algorithms.',
      subjectId: 'sub_cs201',
      subjectName: 'Data Structures',
      subjectColor: '#4F46E5',
      dueDate: 'Completed Oct 19',
      priority: 'medium',
      estimatedMinutes: 150,
      isCompleted: true,
      completedDate: 'Oct 19'
    },
    {
      id: 'tsk_11',
      title: 'History Essay Draft',
      description: 'Industrial revolution economic impact thesis outline.',
      subjectId: 'sub_hist',
      subjectName: 'World History',
      subjectColor: '#059669',
      dueDate: 'Completed Oct 18',
      priority: 'low',
      estimatedMinutes: 120,
      isCompleted: true,
      completedDate: 'Oct 18'
    }
  ],

  schedule: [
    {
      id: 'sch_01',
      subjectName: 'Advanced Calculus',
      timeSlot: '09:15 - 10:45',
      type: 'Lecture',
      location: 'Lecture • Room 302',
      day: 'mon',
      color: '#7C3AED',
      topPx: 16,
      heightPx: 92
    },
    {
      id: 'sch_02',
      subjectName: 'Physics Review',
      timeSlot: '12:15 - 13:00',
      type: 'Review',
      location: 'Library Quiet Pod 4',
      day: 'mon',
      color: '#059669',
      topPx: 208,
      heightPx: 48
    },
    {
      id: 'sch_03',
      subjectName: 'Deep Work: Thesis',
      timeSlot: '11:00 - 13:00',
      type: 'Deep Work',
      location: 'Focus on chapter 3 citations.',
      day: 'tue',
      color: '#5551FF',
      topPx: 128,
      heightPx: 124
    },
    {
      id: 'sch_04',
      subjectName: 'Study Group',
      timeSlot: '10:00 - 11:00',
      type: 'Collaborative',
      location: 'Student Union Rm 204',
      day: 'wed',
      color: '#DBEAFE',
      textColor: '#1E40AF',
      topPx: 64,
      heightPx: 62
    },
    {
      id: 'sch_05',
      subjectName: 'Mock Exam',
      timeSlot: '13:00 - 15:00',
      type: 'Timed',
      location: 'Timed Testing Center',
      day: 'fri',
      color: '#FEE2E2',
      textColor: '#991B1B',
      isTimed: true,
      topPx: 256,
      heightPx: 124
    }
  ],

  exams: [
    {
      id: 'exm_01',
      title: 'DBMS Midterm',
      subjectName: 'DBMS',
      examDate: 'OCT 28, 2023',
      examTime: '10:00 AM',
      daysLeft: 12,
      targetScore: 90,
      preparationScore: 72,
      practiceTestsCompleted: 3,
      practiceTestsTotal: 5,
      practiceTestAvgScore: 84,
      studyHoursPerWeek: 5,
      isFeatured: true,
      topics: [
        { id: 'top_01', title: 'Relational Algebra', isCompleted: true },
        { id: 'top_02', title: 'SQL Fundamentals', isCompleted: true },
        { id: 'top_03', title: 'Normalization (1NF-3NF)', isCompleted: false, isActive: true },
        { id: 'top_04', title: 'Transaction Management', isCompleted: false },
        { id: 'top_05', title: 'Concurrency Control', isCompleted: false },
        { id: 'top_06', title: 'B-Tree & Indexing', isCompleted: false }
      ],
      // Automated Countdown Reminders
      reminders: [
        { id: 'rem_01_24h', hoursBefore: 24, label: '24 hours before (1 day)', unit: 'hours', value: 24, channel: 'in-app', enabled: true },
        { id: 'rem_01_1h', hoursBefore: 1, label: '1 hour before', unit: 'hours', value: 1, channel: 'in-app', enabled: true },
        { id: 'rem_01_3d', hoursBefore: 72, label: '3 days before', unit: 'days', value: 3, channel: 'browser', enabled: false }
      ]
    },
    {
      id: 'exm_02',
      title: 'Operating Systems',
      subjectName: 'Operating Systems',
      examDate: 'NOV 05, 2023',
      daysLeft: 20,
      preparationScore: 45,
      statusTag: 'Final Exam',
      reminders: [
        { id: 'rem_02_24h', hoursBefore: 24, label: '24 hours before', unit: 'hours', value: 24, channel: 'in-app', enabled: true },
        { id: 'rem_02_1h', hoursBefore: 1, label: '1 hour before', unit: 'hours', value: 1, channel: 'in-app', enabled: true }
      ]
    },
    {
      id: 'exm_03',
      title: 'Computer Networks',
      subjectName: 'Computer Networks',
      examDate: 'NOV 12, 2023',
      daysLeft: 27,
      preparationScore: 15,
      statusTag: 'Midterm 2',
      reminders: [
        { id: 'rem_03_48h', hoursBefore: 48, label: '48 hours before', unit: 'hours', value: 48, channel: 'in-app', enabled: true },
        { id: 'rem_03_1h', hoursBefore: 1, label: '1 hour before', unit: 'hours', value: 1, channel: 'in-app', enabled: true }
      ]
    }
  ],

  goals: [
    // Active
    {
      id: 'gol_01',
      title: 'Complete Python Syllabus',
      description: 'Master core concepts, data structures, and build 3 practical projects before midterms.',
      category: 'Academics',
      status: 'active',
      progressPercentage: 65,
      targetDate: 'Nov 15',
      tasksCompleted: 12,
      totalTasks: 18
    },
    {
      id: 'gol_02',
      title: 'Study 20h/week',
      description: 'Maintain a consistent study schedule across all subjects to prepare for finals.',
      category: 'Routine',
      status: 'active',
      progressPercentage: 70,
      resetsDay: 'Recurring: Weekly',
      currentValue: 14,
      targetValue: 20,
      unit: 'hours',
      streakWeeks: 3
    },
    // Completed
    {
      id: 'gol_03',
      title: 'Submit History Essay',
      description: 'Complete final draft on the French Revolution and submit via portal.',
      category: 'Research',
      status: 'completed',
      progressPercentage: 100,
      completedDate: 'Oct 15'
    },
    {
      id: 'gol_04',
      title: 'Pass Calculus Midterm',
      description: 'Achieve at least an 85% on the integration and derivatives midterm.',
      category: 'Academics',
      status: 'completed',
      progressPercentage: 100,
      completedDate: 'Oct 10'
    },
    {
      id: 'gol_05',
      title: "Read '1984'",
      description: 'Finish reading the assigned chapters and write chapter summaries.',
      category: 'Personal',
      status: 'completed',
      progressPercentage: 100,
      completedDate: 'Oct 05'
    },
    {
      id: 'gol_06',
      title: 'Biology Lab Report',
      description: 'Complete and submit the photosynthesis experiment lab report.',
      category: 'Science',
      status: 'completed',
      progressPercentage: 100,
      completedDate: 'Sep 28'
    },
    // Archived
    {
      id: 'gol_07',
      title: 'Read Calculus Textbook',
      description: 'Complete reading and exercises for Chapters 1-5 to prepare for the mid-term.',
      category: 'Academics',
      status: 'archived',
      progressPercentage: 45,
      archivedDate: 'Archived Oct 12'
    },
    {
      id: 'gol_08',
      title: 'Join Coding Bootcamp',
      description: 'Research and enroll in an intensive 12-week full-stack web development bootcamp.',
      category: 'Skill',
      status: 'archived',
      progressPercentage: 15,
      archivedDate: 'Archived Sep 28'
    },
    {
      id: 'gol_09',
      title: 'Draft Chemistry Thesis Outline',
      description: 'Initial structural planning for the final year thesis paper on organic compounds.',
      category: 'Research',
      status: 'archived',
      progressPercentage: 80,
      archivedDate: 'Archived Aug 10'
    }
  ],

  notifications: [
    {
      id: 'notif_01',
      title: 'Advanced Calculus Midterm',
      message: 'Exam is in exactly 3 days. Review chapters 4-6 as planned.',
      badgeText: '3 Days Left',
      badgeType: 'urgent',
      timeAgo: '2h ago',
      isRead: false
    },
    {
      id: 'notif_02',
      title: 'Physics Lab Report',
      message: 'Final draft is due tomorrow at 11:59 PM. Ensure formatting meets guidelines.',
      badgeText: 'Due Tomorrow',
      badgeType: 'warning',
      timeAgo: '5h ago',
      isRead: false
    },
    {
      id: 'notif_03',
      title: 'Study Group: Macroeconomics',
      message: 'Meeting in Library Room B starts in 1 hour.',
      badgeText: 'Starts soon',
      badgeType: 'info',
      timeAgo: 'Yesterday',
      isRead: false
    },
    {
      id: 'notif_04',
      title: 'Weekly Goal Met',
      message: 'You completed 10 hours of focused study this week. Great job!',
      badgeText: 'Completed',
      badgeType: 'success',
      timeAgo: '2 days ago',
      isRead: true
    }
  ]
};
