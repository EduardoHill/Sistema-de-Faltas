import { useState } from 'react'
import { BookOpen, Upload, AlertTriangle, CheckCircle, Calendar, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'

const StudentDashboard = () => {
  const [uploadDialog, setUploadDialog] = useState({ open: false, disciplina: null })
  const [motivo, setMotivo] = useState('')
  const [arquivo, setArquivo] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const disciplinas = [
    {
      id: 1,
      nome: 'Algoritmos e Estruturas de Dados',
      codigo: 'AED001',
      turma: 'A',
      professor: 'Prof. João Silva',
      totalAulas: 60,
      aulasAssistidas: 55,
      faltas: 5,
      frequencia: 91.7,
      status: 'aprovado',
      proximaAula: '2024-07-29'
    },
    {
      id: 2,
      nome: 'Banco de Dados',
      codigo: 'BD001',
      turma: 'B',
      professor: 'Prof. Maria Santos',
      totalAulas: 50,
      aulasAssistidas: 35,
      faltas: 15,
      frequencia: 70.0,
      status: 'atencao',
      proximaAula: '2024-07-30'
    },
    {
      id: 3,
      nome: 'Engenharia de Software',
      codigo: 'ES001',
      turma: 'A',
      professor: 'Prof. Carlos Lima',
      totalAulas: 80,
      aulasAssistidas: 75,
      faltas: 5,
      frequencia: 93.8,
      status: 'aprovado',
      proximaAula: '2024-07-29'
    },
    {
      id: 4,
      nome: 'Redes de Computadores',
      codigo: 'RC001',
      turma: 'C',
      professor: 'Prof. Ana Costa',
      totalAulas: 60,
      aulasAssistidas: 40,
      faltas: 20,
      frequencia: 66.7,
      status: 'reprovado',
      proximaAula: '2024-07-30'
    },
    {
      id: 5,
      nome: 'Programação Web',
      codigo: 'PW001',
      turma: 'B',
      professor: 'Prof. Pedro Oliveira',
      totalAulas: 70,
      aulasAssistidas: 65,
      faltas: 5,
      frequencia: 92.9,
      status: 'aprovado',
      proximaAula: '2024-07-31'
    }
  ]

  const handleJustificarFalta = (disciplina) => {
    setUploadDialog({ open: true, disciplina })
    setMotivo('')
    setArquivo(null)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(file.type)) {
        alert('Tipo de arquivo não suportado. Use apenas PDF, JPG ou PNG.')
        return
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('Arquivo muito grande. Tamanho máximo: 5MB.')
        return
      }
      setArquivo(file)
    }
  }

  const handleSubmitJustification = async () => {
    if (!motivo.trim()) {
      alert('Por favor, descreva o motivo da falta.')
      return
    }
    if (!arquivo) {
      alert('Por favor, anexe um arquivo comprobatório.')
      return
    }

    setIsUploading(true)
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      setUploadDialog({ open: false, disciplina: null })
      alert('Justificativa enviada com sucesso! Aguarde a análise do professor.')
    }, 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'aprovado': return 'default'
      case 'atencao': return 'secondary'
      case 'reprovado': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'aprovado': return 'Aprovado'
      case 'atencao': return 'Atenção'
      case 'reprovado': return 'Reprovado'
      default: return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'aprovado': return <CheckCircle size={16} className="text-green-600" />
      case 'atencao': return <AlertTriangle size={16} className="text-yellow-600" />
      case 'reprovado': return <AlertTriangle size={16} className="text-red-600" />
      default: return null
    }
  }

  const getProgressColor = (frequencia) => {
    if (frequencia >= 75) return 'bg-green-500'
    if (frequencia >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const isToday = (dateString) => {
    if (!dateString) return false
    const today = new Date().toISOString().split('T')[0]
    return dateString === today
  }

  const totalDisciplinas = disciplinas.length
  const aprovadas = disciplinas.filter(d => d.status === 'aprovado').length
  const emAtencao = disciplinas.filter(d => d.status === 'atencao').length
  const reprovadas = disciplinas.filter(d => d.status === 'reprovado').length
  const frequenciaGeral = disciplinas.reduce((acc, d) => acc + d.frequencia, 0) / totalDisciplinas

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Minha Frequência</h1>
        <p className="text-gray-600 mt-1">Acompanhe sua frequência em todas as disciplinas</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalDisciplinas}</div>
              <div className="text-sm text-gray-600">Disciplinas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{aprovadas}</div>
              <div className="text-sm text-gray-600">Aprovadas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{emAtencao}</div>
              <div className="text-sm text-gray-600">Atenção</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{reprovadas}</div>
              <div className="text-sm text-gray-600">Reprovadas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{frequenciaGeral.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Freq. Geral</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert for low attendance */}
      {reprovadas > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Atenção!</strong> Você está reprovado por falta em {reprovadas} disciplina(s). 
            Frequência mínima exigida: 75%.
          </AlertDescription>
        </Alert>
      )}

      {/* Disciplines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {disciplinas.map((disciplina) => (
          <Card key={disciplina.id} className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{disciplina.nome}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{disciplina.codigo}</Badge>
                    <Badge variant="outline">Turma {disciplina.turma}</Badge>
                    <Badge variant={getStatusColor(disciplina.status)} className="flex items-center space-x-1">
                      {getStatusIcon(disciplina.status)}
                      <span>{getStatusLabel(disciplina.status)}</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Professor */}
              <div className="text-sm text-gray-600">
                {disciplina.professor}
              </div>

              {/* Attendance Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{disciplina.totalAulas}</div>
                  <div className="text-xs text-gray-600">Total</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{disciplina.aulasAssistidas}</div>
                  <div className="text-xs text-gray-600">Presentes</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">{disciplina.faltas}</div>
                  <div className="text-xs text-gray-600">Faltas</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frequência</span>
                  <span className={`font-medium ${
                    disciplina.frequencia >= 75 ? 'text-green-600' : 
                    disciplina.frequencia >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {disciplina.frequencia.toFixed(1)}%
                  </span>
                </div>
                <Progress 
                  value={disciplina.frequencia} 
                  className="h-2"
                />
                <div className="text-xs text-gray-500 text-center">
                  Mínimo exigido: 75%
                </div>
              </div>

              {/* Next Class */}
              {disciplina.proximaAula && (
                <div className="pt-2 border-t">
                  <div className="text-sm text-gray-600 flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>Próxima aula: </span>
                    <span className={`font-medium ${isToday(disciplina.proximaAula) ? 'text-green-600' : 'text-gray-900'}`}>
                      {isToday(disciplina.proximaAula) ? 'Hoje' : new Date(disciplina.proximaAula).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <Dialog open={uploadDialog.open && uploadDialog.disciplina?.id === disciplina.id} 
                      onOpenChange={(open) => setUploadDialog({ open, disciplina: open ? disciplina : null })}>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => handleJustificarFalta(disciplina)}
                  >
                    <Upload size={16} className="mr-2" />
                    Justificar Falta
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Justificar Falta</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Disciplina</Label>
                      <p className="text-sm">{disciplina.nome}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="motivo">Motivo da Falta *</Label>
                      <Textarea
                        id="motivo"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Descreva o motivo da sua ausência..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="arquivo">Documento Comprobatório *</Label>
                      <input
                        id="arquivo"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <p className="text-xs text-gray-500">
                        Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
                      </p>
                    </div>
                    
                    {arquivo && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Arquivo selecionado: {arquivo.name}
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        onClick={handleSubmitJustification}
                        disabled={isUploading || !motivo.trim() || !arquivo}
                        className="flex-1"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Enviando...
                          </>
                        ) : (
                          'Enviar Justificativa'
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setUploadDialog({ open: false, disciplina: null })}
                        disabled={isUploading}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StudentDashboard

