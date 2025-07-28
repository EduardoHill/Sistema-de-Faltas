// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  PROFESSOR: 'professor',
  STUDENT: 'student',
  DEPARTMENT_HEAD: 'department_head',
}

// Attendance status
export const ATTENDANCE_STATUS = {
  PRESENT: 'presente',
  ABSENT: 'falta',
}

// Department status
export const DEPARTMENT_STATUS = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
}

// Notification types
export const NOTIFICATION_TYPES = {
  SYSTEM: 'sistema',
  ATTENDANCE: 'frequencia',
  GRADE: 'nota',
  JUSTIFICATION: 'justificativa',
  COURSE: 'disciplina',
}

// Route paths
export const ROUTES = {
  LOGIN: '/login',
  ADMIN: {
    DEPARTMENTS: '/admin/departments',
    BATCH_UPLOAD: '/admin/batch-upload',
  },
  DEPARTMENT: {
    COURSES: '/department/courses',
    GRADE_CLOSURE: '/department/grade-closure',
  },
  PROFESSOR: {
    DASHBOARD: '/professor/dashboard',
    ATTENDANCE: '/professor/attendance',
    JUSTIFICATIONS: '/professor/justifications',
  },
  STUDENT: {
    DASHBOARD: '/student/dashboard',
  },
  COMMON: {
    NOTIFICATIONS: '/notifications',
    SETTINGS: '/settings',
  },
}

// Default user data by role
export const DEFAULT_USERS = {
  [USER_ROLES.ADMIN]: {
    name: 'Admin Sistema',
    email: 'admin@universidade.edu.br',
  },
  [USER_ROLES.PROFESSOR]: {
    name: 'Prof. Maria Santos',
    email: 'maria.santos@universidade.edu.br',
  },
  [USER_ROLES.STUDENT]: {
    name: 'João Aluno',
    email: 'joao.aluno@universidade.edu.br',
  },
  [USER_ROLES.DEPARTMENT_HEAD]: {
    name: 'Chefe Departamento',
    email: 'chefe@universidade.edu.br',
  },
}

// Validation rules
export const VALIDATION_RULES = {
  DEPARTMENT: {
    NAME_MAX_LENGTH: 100,
    CODE_MAX_LENGTH: 5,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
}

// Frequency thresholds
export const FREQUENCY_THRESHOLDS = {
  EXCELLENT: 95,
  GOOD: 75,
  WARNING: 60,
}
