import { useState } from 'react'
import { Lock, Unlock, AlertTriangle, Calendar, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const GradeClosure = () => {
  const [turmas, setTurmas] = useState([
    { 
      id: 1, 
      disciplina: 'Algoritmos e Estruturas de Dados', 
      periodo: '2024.1', 
      professor: 'Prof. João Silva',
      status: 'Aberta',
      dataFechamento: null,
      totalAulas: 60,
      aulasLancadas: 45
    },
    { 
      id: 2, 
      disciplina: 'Banco de Dados', 
      periodo: '2024.1', 
      professor: 'Prof. Maria Santos',
      status: 'Fechada',
      dataFechamento: '2024-06-15',
      totalAulas: 60,
      aulasLancadas: 60
    },
    { 
      id: 3, 
      disciplina: 'Engenharia de Software', 
      periodo: '2024.1', 
      professor: 'Prof. Carlos Lima',
      status: 'Aberta',
      dataFechamento: null,
      totalAulas: 80,
      aulasLancadas: 65
    },
    { 
      id: 4, 
      disciplina: 'Redes de Computadores', 
      periodo: '2024.1', 
      professor: 'Prof. Ana Costa',
      status: 'Aberta',
      dataFechamento: null,
      totalAulas: 60,
      aulasLancadas: 60
    },
    { 
      id: 5, 
      disciplina: 'Inteligência Artificial', 
      periodo: '2023.2', 
      professor: 'Prof. Pedro Oliveira',
      status: 'Fechada',
      dataFechamento: '2024-02-20',
      totalAulas: 60,
      aulasLancadas: 60
    },
  ])

  const [selectedPeriod, setSelectedPeriod] = useState('2024.1')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [confirmDialog, setConfirmDialog] = useState({ open: false, turma: null, action: null })

  const periods = [...new Set(turmas.map(t => t.periodo))].sort().reverse()
  
  const filteredTurmas = turmas.filter(turma => {
    const periodMatch = selectedPeriod === 'all' || turma.periodo === selectedPeriod
    const statusMatch = selectedStatus === 'all' || 
      (selectedStatus === 'aberta' && turma.status === 'Aberta') ||
      (selectedStatus === 'fechada' && turma.status === 'Fechada')
    return periodMatch && statusMatch
  })

  const handleCloseTurma = (turma) => {
    setConfirmDialog({ open: true, turma, action: 'close' })
  }

  const handleReopenTurma = (turma) => {
    setConfirmDialog({ open: true, turma, action: 'reopen' })
  }

  const confirmAction = () => {
    const { turma, action } = confirmDialog
    
    setTurmas(turmas.map(t => 
      t.id === turma.id 
        ? { 
            ...t, 
            status: action === 'close' ? 'Fechada' : 'Aberta',
            dataFechamento: action === 'close' ? new Date().toISOString().split('T')[0] : null
          }
        : t
    ))
    
    setConfirmDialog({ open: false, turma: null, action: null })
  }

  const getProgressPercentage = (turma) => {
    return Math.round((turma.aulasLancadas / turma.totalAulas) * 100)
  }

  const canClose = (turma) => {
    return turma.status === 'Aberta' && turma.aulasLancadas === turma.totalAulas
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fechamento de Pauta</h1>
        <p className="text-gray-600 mt-1">Gerencie o fechamento das pautas de frequência</p>
      </div>

      {/* Warning Alert */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Atenção:</strong> Após o fechamento da pauta, não será possível editar as frequências. 
          Esta ação é irreversível e deve ser feita apenas após confirmação de que todos os lançamentos estão corretos.
        </AlertDescription>
      </Alert>

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
                  <SelectItem value="aberta">Abertas</SelectItem>
                  <SelectItem value="fechada">Fechadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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
                {filteredTurmas.filter(t => t.status === 'Fechada').length}
              </div>
              <div className="text-sm text-gray-600">Fechadas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {filteredTurmas.filter(t => t.status === 'Aberta').length}
              </div>
              <div className="text-sm text-gray-600">Abertas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {filteredTurmas.filter(t => canClose(t)).length}
              </div>
              <div className="text-sm text-gray-600">Prontas p/ Fechar</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Turmas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Turmas ({filteredTurmas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Disciplina</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Fechamento</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTurmas.map((turma) => (
                <TableRow key={turma.id}>
                  <TableCell className="font-medium">{turma.disciplina}</TableCell>
                  <TableCell>{turma.professor}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{turma.periodo}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        {turma.aulasLancadas}/{turma.totalAulas} aulas
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            getProgressPercentage(turma) === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${getProgressPercentage(turma)}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={turma.status === 'Fechada' ? 'destructive' : 'default'}>
                      {turma.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {turma.dataFechamento ? 
                      new Date(turma.dataFechamento).toLocaleDateString('pt-BR') : 
                      '-'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    {turma.status === 'Aberta' ? (
                      <Button
                        variant={canClose(turma) ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => handleCloseTurma(turma)}
                        disabled={!canClose(turma)}
                        className="flex items-center space-x-1"
                      >
                        <Lock size={14} />
                        <span>Fechar</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReopenTurma(turma)}
                        className="flex items-center space-x-1"
                      >
                        <Unlock size={14} />
                        <span>Reabrir</span>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredTurmas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhuma turma encontrada para os filtros selecionados
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => 
        setConfirmDialog({ ...confirmDialog, open })
      }>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="text-red-500" size={20} />
              <span>
                {confirmDialog.action === 'close' ? 'Confirmar Fechamento' : 'Confirmar Reabertura'}
              </span>
            </DialogTitle>
            <DialogDescription className="space-y-3">
              {confirmDialog.action === 'close' ? (
                <>
                  <p>
                    Você está prestes a <strong>fechar a pauta</strong> da disciplina{' '}
                    <strong>{confirmDialog.turma?.disciplina}</strong>.
                  </p>
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Esta ação é irreversível!</strong> Após o fechamento, não será possível 
                      editar as frequências desta turma. Certifique-se de que todos os lançamentos 
                      estão corretos antes de prosseguir.
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <p>
                  Você está prestes a <strong>reabrir a pauta</strong> da disciplina{' '}
                  <strong>{confirmDialog.turma?.disciplina}</strong>. 
                  Isso permitirá novamente a edição das frequências.
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex space-x-2 pt-4">
            <Button
              variant={confirmDialog.action === 'close' ? 'destructive' : 'default'}
              onClick={confirmAction}
              className="flex-1"
            >
              {confirmDialog.action === 'close' ? 'Fechar Pauta' : 'Reabrir Pauta'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirmDialog({ open: false, turma: null, action: null })}
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default GradeClosure

