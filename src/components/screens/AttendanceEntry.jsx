import { useState, useMemo, useCallback } from 'react'
import { CheckCircle, XCircle, Save, RotateCcw } from 'lucide-react'

// UI Components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { Checkbox } from '../ui/checkbox'

// Data and utilities
import { mockTurmas, mockStudents } from '../../data/mockData'
import { ATTENDANCE_STATUS } from '../../constants'
import {
  getInitials,
  getFrequencyColor,
  getFrequencyBadgeVariant,
  formatDateToInput,
  formatDateToBR,
} from '../../utils/helpers'
import { useNotification } from '../../hooks/useNotification'

const AttendanceEntry = () => {
  const { success } = useNotification()
  const [selectedTurma, setSelectedTurma] = useState('1')
  const [selectedDate, setSelectedDate] = useState(formatDateToInput())
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [alunos, setAlunos] = useState(mockStudents)

  const handleStatusChange = useCallback((alunoId, newStatus) => {
    setAlunos((prev) =>
      prev.map((aluno) =>
        aluno.id === alunoId ? { ...aluno, status: newStatus } : aluno
      )
    )
  }, [])

  const handleMarkAllPresent = useCallback(() => {
    setAlunos((prev) =>
      prev.map((aluno) => ({ ...aluno, status: ATTENDANCE_STATUS.PRESENT }))
    )
  }, [])

  const handleUnmarkAll = useCallback(() => {
    setAlunos((prev) =>
      prev.map((aluno) => ({ ...aluno, status: ATTENDANCE_STATUS.PRESENT }))
    )
  }, [])

  const handleSave = useCallback(async () => {
    setIsSaving(true)

    // Simulate save process
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      success('Frequência salva com sucesso!')
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1500)
  }, [success])

  // Memoized calculations
  const presentCount = useMemo(
    () => alunos.filter((a) => a.status === ATTENDANCE_STATUS.PRESENT).length,
    [alunos]
  )

  const absentCount = useMemo(
    () => alunos.filter((a) => a.status === ATTENDANCE_STATUS.ABSENT).length,
    [alunos]
  )

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>
          Lançamento de Frequência
        </h1>
        <p className='text-gray-600 mt-1'>
          Registre a presença dos alunos na aula de hoje
        </p>
      </div>

      {/* Success Alert */}
      {saveSuccess && (
        <Alert className='border-green-200 bg-green-50'>
          <CheckCircle className='h-4 w-4 text-green-600' />
          <AlertDescription className='text-green-800'>
            Frequência salva com sucesso!
          </AlertDescription>
        </Alert>
      )}

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Ações</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label>Turma</Label>
              <Select value={selectedTurma} onValueChange={setSelectedTurma}>
                <SelectTrigger>
                  <SelectValue placeholder='Selecione a turma' />
                </SelectTrigger>
                <SelectContent>
                  {mockTurmas.map((turma) => (
                    <SelectItem key={turma.id} value={turma.id}>
                      {turma.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label>Data da Aula</Label>
              <input
                type='date'
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              />
            </div>
          </div>

          <div className='flex space-x-2'>
            <Button
              onClick={handleMarkAllPresent}
              variant='outline'
              className='flex items-center space-x-2'
            >
              <CheckCircle size={16} />
              <span>Marcar Todos como Presentes</span>
            </Button>
            <Button
              onClick={handleUnmarkAll}
              variant='outline'
              className='flex items-center space-x-2'
            >
              <RotateCcw size={16} />
              <span>Desmarcar Todos</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900'>
                {alunos.length}
              </div>
              <div className='text-sm text-gray-600'>Total de Alunos</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {presentCount}
              </div>
              <div className='text-sm text-gray-600'>Presentes</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-red-600'>
                {absentCount}
              </div>
              <div className='text-sm text-gray-600'>Faltas</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foto</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Matrícula</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunos.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage src={aluno.foto} alt={aluno.nome} />
                      <AvatarFallback className='bg-primary text-primary-foreground'>
                        {getInitials(aluno.nome)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className='font-medium'>{aluno.nome}</TableCell>
                  <TableCell>
                    <Badge variant='outline'>{aluno.matricula}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className='space-y-1'>
                      <div
                        className={`text-sm font-medium ${getFrequencyColor(
                          aluno.percentualFrequencia
                        )}`}
                      >
                        {aluno.percentualFrequencia}%
                      </div>
                      <Badge
                        variant={getFrequencyBadgeVariant(
                          aluno.percentualFrequencia
                        )}
                        className='text-xs'
                      >
                        {aluno.totalFaltas} faltas
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex space-x-4'>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id={`presente-${aluno.id}`}
                          checked={aluno.status === ATTENDANCE_STATUS.PRESENT}
                          onCheckedChange={(checked) =>
                            handleStatusChange(
                              aluno.id,
                              checked
                                ? ATTENDANCE_STATUS.PRESENT
                                : ATTENDANCE_STATUS.ABSENT
                            )
                          }
                        />
                        <Label
                          htmlFor={`presente-${aluno.id}`}
                          className='text-green-600 flex items-center space-x-1'
                        >
                          <CheckCircle size={16} />
                          <span>Presente</span>
                        </Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id={`falta-${aluno.id}`}
                          checked={aluno.status === ATTENDANCE_STATUS.ABSENT}
                          onCheckedChange={(checked) =>
                            handleStatusChange(
                              aluno.id,
                              checked
                                ? ATTENDANCE_STATUS.ABSENT
                                : ATTENDANCE_STATUS.PRESENT
                            )
                          }
                        />
                        <Label
                          htmlFor={`falta-${aluno.id}`}
                          className='text-red-600 flex items-center space-x-1'
                        >
                          <XCircle size={16} />
                          <span>Faltou</span>
                        </Label>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Card>
        <CardContent className='pt-6'>
          <div className='flex justify-between items-center'>
            <div className='text-sm text-gray-600'>
              Data: {formatDateToBR(selectedDate)} | Turma:{' '}
              {mockTurmas.find((t) => t.id === selectedTurma)?.codigo} |
              Presentes: {presentCount} | Faltas: {absentCount}
            </div>

            <Button
              onClick={handleSave}
              disabled={isSaving}
              className='flex items-center space-x-2'
            >
              {isSaving ? (
                <>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Salvar Chamada</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AttendanceEntry
