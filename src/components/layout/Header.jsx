import { Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

const Header = ({ currentUser }) => {
  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrador'
      case 'department_head': return 'Chefe de Departamento'
      case 'professor': return 'Professor'
      case 'student': return 'Aluno'
      default: return 'Usuário'
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page title area - can be dynamic based on current route */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Sistema de Presença Universitário
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Bem-vindo, {currentUser?.name}
          </p>
        </div>

        {/* Right side - notifications and user menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User size={16} className="text-primary-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{currentUser?.name}</div>
                  <div className="text-xs text-gray-500">{getRoleLabel(currentUser?.role)}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notificações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header

