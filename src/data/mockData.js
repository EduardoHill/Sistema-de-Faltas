import {
  ATTENDANCE_STATUS,
  DEPARTMENT_STATUS,
  NOTIFICATION_TYPES,
} from '../constants'

// Mock departments
export const mockDepartments = [
  {
    id: 1,
    nome: 'Ciência da Computação',
    codigo: 'CC',
    status: DEPARTMENT_STATUS.ACTIVE,
  },
  {
    id: 2,
    nome: 'Engenharia Civil',
    codigo: 'EC',
    status: DEPARTMENT_STATUS.ACTIVE,
  },
  {
    id: 3,
    nome: 'Administração',
    codigo: 'ADM',
    status: DEPARTMENT_STATUS.INACTIVE,
  },
  { id: 4, nome: 'Direito', codigo: 'DIR', status: DEPARTMENT_STATUS.ACTIVE },
  { id: 5, nome: 'Medicina', codigo: 'MED', status: DEPARTMENT_STATUS.ACTIVE },
]

// Mock turmas/classes
export const mockTurmas = [
  {
    id: '1',
    nome: 'Algoritmos e Estruturas de Dados - Turma A',
    codigo: 'AED001-A',
  },
  { id: '2', nome: 'Banco de Dados - Turma B', codigo: 'BD001-B' },
  { id: '3', nome: 'Engenharia de Software - Turma A', codigo: 'ES001-A' },
]

// Mock students
export const mockStudents = [
  {
    id: 1,
    nome: 'Ana Silva Santos',
    matricula: '2021001',
    foto: null,
    status: ATTENDANCE_STATUS.PRESENT,
    totalFaltas: 2,
    percentualFrequencia: 95,
  },
  {
    id: 2,
    nome: 'Bruno Costa Lima',
    matricula: '2021002',
    foto: null,
    status: ATTENDANCE_STATUS.PRESENT,
    totalFaltas: 1,
    percentualFrequencia: 97,
  },
  {
    id: 3,
    nome: 'Carla Oliveira Souza',
    matricula: '2021003',
    foto: null,
    status: ATTENDANCE_STATUS.ABSENT,
    totalFaltas: 5,
    percentualFrequencia: 87,
  },
  {
    id: 4,
    nome: 'Daniel Pereira Alves',
    matricula: '2021004',
    foto: null,
    status: ATTENDANCE_STATUS.PRESENT,
    totalFaltas: 0,
    percentualFrequencia: 100,
  },
  {
    id: 5,
    nome: 'Eduarda Martins Rocha',
    matricula: '2021005',
    foto: null,
    status: ATTENDANCE_STATUS.PRESENT,
    totalFaltas: 3,
    percentualFrequencia: 92,
  },
  {
    id: 6,
    nome: 'Felipe Santos Barbosa',
    matricula: '2021006',
    foto: null,
    status: ATTENDANCE_STATUS.ABSENT,
    totalFaltas: 7,
    percentualFrequencia: 82,
  },
  {
    id: 7,
    nome: 'Gabriela Lima Ferreira',
    matricula: '2021007',
    foto: null,
    status: ATTENDANCE_STATUS.PRESENT,
    totalFaltas: 1,
    percentualFrequencia: 97,
  },
  {
    id: 8,
    nome: 'Henrique Costa Mendes',
    matricula: '2021008',
    foto: null,
    status: ATTENDANCE_STATUS.PRESENT,
    totalFaltas: 4,
    percentualFrequencia: 89,
  },
]

// Mock notifications
export const mockNotifications = [
  {
    id: 1,
    title: 'Sistema de Frequência Atualizado',
    message: 'Nova versão do sistema disponível com melhorias de performance.',
    type: NOTIFICATION_TYPES.SYSTEM,
    read: false,
    date: '2024-01-15T10:30:00Z',
    priority: 'alta',
  },
  {
    id: 2,
    title: 'Frequência Baixa Detectada',
    message:
      'Aluno João Silva está com frequência abaixo de 75% em Algoritmos.',
    type: NOTIFICATION_TYPES.ATTENDANCE,
    read: false,
    date: '2024-01-14T14:20:00Z',
    priority: 'alta',
  },
  {
    id: 3,
    title: 'Justificativa Pendente',
    message: 'Nova justificativa de falta enviada por Maria Santos.',
    type: NOTIFICATION_TYPES.JUSTIFICATION,
    read: true,
    date: '2024-01-13T09:15:00Z',
    priority: 'media',
  },
  {
    id: 4,
    title: 'Disciplina Cadastrada',
    message: 'Nova disciplina "Inteligência Artificial" foi cadastrada.',
    type: NOTIFICATION_TYPES.COURSE,
    read: true,
    date: '2024-01-12T16:45:00Z',
    priority: 'baixa',
  },
]
