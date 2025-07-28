import { useState } from 'react'
import { FileText, Eye, Check, X, Filter, Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const JustificationReview = () => {
  const [selectedTurma, setSelectedTurma] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('pendente')
  const [previewDialog, setPreviewDialog] = useState({ open: false, justification: null })
  const [actionDialog, setActionDialog] = useState({ open: false, justification: null, action: null })
  const [observacao, setObservacao] = useState('')

  const turmas = [
    { id: '1', nome: 'Algoritmos e Estruturas de Dados - Turma A', codigo: 'AED001-A' },
    { id: '2', nome: 'Banco de Dados - Turma B', codigo: 'BD001-B' },
    { id: '3', nome: 'Engenharia de Software - Turma A', codigo: 'ES001-A' },
  ]

  const [justificativas, setJustificativas] = useState([
    {
      id: 1,
      aluno: 'Ana Silva Santos',
      matricula: '2021001',
      turma: '1',
      data: '2024-07-25',
      motivo: 'Consulta médica',
      arquivo: 'atestado_medico.pdf',
      tipoArquivo: 'pdf',
      status: 'pendente',
      dataEnvio: '2024-07-26',
      observacao: ''
    },
    {
      id: 2,
      aluno: 'Bruno Costa Lima',
      matricula: '2021002',
      turma: '1',
      data: '2024-07-23',
      motivo: 'Problema familiar',
      arquivo: 'declaracao.jpg',
      tipoArquivo: 'image',
      status: 'pendente',
      dataEnvio: '2024-07-24',
      observacao: ''
    },
    {
      id: 3,
      aluno: 'Carla Oliveira Souza',
      matricula: '2021003',
      turma: '2',
      data: '2024-07-22',
      motivo: 'Exame médico',
      arquivo: 'exame_laboratorio.pdf',
      tipoArquivo: 'pdf',
      status: 'aprovada',
      dataEnvio: '2024-07-23',
      observacao: 'Justificativa válida. Atestado médico em ordem.'
    },
    {
      id: 4,
      aluno: 'Daniel Pereira Alves',
      matricula: '2021004',
      turma: '2',
      data: '2024-07-20',
      motivo: 'Viagem de trabalho',
      arquivo: 'declaracao_empresa.pdf',
      tipoArquivo: 'pdf',
      status: 'rejeitada',
      dataEnvio: '2024-07-21',
      observacao: 'Documento não comprova a necessidade de ausência na data especificada.'
    },
    {
      id: 5,
      aluno: 'Eduarda Martins Rocha',
      matricula: '2021005',
      turma: '3',
      data: '2024-07-26',
      motivo: 'Emergência familiar',
      arquivo: 'declaracao_hospital.jpg',
      tipoArquivo: 'image',
      status: 'pendente',
      dataEnvio: '2024-07-27',
      observacao: ''
    }
  ])

  const filteredJustificativas = justificativas.filter(just => {
    const turmaMatch = selectedTurma === 'all' || just.turma === selectedTurma
    const statusMatch = selectedStatus === 'all' || just.status === selectedStatus
    return turmaMatch && statusMatch
  })

  const handlePreview = (justification) => {
    setPreviewDialog({ open: true, justification })
  }

  const handleAction = (justification, action) => {
    setActionDialog({ open: true, justification, action })
    setObservacao(justification.observacao || '')
  }

  const confirmAction = () => {
    const { justification, action } = actionDialog
    
    setJustificativas(justificativas.map(just =>
      just.id === justification.id
        ? { ...just, status: action, observacao }
        : just
    ))
    
    setActionDialog({ open: false, justification: null, action: null })
    setObservacao('')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'secondary'
      case 'aprovada': return 'default'
      case 'rejeitada': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pendente': return 'Pendente'
      case 'aprovada': return 'Aprovada'
      case 'rejeitada': return 'Rejeitada'
      default: return status
    }
  }

  const getInitials = (nome) => {
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const getTurmaName = (turmaId) => {
    const turma = turmas.find(t => t.id === turmaId)
    return turma ? turma.codigo : 'N/A'
  }

  const downloadFile = (justification) => {
    // Simulate file download
    alert(`Baixando arquivo: ${justification.arquivo}`)
  }

  const pendingCount = justificativas.filter(j => j.status === 'pendente').length
  const approvedCount = justificativas.filter(j => j.status === 'aprovada').length
  const rejectedCount = justificativas.filter(j => j.status === 'rejeitada').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Justificativas Pendentes</h1>
        <p className="text-gray-600 mt-1">Revise e aprove ou rejeite as justificativas de faltas dos alunos</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{justificativas.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pendentes</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-gray-600">Aprovadas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <div className="text-sm text-gray-600">Rejeitadas</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <Select value={selectedTurma} onValueChange={setSelectedTurma}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Filtrar por turma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as turmas</SelectItem>
                  {turmas.map(turma => (
                    <SelectItem key={turma.id} value={turma.id}>{turma.nome}</SelectItem>
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
                  <SelectItem value="pendente">Pendentes</SelectItem>
                  <SelectItem value="aprovada">Aprovadas</SelectItem>
                  <SelectItem value="rejeitada">Rejeitadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Justifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Justificativas ({filteredJustificativas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead>Data da Falta</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Arquivo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJustificativas.map((justification) => (
                <TableRow key={justification.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {getInitials(justification.aluno)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{justification.aluno}</div>
                        <div className="text-sm text-gray-500">{justification.matricula}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getTurmaName(justification.turma)}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(justification.data).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{justification.motivo}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadFile(justification)}
                      className="flex items-center space-x-1"
                    >
                      <FileText size={14} />
                      <span className="truncate max-w-20">{justification.arquivo}</span>
                      <Download size={12} />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(justification.status)}>
                      {getStatusLabel(justification.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(justification)}
                      >
                        <Eye size={14} />
                      </Button>
                      {justification.status === 'pendente' && (
                        <>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleAction(justification, 'aprovada')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check size={14} />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleAction(justification, 'rejeitada')}
                          >
                            <X size={14} />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredJustificativas.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma justificativa encontrada</h3>
              <p>Não há justificativas para os filtros selecionados.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={previewDialog.open} onOpenChange={(open) => 
        setPreviewDialog({ ...previewDialog, open })
      }>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Justificativa</DialogTitle>
          </DialogHeader>
          
          {previewDialog.justification && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Aluno</Label>
                  <p className="text-sm">{previewDialog.justification.aluno}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Matrícula</Label>
                  <p className="text-sm">{previewDialog.justification.matricula}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Data da Falta</Label>
                  <p className="text-sm">{new Date(previewDialog.justification.data).toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Data do Envio</Label>
                  <p className="text-sm">{new Date(previewDialog.justification.dataEnvio).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Motivo</Label>
                <p className="text-sm mt-1">{previewDialog.justification.motivo}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-500">Arquivo Anexado</Label>
                <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText size={20} />
                      <span className="text-sm">{previewDialog.justification.arquivo}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadFile(previewDialog.justification)}
                    >
                      <Download size={14} className="mr-1" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </div>
              
              {previewDialog.justification.observacao && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Observação do Professor</Label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded">{previewDialog.justification.observacao}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open) => 
        setActionDialog({ ...actionDialog, open })
      }>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionDialog.action === 'aprovada' ? 'Aprovar Justificativa' : 'Rejeitar Justificativa'}
            </DialogTitle>
          </DialogHeader>
          
          {actionDialog.justification && (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Você está prestes a <strong>{actionDialog.action === 'aprovada' ? 'aprovar' : 'rejeitar'}</strong> a 
                  justificativa de <strong>{actionDialog.justification.aluno}</strong> para a falta do dia{' '}
                  <strong>{new Date(actionDialog.justification.data).toLocaleDateString('pt-BR')}</strong>.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="observacao">Observação {actionDialog.action === 'rejeitada' ? '(obrigatória)' : '(opcional)'}</Label>
                <Textarea
                  id="observacao"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  placeholder={
                    actionDialog.action === 'aprovada' 
                      ? 'Adicione uma observação sobre a aprovação...'
                      : 'Explique o motivo da rejeição...'
                  }
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={confirmAction}
                  disabled={actionDialog.action === 'rejeitada' && !observacao.trim()}
                  className={actionDialog.action === 'aprovada' ? 'bg-green-600 hover:bg-green-700' : ''}
                  variant={actionDialog.action === 'aprovada' ? 'default' : 'destructive'}
                >
                  {actionDialog.action === 'aprovada' ? 'Aprovar' : 'Rejeitar'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActionDialog({ open: false, justification: null, action: null })}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default JustificationReview

