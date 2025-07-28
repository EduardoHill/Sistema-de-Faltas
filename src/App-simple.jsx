import { useState } from 'react'
import LoginScreen from './components/screens/LoginScreen'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = (email, password, role) => {
    const mockUser = {
      id: 1,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      role: role
    }
    setCurrentUser(mockUser)
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Sistema de Presença Universitário
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Bem-vindo, {currentUser.name}!
          </h2>
          <p className="text-gray-600 mb-4">
            Você está logado como: <strong>{currentUser.role}</strong>
          </p>
          <p className="text-gray-600">
            Email: {currentUser.email}
          </p>
          <button 
            onClick={() => setCurrentUser(null)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

