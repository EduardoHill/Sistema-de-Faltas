import { useState } from 'react'
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  FileText,
  Lock,
  Users,
  Filter,
  Check,
  Trash2,
  Settings,
} from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'

const Notifications = () => {
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedNotifications, setSelectedNotifications] = useState([])

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'justificativa',
      title: 'Nova justificativa recebida',
      message:
        'Ana Silva Santos enviou uma justificativa de falta para a disciplina Algoritmos e Estruturas de Dados.',
      timestamp: '2024-07-28T10:30:00',
      read: false,
      priority: 'normal',
    },
    {
      id: 2,
      type: 'pauta',
      title: 'Pauta fechada',
      message:
        'A pauta da disciplina Banco de Dados - Turma B foi fechada. Não é mais possível editar as frequências.',
      timestamp: '2024-07-28T09:15:00',
      read: false,
      priority: 'high',
    },
    {
      id: 3,
      type: 'falta',
      title: 'Falta registrada',
      message:
        'Sua falta foi registrada na disciplina Engenharia de Software do dia 26/07/2024.',
      timestamp: '2024-07-27T14:20:00',
      read: true,
      priority: 'normal',
    },
    {
      id: 4,
      type: 'justificativa',
      title: 'Justificativa aprovada',
      message:
        'Sua justificativa de falta para a disciplina Redes de Computadores foi aprovada pelo professor.',
      timestamp: '2024-07-27T11:45:00',
      read: true,
      priority: 'normal',
    },
    {
      id: 5,
      type: 'sistema',
      title: 'Manutenção programada',
      message:
        'O sistema passará por manutenção no dia 30/07/2024 das 02:00 às 06:00.',
      timestamp: '2024-07-26T16:00:00',
      read: false,
      priority: 'low',
    },
    {
      id: 6,
      type: 'justificativa',
      title: 'Justificativa rejeitada',
      message:
        'Sua justificativa de falta para a disciplina Programação Web foi rejeitada. Motivo: Documento insuficiente.',
      timestamp: '2024-07-26T13:30:00',
      read: true,
      priority: 'high',
    },
    {
      id: 7,
      type: 'frequencia',
      title: 'Frequência baixa',
      message:
        'Atenção: Sua frequência na disciplina Banco de Dados está abaixo de 75%. Frequência atual: 70%.',
      timestamp: '2024-07-25T08:00:00',
      read: false,
      priority: 'high',
    },
    {
      id: 8,
      type: 'turma',
      title: 'Nova turma atribuída',
      message:
        'Você foi atribuído à turma de Inteligência Artificial - Turma C para o período 2024.2.',
      timestamp: '2024-07-24T15:20:00',
      read: true,
      priority: 'normal',
    },
  ])

  const notificationTypes = [
    { value: 'all', label: 'Todos os tipos' },
    { value: 'justificativa', label: 'Justificativas' },
    { value: 'pauta', label: 'Pautas' },
    { value: 'falta', label: 'Faltas' },
    { value: 'frequencia', label: 'Frequência' },
    { value: 'turma', label: 'Turmas' },
    { value: 'sistema', label: 'Sistema' },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    const typeMatch =
      selectedType === 'all' || notification.type === selectedType
    const statusMatch =
      selectedStatus === 'all' ||
      (selectedStatus === 'unread' && !notification.read) ||
      (selectedStatus === 'read' && notification.read)
    return typeMatch && statusMatch
  })

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'justificativa':
        return <FileText size={20} className='text-blue-600' />
      case 'pauta':
        return <Lock size={20} className='text-red-600' />
      case 'falta':
        return <AlertTriangle size={20} className='text-orange-600' />
      case 'frequencia':
        return <AlertTriangle size={20} className='text-red-600' />
      case 'turma':
        return <Users size={20} className='text-green-600' />
      case 'sistema':
        return <Settings size={20} className='text-gray-600' />
      default:
        return <Bell size={20} className='text-gray-600' />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'destructive'
      case 'normal':
        return 'default'
      case 'low':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'Alta'
      case 'normal':
        return 'Normal'
      case 'low':
        return 'Baixa'
      default:
        return priority
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      return `${diffInMinutes} min atrás`
    } else if (diffInHours < 24) {
      return `${diffInHours}h atrás`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`
    }
  }

  const handleSelectNotification = (notificationId, checked) => {
    if (checked) {
      setSelectedNotifications([...selectedNotifications, notificationId])
    } else {
      setSelectedNotifications(
        selectedNotifications.filter((id) => id !== notificationId)
      )
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    } else {
      setSelectedNotifications([])
    }
  }

  const handleMarkAsRead = (notificationIds) => {
    setNotifications(
      notifications.map((notification) =>
        notificationIds.includes(notification.id)
          ? { ...notification, read: true }
          : notification
      )
    )
    setSelectedNotifications([])
  }

  const handleDelete = (notificationIds) => {
    setNotifications(
      notifications.filter((n) => !notificationIds.includes(n.id))
    )
    setSelectedNotifications([])
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const totalCount = notifications.length

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900'>Notificações</h1>
          <p className='text-gray-600 mt-1'>
            Acompanhe todas as atualizações do sistema
          </p>
        </div>

        <div className='flex items-center space-x-2'>
          <Badge variant='outline' className='flex items-center space-x-1'>
            <Bell size={14} />
            <span>{unreadCount} não lidas</span>
          </Badge>
        </div>
      </div>

      {/* Statistics */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-gray-900'>
                {totalCount}
              </div>
              <div className='text-sm text-gray-600'>Total</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-orange-600'>
                {unreadCount}
              </div>
              <div className='text-sm text-gray-600'>Não Lidas</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-green-600'>
                {totalCount - unreadCount}
              </div>
              <div className='text-sm text-gray-600'>Lidas</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='pt-6'>
            <div className='text-center'>
              <div className='text-2xl font-bold text-red-600'>
                {
                  notifications.filter((n) => n.priority === 'high' && !n.read)
                    .length
                }
              </div>
              <div className='text-sm text-gray-600'>Alta Prioridade</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardContent className='pt-6'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0'>
            <div className='flex space-x-4'>
              <div className='flex items-center space-x-2'>
                <Filter size={16} className='text-gray-500' />
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className='w-48'>
                    <SelectValue placeholder='Filtrar por tipo' />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className='w-40'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Todas</SelectItem>
                  <SelectItem value='unread'>Não lidas</SelectItem>
                  <SelectItem value='read'>Lidas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedNotifications.length > 0 && (
              <div className='flex space-x-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handleMarkAsRead(selectedNotifications)}
                  className='flex items-center space-x-1'
                >
                  <CheckCircle size={14} />
                  <span>Marcar como Lida</span>
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => handleDelete(selectedNotifications)}
                  className='flex items-center space-x-1'
                >
                  <Trash2 size={14} />
                  <span>Excluir</span>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Notificações ({filteredNotifications.length})</CardTitle>

            {filteredNotifications.length > 0 && (
              <div className='flex items-center space-x-2'>
                <Checkbox
                  checked={
                    selectedNotifications.length ===
                    filteredNotifications.length
                  }
                  onCheckedChange={handleSelectAll}
                />
                <span className='text-sm text-gray-600'>Selecionar todas</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <div className='space-y-4'>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read
                    ? 'border-gray-200 bg-white'
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className='flex items-start space-x-3'>
                  <Checkbox
                    checked={selectedNotifications.includes(notification.id)}
                    onCheckedChange={(checked) =>
                      handleSelectNotification(notification.id, checked)
                    }
                  />

                  <div className='flex-shrink-0 mt-1'>
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3
                          className={`text-sm font-medium ${
                            notification.read
                              ? 'text-gray-900'
                              : 'text-gray-900 font-semibold'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <p className='text-sm text-gray-600 mt-1'>
                          {notification.message}
                        </p>
                        <div className='flex items-center space-x-2 mt-2'>
                          <span className='text-xs text-gray-500'>
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <Badge
                            variant={getPriorityColor(notification.priority)}
                            className='text-xs'
                          >
                            {getPriorityLabel(notification.priority)}
                          </Badge>
                          {!notification.read && (
                            <Badge variant='default' className='text-xs'>
                              Nova
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className='flex items-center space-x-1 ml-4'>
                        {!notification.read && (
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => handleMarkAsRead([notification.id])}
                            className='text-xs'
                          >
                            <CheckCircle size={14} />
                          </Button>
                        )}
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDelete([notification.id])}
                          className='text-xs text-red-600 hover:text-red-700'
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className='text-center py-8 text-gray-500'>
              <Bell size={48} className='mx-auto mb-4 text-gray-300' />
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                Nenhuma notificação encontrada
              </h3>
              <p>Não há notificações para os filtros selecionados.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {unreadCount > 0 && (
        <Card>
          <CardContent className='pt-6'>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-gray-600'>
                Você tem {unreadCount} notificação{unreadCount > 1 ? 'ões' : ''}{' '}
                não lida{unreadCount > 1 ? 's' : ''}
              </div>

              <Button
                onClick={() =>
                  handleMarkAsRead(
                    notifications.filter((n) => !n.read).map((n) => n.id)
                  )
                }
                className='flex items-center space-x-2'
              >
                <Check size={16} />
                <span>Marcar Todas como Lidas</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Notifications
