import { useState } from 'react'
import { Users, Calendar, Clock, BookOpen, ChevronRight, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNavigate } from 'react-router-dom'

const ProfessorDashboard = () => {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('2024.1')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const turmas = [
    {
      id: 1,
      disciplina: 'Algoritmos e Estruturas de Dados',
      codigo: 'AED001',
      turma: 'A',
      periodo: '2024.1',
      diasSemana: ['Segunda', 'Quarta'],
      horario: '08:00 - 10:00',
      numeroAlunos: 35,
      status: 'Ativa',
      progresso: 75,
      proximaAula: '2024-07-29'
    },
    {
      id: 2,
      disciplina: 'Banco de Dados',
      codigo: 'BD001',
      turma: 'B',
      periodo: '2024.1',
      diasSemana: ['Terça', 'Quinta'],
      horario: '10:00 - 12:00',
      numeroAlunos: 28,
      status: 'Ativa',
      progresso: 60,
      proximaAula: '2024-07-30'
    },
    {
      id: 3,
      disciplina: 'Engenharia de Software',
      codigo: 'ES001',
      turma: 'A',
      periodo: '2024.1',
      diasSemana: ['Segunda', 'Quarta', 'Sexta'],
      horario: '14:00 - 16:00',
      numeroAlunos: 42,
      status: 'Ativa',
      progresso: 80,
      proximaAula: '2024-07-29'
    },
    {
      id: 4,
      disciplina: 'Redes de Computadores',
      codigo: 'RC001',
      turma: 'C',
      periodo: '2024.1',
      diasSemana: ['Terça', 'Quinta'],
      horario: '16:00 - 18:00',
      numeroAlunos: 31,
      status: 'Ativa',
      progresso: 90,
      proximaAula: '2024-07-30'
    },
    {
      id: 5,
      disciplina: 'Programação Orientada a Objetos',
      codigo: 'POO001',
      turma: 'A',
      periodo: '2023.2',
      diasSemana: ['Segunda', 'Quarta'],
      horario: '08:00 - 10:00',
      numeroAlunos: 38,
      status: 'Finalizada',
      progresso: 100,
      proximaAula: null
    }
  ]

  const periods = [...new Set(turmas.map(t => t.periodo))].sort().reverse()
  
  const filteredTurmas = turmas.filter(turma => {
    const periodMatch = selectedPeriod === 'all' || turma.periodo === selectedPeriod
    const statusMatch = selectedStatus === 'all' || 
      (selectedStatus === 'ativa' && turma.status === 'Ativa') ||
      (selectedStatus === 'finalizada' && turma.status === 'Finalizada')
    return periodMatch && statusMatch
  })

  const handleTurmaClick = (turma) => {
    if (turma.status === 'Ativa') {
      navigate('/professor/attendance', { state: { turma } })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativa': return 'default'
      case 'Finalizada': return 'secondary'
      default: return 'outline'
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-blue-500'
    if (progress >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const formatDaysOfWeek = (days) => {
    const shortDays = {
      'Segunda': 'Seg',
      'Terça': 'Ter',
      'Quarta': 'Qua',
      'Quinta': 'Qui',
      'Sexta': 'Sex',
      'Sábado': 'Sáb'
    }
    return days.map(day => shortDays[day]).join(', ')
  }

  const isToday = (dateString) => {
    if (!dateString) return false
    const today = new Date().toISOString().split('T')[0]
    return dateString === today
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Minhas Turmas</h1>
          <p className="text-gray-600 mt-1">Gerencie suas turmas e acesse o lançamento de frequência</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {filteredTurmas.length}
              </div>
              <div className="text-sm text-gray-600">Total de Turmas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {filteredTurmas.filter(t => t.status === 'Ativa').length}
              </div>
              <div className="text-sm text-gray-600">Turmas Ativas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredTurmas.reduce((acc, t) => acc + t.numeroAlunos, 0)}
              </div>
              <div className="text-sm text-gray-600">Total de Alunos</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {filteredTurmas.filter(t => t.proximaAula && isToday(t.proximaAula)).length}
              </div>
              <div className="text-sm text-gray-600">Aulas Hoje</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-500" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os períodos</SelectItem>
                  {periods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="ativa">Ativas</SelectItem>
                  <SelectItem value="finalizada">Finalizadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Turmas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTurmas.map((turma) => (
          <Card 
            key={turma.id} 
            className={`transition-all duration-200 hover:shadow-lg ${
              turma.status === 'Ativa' ? 'cursor-pointer hover:scale-105' : ''
            }`}
            onClick={() => handleTurmaClick(turma)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{turma.disciplina}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{turma.codigo}</Badge>
                    <Badge variant="outline">Turma {turma.turma}</Badge>
                    <Badge variant={getStatusColor(turma.status)}>{turma.status}</Badge>
                  </div>
                </div>
                {turma.status === 'Ativa' && (
                  <ChevronRight size={20} className="text-gray-400 mt-1" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Schedule Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{formatDaysOfWeek(turma.diasSemana)}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{turma.horario}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>{turma.numeroAlunos} alunos</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progresso do semestre</span>
                  <span className="font-medium">{turma.progresso}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(turma.progresso)}`}
                    style={{ width: `${turma.progresso}%` }}
                  ></div>
                </div>
              </div>

              {/* Next Class */}
              {turma.proximaAula && (
                <div className="pt-2 border-t">
                  <div className="text-sm text-gray-600">
                    Próxima aula: {' '}
                    <span className={`font-medium ${isToday(turma.proximaAula) ? 'text-green-600' : 'text-gray-900'}`}>
                      {isToday(turma.proximaAula) ? 'Hoje' : new Date(turma.proximaAula).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {turma.status === 'Ativa' && (
                <Button 
                  className="w-full mt-4" 
                  onClick={(e) => {
                    e.stopPropagation()
                    handleTurmaClick(turma)
                  }}
                >
                  <BookOpen size={16} className="mr-2" />
                  Lançar Frequência
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTurmas.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-gray-500">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma turma encontrada</h3>
              <p>Não há turmas para os filtros selecionados.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ProfessorDashboard

