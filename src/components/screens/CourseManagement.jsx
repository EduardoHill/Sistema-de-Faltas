import { useState } from 'react'
import { Plus, Search, Edit, BookOpen, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

const CourseManagement = () => {
  const [cursos, setCursos] = useState([
    { id: 1, nome: 'Ciência da Computação', codigo: 'CC', duracao: '4 anos' },
    { id: 2, nome: 'Engenharia de Software', codigo: 'ES', duracao: '4 anos' },
    { id: 3, nome: 'Sistemas de Informação', codigo: 'SI', duracao: '4 anos' },
  ])

  const [disciplinas, setDisciplinas] = useState([
    { id: 1, nome: 'Algoritmos e Estruturas de Dados', codigo: 'AED001', cargaHoraria: 80, cursoId: 1 },
    { id: 2, nome: 'Banco de Dados', codigo: 'BD001', cargaHoraria: 60, cursoId: 1 },
    { id: 3, nome: 'Engenharia de Software', codigo: 'ES001', cargaHoraria: 80, cursoId: 1 },
    { id: 4, nome: 'Redes de Computadores', codigo: 'RC001', cargaHoraria: 60, cursoId: 1 },
    { id: 5, nome: 'Programação Web', codigo: 'PW001', cargaHoraria: 80, cursoId: 2 },
    { id: 6, nome: 'Arquitetura de Software', codigo: 'AS001', cargaHoraria: 60, cursoId: 2 },
  ])

  const [selectedCurso, setSelectedCurso] = useState(cursos[0])
  const [searchCurso, setSearchCurso] = useState('')
  const [searchDisciplina, setSearchDisciplina] = useState('')
  const [cursoModalOpen, setCursoModalOpen] = useState(false)
  const [disciplinaModalOpen, setDisciplinaModalOpen] = useState(false)
  const [editingCurso, setEditingCurso] = useState(null)
  const [editingDisciplina, setEditingDisciplina] = useState(null)
  const [cursoForm, setCursoForm] = useState({ nome: '', codigo: '', duracao: '' })
  const [disciplinaForm, setDisciplinaForm] = useState({ nome: '', codigo: '', cargaHoraria: '' })
  const [errors, setErrors] = useState({})

  const filteredCursos = cursos.filter(curso =>
    curso.nome.toLowerCase().includes(searchCurso.toLowerCase()) ||
    curso.codigo.toLowerCase().includes(searchCurso.toLowerCase())
  )

  const filteredDisciplinas = disciplinas.filter(disciplina =>
    disciplina.cursoId === selectedCurso.id &&
    (disciplina.nome.toLowerCase().includes(searchDisciplina.toLowerCase()) ||
     disciplina.codigo.toLowerCase().includes(searchDisciplina.toLowerCase()))
  )

  const handleCursoSelect = (curso) => {
    setSelectedCurso(curso)
    setSearchDisciplina('')
  }

  const handleOpenCursoModal = (curso = null) => {
    setEditingCurso(curso)
    setCursoForm(curso ? { 
      nome: curso.nome, 
      codigo: curso.codigo, 
      duracao: curso.duracao 
    } : { nome: '', codigo: '', duracao: '' })
    setErrors({})
    setCursoModalOpen(true)
  }

  const handleOpenDisciplinaModal = (disciplina = null) => {
    setEditingDisciplina(disciplina)
    setDisciplinaForm(disciplina ? {
      nome: disciplina.nome,
      codigo: disciplina.codigo,
      cargaHoraria: disciplina.cargaHoraria.toString()
    } : { nome: '', codigo: '', cargaHoraria: '' })
    setErrors({})
    setDisciplinaModalOpen(true)
  }

  const validateCursoForm = () => {
    const newErrors = {}
    if (!cursoForm.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!cursoForm.codigo.trim()) newErrors.codigo = 'Código é obrigatório'
    if (!cursoForm.duracao.trim()) newErrors.duracao = 'Duração é obrigatória'
    
    const isDuplicate = cursos.some(curso => 
      curso.codigo.toLowerCase() === cursoForm.codigo.toLowerCase() && 
      curso.id !== editingCurso?.id
    )
    if (isDuplicate) newErrors.codigo = 'Código já existe'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateDisciplinaForm = () => {
    const newErrors = {}
    if (!disciplinaForm.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!disciplinaForm.codigo.trim()) newErrors.codigo = 'Código é obrigatório'
    if (!disciplinaForm.cargaHoraria.trim()) newErrors.cargaHoraria = 'Carga horária é obrigatória'
    if (disciplinaForm.cargaHoraria && isNaN(disciplinaForm.cargaHoraria)) {
      newErrors.cargaHoraria = 'Carga horária deve ser um número'
    }
    
    const isDuplicate = disciplinas.some(disciplina => 
      disciplina.codigo.toLowerCase() === disciplinaForm.codigo.toLowerCase() && 
      disciplina.id !== editingDisciplina?.id
    )
    if (isDuplicate) newErrors.codigo = 'Código já existe'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCursoSubmit = (e) => {
    e.preventDefault()
    if (!validateCursoForm()) return

    if (editingCurso) {
      setCursos(cursos.map(curso =>
        curso.id === editingCurso.id
          ? { ...curso, ...cursoForm, codigo: cursoForm.codigo.toUpperCase() }
          : curso
      ))
    } else {
      const newCurso = {
        id: Math.max(...cursos.map(c => c.id)) + 1,
        ...cursoForm,
        codigo: cursoForm.codigo.toUpperCase()
      }
      setCursos([...cursos, newCurso])
    }
    
    setCursoModalOpen(false)
  }

  const handleDisciplinaSubmit = (e) => {
    e.preventDefault()
    if (!validateDisciplinaForm()) return

    if (editingDisciplina) {
      setDisciplinas(disciplinas.map(disciplina =>
        disciplina.id === editingDisciplina.id
          ? { 
              ...disciplina, 
              nome: disciplinaForm.nome,
              codigo: disciplinaForm.codigo.toUpperCase(),
              cargaHoraria: parseInt(disciplinaForm.cargaHoraria)
            }
          : disciplina
      ))
    } else {
      const newDisciplina = {
        id: Math.max(...disciplinas.map(d => d.id)) + 1,
        nome: disciplinaForm.nome,
        codigo: disciplinaForm.codigo.toUpperCase(),
        cargaHoraria: parseInt(disciplinaForm.cargaHoraria),
        cursoId: selectedCurso.id
      }
      setDisciplinas([...disciplinas, newDisciplina])
    }
    
    setDisciplinaModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Cursos e Disciplinas</h1>
        <p className="text-gray-600 mt-1">Administre os cursos e suas respectivas disciplinas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Cursos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap size={20} />
              <span>Cursos</span>
            </CardTitle>
            
            <Dialog open={cursoModalOpen} onOpenChange={setCursoModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenCursoModal()} size="sm">
                  <Plus size={16} className="mr-1" />
                  Novo Curso
                </Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCurso ? 'Editar Curso' : 'Novo Curso'}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleCursoSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="curso-nome">Nome do Curso</Label>
                    <Input
                      id="curso-nome"
                      value={cursoForm.nome}
                      onChange={(e) => setCursoForm({ ...cursoForm, nome: e.target.value })}
                      placeholder="Ex: Ciência da Computação"
                    />
                    {errors.nome && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.nome}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="curso-codigo">Código</Label>
                    <Input
                      id="curso-codigo"
                      value={cursoForm.codigo}
                      onChange={(e) => setCursoForm({ ...cursoForm, codigo: e.target.value.toUpperCase() })}
                      placeholder="Ex: CC"
                      maxLength={5}
                    />
                    {errors.codigo && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.codigo}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="curso-duracao">Duração</Label>
                    <Input
                      id="curso-duracao"
                      value={cursoForm.duracao}
                      onChange={(e) => setCursoForm({ ...cursoForm, duracao: e.target.value })}
                      placeholder="Ex: 4 anos"
                    />
                    {errors.duracao && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.duracao}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingCurso ? 'Salvar' : 'Cadastrar'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setCursoModalOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Buscar cursos..."
                value={searchCurso}
                onChange={(e) => setSearchCurso(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCursos.map((curso) => (
                <div
                  key={curso.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedCurso.id === curso.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleCursoSelect(curso)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{curso.nome}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{curso.codigo}</Badge>
                        <span className="text-sm text-gray-500">{curso.duracao}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenCursoModal(curso)
                      }}
                    >
                      <Edit size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Disciplinas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen size={20} />
              <span>Disciplinas - {selectedCurso.nome}</span>
            </CardTitle>
            
            <Dialog open={disciplinaModalOpen} onOpenChange={setDisciplinaModalOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDisciplinaModal()} size="sm">
                  <Plus size={16} className="mr-1" />
                  Nova Disciplina
                </Button>
              </DialogTrigger>
              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingDisciplina ? 'Editar Disciplina' : 'Nova Disciplina'}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleDisciplinaSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="disciplina-nome">Nome da Disciplina</Label>
                    <Input
                      id="disciplina-nome"
                      value={disciplinaForm.nome}
                      onChange={(e) => setDisciplinaForm({ ...disciplinaForm, nome: e.target.value })}
                      placeholder="Ex: Algoritmos e Estruturas de Dados"
                    />
                    {errors.nome && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.nome}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="disciplina-codigo">Código</Label>
                    <Input
                      id="disciplina-codigo"
                      value={disciplinaForm.codigo}
                      onChange={(e) => setDisciplinaForm({ ...disciplinaForm, codigo: e.target.value.toUpperCase() })}
                      placeholder="Ex: AED001"
                      maxLength={10}
                    />
                    {errors.codigo && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.codigo}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="disciplina-carga">Carga Horária</Label>
                    <Input
                      id="disciplina-carga"
                      type="number"
                      value={disciplinaForm.cargaHoraria}
                      onChange={(e) => setDisciplinaForm({ ...disciplinaForm, cargaHoraria: e.target.value })}
                      placeholder="Ex: 80"
                      min="1"
                    />
                    {errors.cargaHoraria && (
                      <Alert variant="destructive">
                        <AlertDescription>{errors.cargaHoraria}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingDisciplina ? 'Salvar' : 'Cadastrar'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setDisciplinaModalOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Buscar disciplinas..."
                value={searchDisciplina}
                onChange={(e) => setSearchDisciplina(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Código</TableHead>
                  <TableHead>C.H.</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDisciplinas.map((disciplina) => (
                  <TableRow key={disciplina.id}>
                    <TableCell className="font-medium">{disciplina.nome}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{disciplina.codigo}</Badge>
                    </TableCell>
                    <TableCell>{disciplina.cargaHoraria}h</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDisciplinaModal(disciplina)}
                      >
                        <Edit size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredDisciplinas.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Nenhuma disciplina encontrada
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CourseManagement

