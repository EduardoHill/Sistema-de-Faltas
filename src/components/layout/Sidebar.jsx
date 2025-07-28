import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  FileText, 
  Upload, 
  Lock, 
  Bell, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Sidebar = ({ userRole, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const menuItems = {
    admin: [
      { icon: Building2, label: 'Departamentos', path: '/admin/departments' },
      { icon: Upload, label: 'Upload em Lote', path: '/admin/batch-upload' },
      { icon: BookOpen, label: 'Cursos', path: '/department/courses' },
      { icon: Lock, label: 'Fechamento', path: '/department/grade-closure' },
    ],
    department_head: [
      { icon: BookOpen, label: 'Cursos e Disciplinas', path: '/department/courses' },
      { icon: Lock, label: 'Fechamento de Pauta', path: '/department/grade-closure' },
    ],
    professor: [
      { icon: Users, label: 'Minhas Turmas', path: '/professor/dashboard' },
      { icon: ClipboardCheck, label: 'Lançar Faltas', path: '/professor/attendance' },
      { icon: FileText, label: 'Justificativas', path: '/professor/justifications' },
    ],
    student: [
      { icon: ClipboardCheck, label: 'Minha Frequência', path: '/student/dashboard' },
    ]
  }

  const commonItems = [
    { icon: Bell, label: 'Notificações', path: '/notifications' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
  ]

  const currentMenuItems = menuItems[userRole] || []

  const isActive = (path) => location.pathname === path

  return (
    <div className={`bg-primary text-primary-foreground transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-primary-foreground/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <GraduationCap size={24} />
              <span className="font-semibold text-sm">Sistema Presença</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {/* Role-specific menu items */}
        {currentMenuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          )
        })}

        {/* Separator */}
        {currentMenuItems.length > 0 && (
          <div className="border-t border-primary-foreground/20 my-4" />
        )}

        {/* Common menu items */}
        {commonItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-primary-foreground/20">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="ml-3 text-sm">Sair</span>}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar

