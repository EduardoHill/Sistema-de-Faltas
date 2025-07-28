import { useState } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Save, 
  Eye, 
  EyeOff,
  Smartphone,
  Mail,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Profile settings
  const [profileData, setProfileData] = useState({
    nome: 'João Silva Santos',
    email: 'joao.silva@universidade.edu.br',
    telefone: '(11) 99999-9999',
    bio: 'Professor de Ciência da Computação com 10 anos de experiência.',
    foto: null
  })

  // Security settings
  const [securityData, setSecurityData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
    autenticacaoDoisFatores: true,
    loginEmail: true
  })

  // Notification settings
  const [notificationData, setNotificationData] = useState({
    emailJustificativas: true,
    emailPautas: true,
    emailFrequencia: true,
    pushJustificativas: true,
    pushPautas: false,
    pushFrequencia: true,
    smsUrgente: false
  })

  // Appearance settings
  const [appearanceData, setAppearanceData] = useState({
    tema: 'light',
    idioma: 'pt-BR',
    tamanhoFonte: 'medium',
    compactMode: false
  })

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'appearance', label: 'Aparência', icon: Palette },
  ]

  const handleSave = async (section) => {
    setIsSaving(true)
    
    // Simulate save process
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }, 1500)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData({ ...profileData, foto: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const getInitials = (nome) => {
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Informações Pessoais</h3>
        <p className="text-sm text-gray-600">Atualize suas informações pessoais e foto de perfil.</p>
      </div>

      <div className="space-y-4">
        {/* Profile Photo */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileData.foto} alt={profileData.nome} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {getInitials(profileData.nome)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Label htmlFor="foto" className="cursor-pointer">
              <Button variant="outline" className="cursor-pointer">
                Alterar Foto
              </Button>
              <input
                id="foto"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </Label>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF (máx. 2MB)</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              value={profileData.nome}
              onChange={(e) => setProfileData({ ...profileData, nome: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={profileData.telefone}
              onChange={(e) => setProfileData({ ...profileData, telefone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Biografia</Label>
          <Textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            rows={3}
            placeholder="Conte um pouco sobre você..."
          />
        </div>
      </div>

      <Button onClick={() => handleSave('profile')} disabled={isSaving}>
        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
      </Button>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Segurança da Conta</h3>
        <p className="text-sm text-gray-600">Gerencie sua senha e configurações de segurança.</p>
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock size={20} />
            <span>Alterar Senha</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="senhaAtual">Senha Atual</Label>
            <div className="relative">
              <Input
                id="senhaAtual"
                type={showPassword ? 'text' : 'password'}
                value={securityData.senhaAtual}
                onChange={(e) => setSecurityData({ ...securityData, senhaAtual: e.target.value })}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="novaSenha">Nova Senha</Label>
            <div className="relative">
              <Input
                id="novaSenha"
                type={showNewPassword ? 'text' : 'password'}
                value={securityData.novaSenha}
                onChange={(e) => setSecurityData({ ...securityData, novaSenha: e.target.value })}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-0 top-0 h-full px-3"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
            <div className="relative">
              <Input
                id="confirmarSenha"
                type={showConfirmPassword ? 'text' : 'password'}
                value={securityData.confirmarSenha}
                onChange={(e) => setSecurityData({ ...securityData, confirmarSenha: e.target.value })}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-0 h-full px-3"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>

          <Button onClick={() => handleSave('security')} disabled={isSaving}>
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      {/* Security Options */}
      <Card>
        <CardHeader>
          <CardTitle>Opções de Segurança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Autenticação de Dois Fatores</Label>
              <p className="text-sm text-gray-600">Adicione uma camada extra de segurança</p>
            </div>
            <Switch
              checked={securityData.autenticacaoDoisFatores}
              onCheckedChange={(checked) => 
                setSecurityData({ ...securityData, autenticacaoDoisFatores: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações de Login</Label>
              <p className="text-sm text-gray-600">Receba email quando alguém fizer login na sua conta</p>
            </div>
            <Switch
              checked={securityData.loginEmail}
              onCheckedChange={(checked) => 
                setSecurityData({ ...securityData, loginEmail: checked })
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Preferências de Notificação</h3>
        <p className="text-sm text-gray-600">Escolha como e quando você quer receber notificações.</p>
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail size={20} />
            <span>Notificações por Email</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Justificativas</Label>
              <p className="text-sm text-gray-600">Receba emails sobre justificativas de faltas</p>
            </div>
            <Switch
              checked={notificationData.emailJustificativas}
              onCheckedChange={(checked) => 
                setNotificationData({ ...notificationData, emailJustificativas: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Fechamento de Pautas</Label>
              <p className="text-sm text-gray-600">Notificações sobre fechamento de pautas</p>
            </div>
            <Switch
              checked={notificationData.emailPautas}
              onCheckedChange={(checked) => 
                setNotificationData({ ...notificationData, emailPautas: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Frequência Baixa</Label>
              <p className="text-sm text-gray-600">Alertas sobre frequência abaixo do mínimo</p>
            </div>
            <Switch
              checked={notificationData.emailFrequencia}
              onCheckedChange={(checked) => 
                setNotificationData({ ...notificationData, emailFrequencia: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone size={20} />
            <span>Notificações Push</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Justificativas</Label>
              <p className="text-sm text-gray-600">Notificações instantâneas sobre justificativas</p>
            </div>
            <Switch
              checked={notificationData.pushJustificativas}
              onCheckedChange={(checked) => 
                setNotificationData({ ...notificationData, pushJustificativas: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Pautas</Label>
              <p className="text-sm text-gray-600">Notificações sobre pautas</p>
            </div>
            <Switch
              checked={notificationData.pushPautas}
              onCheckedChange={(checked) => 
                setNotificationData({ ...notificationData, pushPautas: checked })
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Frequência</Label>
              <p className="text-sm text-gray-600">Alertas sobre frequência</p>
            </div>
            <Switch
              checked={notificationData.pushFrequencia}
              onCheckedChange={(checked) => 
                setNotificationData({ ...notificationData, pushFrequencia: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={() => handleSave('notifications')} disabled={isSaving}>
        Salvar Preferências
      </Button>
    </div>
  )

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Aparência e Idioma</h3>
        <p className="text-sm text-gray-600">Personalize a aparência do sistema.</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tema</Label>
            <Select value={appearanceData.tema} onValueChange={(value) => 
              setAppearanceData({ ...appearanceData, tema: value })
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="auto">Automático</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Idioma</Label>
            <Select value={appearanceData.idioma} onValueChange={(value) => 
              setAppearanceData({ ...appearanceData, idioma: value })
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es-ES">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tamanho da Fonte</Label>
            <Select value={appearanceData.tamanhoFonte} onValueChange={(value) => 
              setAppearanceData({ ...appearanceData, tamanhoFonte: value })
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequena</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Modo Compacto</Label>
            <p className="text-sm text-gray-600">Reduz o espaçamento entre elementos</p>
          </div>
          <Switch
            checked={appearanceData.compactMode}
            onCheckedChange={(checked) => 
              setAppearanceData({ ...appearanceData, compactMode: checked })
            }
          />
        </div>
      </div>

      <Button onClick={() => handleSave('appearance')} disabled={isSaving}>
        Salvar Configurações
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600 mt-1">Gerencie suas preferências e configurações do sistema</p>
      </div>

      {/* Success Alert */}
      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <Save className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Configurações salvas com sucesso!
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'security' && renderSecurityTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'appearance' && renderAppearanceTab()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Settings

