import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const BatchUpload = () => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [previewData, setPreviewData] = useState([])
  const [uploadResult, setUploadResult] = useState(null)

  // Mock data for preview
  const mockPreviewData = [
    { nome: 'João Silva', email: 'joao.silva@uni.edu.br', tipo: 'Professor', departamento: 'CC', status: 'Válido' },
    { nome: 'Maria Santos', email: 'maria.santos@uni.edu.br', tipo: 'Aluno', departamento: 'EC', status: 'Válido' },
    { nome: 'Pedro Costa', email: 'pedro.costa@uni.edu.br', tipo: 'Professor', departamento: 'ADM', status: 'Erro: Email duplicado' },
    { nome: 'Ana Oliveira', email: 'ana.oliveira@uni.edu.br', tipo: 'Aluno', departamento: 'DIR', status: 'Válido' },
    { nome: 'Carlos Lima', email: 'carlos.lima@uni.edu.br', tipo: 'Chefe', departamento: 'MED', status: 'Válido' },
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de arquivo não suportado. Use apenas CSV ou XLSX.')
      return
    }

    setUploadedFile(file)
    processFile(file)
  }

  const processFile = (file) => {
    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Simulate file processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setPreviewData(mockPreviewData)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleConfirmImport = () => {
    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Simulate import process
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setUploadResult({
            total: 5,
            success: 4,
            errors: 1,
            message: 'Importação concluída com sucesso!'
          })
          return 100
        }
        return prev + 20
      })
    }, 300)
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setPreviewData([])
    setUploadResult(null)
    setProcessingProgress(0)
  }

  const downloadTemplate = () => {
    // Simulate template download
    alert('Template CSV baixado com sucesso!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sincronizar Usuários</h1>
          <p className="text-gray-600 mt-1">Importe usuários em lote via arquivo CSV ou XLSX</p>
        </div>
        
        <Button variant="outline" onClick={downloadTemplate} className="flex items-center space-x-2">
          <Download size={16} />
          <span>Baixar Template</span>
        </Button>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText size={20} />
            <span>Instruções de Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Formatos aceitos:</strong> CSV (.csv) ou Excel (.xlsx)</p>
            <p><strong>Colunas obrigatórias:</strong> Nome, Email, Tipo (Professor/Aluno/Chefe), Departamento</p>
            <p><strong>Tamanho máximo:</strong> 10MB</p>
            <p><strong>Limite de registros:</strong> 1000 usuários por arquivo</p>
          </div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Certifique-se de que os emails são únicos e os departamentos existem no sistema.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Upload Area */}
      {!uploadedFile && (
        <Card>
          <CardContent className="pt-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Arraste e solte seu arquivo aqui
              </h3>
              <p className="text-gray-600 mb-4">ou</p>
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Selecionar Arquivo
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileInput}
                />
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600">
                {previewData.length === 0 ? 'Processando arquivo...' : 'Importando usuários...'}
              </p>
              <Progress value={processingProgress} className="w-full" />
              <p className="text-sm text-gray-500">{processingProgress}% concluído</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Table */}
      {previewData.length > 0 && !uploadResult && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Prévia dos Dados ({previewData.length} registros)</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={resetUpload}>
                Cancelar
              </Button>
              <Button onClick={handleConfirmImport} disabled={isProcessing}>
                Confirmar Importação
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{user.nome}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.tipo}</Badge>
                    </TableCell>
                    <TableCell>{user.departamento}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Válido' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Upload Result */}
      {uploadResult && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle size={48} className="mx-auto text-green-500" />
              <h3 className="text-lg font-medium text-gray-900">{uploadResult.message}</h3>
              <div className="flex justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{uploadResult.total}</div>
                  <div className="text-gray-600">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{uploadResult.success}</div>
                  <div className="text-gray-600">Sucesso</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{uploadResult.errors}</div>
                  <div className="text-gray-600">Erros</div>
                </div>
              </div>
              <Button onClick={resetUpload} className="mt-4">
                Fazer Nova Importação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default BatchUpload

