import { useState } from 'react'
import { Plus, Edit, Power, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    { id: 1, nome: 'Ciência da Computação', codigo: 'CC', status: 'Ativo' },
    { id: 2, nome: 'Engenharia Civil', codigo: 'EC', status: 'Ativo' },
    { id: 3, nome: 'Administração', codigo: 'ADM', status: 'Inativo' },
    { id: 4, nome: 'Direito', codigo: 'DIR', status: 'Ativo' },
    { id: 5, nome: 'Medicina', codigo: 'MED', status: 'Ativo' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState(null)
  const [formData, setFormData] = useState({ nome: '', codigo: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [errors, setErrors] = useState({})

  const filteredDepartments = departments.filter(dept =>
    dept.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (department = null) => {
    setEditingDepartment(department)
    setFormData(department ? { nome: department.nome, codigo: department.codigo } : { nome: '', codigo: '' })
    setErrors({})
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingDepartment(null)
    setFormData({ nome: '', codigo: '' })
    setErrors({})
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!formData.codigo.trim()) newErrors.codigo = 'Código é obrigatório'
    if (formData.codigo.length > 5) newErrors.codigo = 'Código deve ter no máximo 5 caracteres'
    
    // Check for duplicate code
    const isDuplicate = departments.some(dept => 
      dept.codigo.toLowerCase() === formData.codigo.toLowerCase() && 
      dept.id !== editingDepartment?.id
    )
    if (isDuplicate) newErrors.codigo = 'Código já existe'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (editingDepartment) {
      // Edit existing department
      setDepartments(departments.map(dept =>
        dept.id === editingDepartment.id
          ? { ...dept, nome: formData.nome, codigo: formData.codigo.toUpperCase() }
          : dept
      ))
    } else {
      // Add new department
      const newDepartment = {
        id: Math.max(...departments.map(d => d.id)) + 1,
        nome: formData.nome,
        codigo: formData.codigo.toUpperCase(),
        status: 'Ativo'
      }
      setDepartments([...departments, newDepartment])
    }
    
    handleCloseModal()
  }

  const toggleStatus = (id) => {
    setDepartments(departments.map(dept =>
      dept.id === id
        ? { ...dept, status: dept.status === 'Ativo' ? 'Inativo' : 'Ativo' }
        : dept
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departamentos</h1>
          <p className="text-gray-600 mt-1">Gerencie os departamentos da universidade</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenModal()} className="flex items-center space-x-2">
              <Plus size={16} />
              <span>Cadastrar Novo Departamento</span>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingDepartment ? 'Editar Departamento' : 'Novo Departamento'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Departamento</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Ciência da Computação"
                />
                {errors.nome && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.nome}</AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="codigo">Código</Label>
                <Input
                  id="codigo"
                  value={formData.codigo}
                  onChange={(e) => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                  placeholder="Ex: CC"
                  maxLength={5}
                />
                {errors.codigo && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.codigo}</AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingDepartment ? 'Salvar Alterações' : 'Cadastrar'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCloseModal}>
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Departamentos ({filteredDepartments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">{department.nome}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{department.codigo}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={department.status === 'Ativo' ? 'default' : 'secondary'}>
                      {department.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(department)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant={department.status === 'Ativo' ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => toggleStatus(department.id)}
                      >
                        <Power size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredDepartments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Nenhum departamento encontrado
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DepartmentManagement

