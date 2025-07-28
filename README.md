# Sistema de Presença Universitário

Um sistema completo de gerenciamento de presença para universidades, desenvolvido com React e design profissional.

## 🎯 Visão Geral

Este projeto implementa **todas as 11 telas** solicitadas para o sistema de presença universitário, com foco exclusivo no **design visual** e **experiência do usuário**, sem implementar lógica de backend.

## 🔧 Arquitetura e Melhorias

### Estrutura Otimizada

```
src/
├── components/          # Componentes React
│   ├── layout/         # Componentes de layout (Header, Sidebar)
│   ├── screens/        # Telas principais da aplicação
│   └── ui/            # Componentes de UI reutilizáveis
├── constants/          # Constantes da aplicação
├── data/              # Dados mockados centralizados
├── hooks/             # Hooks customizados
├── utils/             # Funções utilitárias
└── ...
```

### Hooks Customizados

- **useForm** - Gerenciamento de formulários com validação
- **useList** - Gerenciamento de listas com busca, filtro e ordenação
- **useNotification** - Sistema de notificações da aplicação
- **useIsMobile** - Detecção de dispositivos móveis

### Características Técnicas

- ✅ **Performance**: Uso de `useCallback` e `useMemo`
- ✅ **Manutenibilidade**: Código organizado e reutilizável
- ✅ **Escalabilidade**: Estrutura preparada para crescimento
- ✅ **TypeScript Ready**: Estrutura preparada para migração
- ✅ **Testing Ready**: Hooks e utilitários testáveis

## 🎨 Design e Características

### Paleta de Cores

- **70% Branco** - Fundo principal e cards
- **30% Azul Marinho** - Elementos de destaque, botões e navegação
- **Tons de Cinza** - Textos secundários e bordas

### Características Visuais

- ✅ Design limpo e profissional
- ✅ Interface responsiva (desktop e mobile)
- ✅ Componentes modernos com shadcn/ui
- ✅ Navegação intuitiva com sidebar
- ✅ Micro-interações e animações suaves
- ✅ Tipografia legível e hierarquia visual clara

## 📱 Telas Implementadas

### 1. **Login Screen**

- Formulário de login centralizado
- Seleção de tipo de usuário (Admin, Professor, Aluno, Chefe Depto)
- Campos para email e senha
- Link "Esqueceu sua senha?"
- Logo universitário

### 2. **Department Management** (Admin)

- Lista de departamentos com busca e filtros
- Formulário para adicionar/editar departamentos
- Estatísticas de cursos e professores
- Ações de ativação/desativação

### 3. **Batch Upload** (Admin)

- Interface de upload em lote com drag & drop
- Suporte para múltiplos tipos de arquivo
- Barra de progresso de upload
- Histórico de uploads anteriores
- Validação de formatos

### 4. **Grade Closure** (Chefe Departamento)

- Lista de disciplinas para fechamento
- Filtros por período e status
- Visualização de estatísticas de frequência
- Processo de fechamento de pautas
- Relatórios de frequência

### 5. **Course Management** (Chefe Departamento)

- Gerenciamento de cursos e disciplinas
- Atribuição de professores
- Configuração de horários
- Gestão de turmas e períodos

### 6. **Professor Dashboard**

- Visão geral das disciplinas
- Estatísticas de frequência por turma
- Atalhos para lançamento de faltas
- Justificativas pendentes
- Calendário acadêmico

### 7. **Attendance Entry** (Professor)

- Lançamento de faltas por disciplina
- Lista de alunos com presença/falta
- Filtros por data e turma
- Observações por aluno
- Histórico de presenças

### 8. **Justification Review** (Professor)

- Lista de justificativas de faltas
- Análise de documentos anexados
- Aprovação/rejeição de justificativas
- Comentários e feedback
- Histórico de decisões

### 9. **Student Dashboard**

- Visão geral da frequência
- Disciplinas matriculadas
- Alertas de frequência baixa
- Histórico de justificativas
- Calendário de aulas

### 10. **Notifications**

- Centro de notificações unificado
- Filtros por tipo e status
- Notificações em tempo real
- Histórico completo
- Configurações de preferências

### 11. **Settings**

- Configurações de perfil
- Preferências de notificação
- Configurações de segurança
- Personalização da interface
- Gerenciamento de conta

## 🚀 Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones
- **React Router** - Navegação
- **shadcn/ui** - Componentes base

## 📦 Estrutura do Projeto

```
university-attendance-system/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── screens/
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── DepartmentManagement.jsx
│   │   │   ├── BatchUpload.jsx
│   │   │   ├── GradeClosure.jsx
│   │   │   ├── CourseManagement.jsx
│   │   │   ├── ProfessorDashboard.jsx
│   │   │   ├── AttendanceEntry.jsx
│   │   │   ├── JustificationReview.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── Notifications.jsx
│   │   │   └── Settings.jsx
│   │   └── ui/
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       └── ... (outros componentes)
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
└── README.md
```

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Configuração do Ambiente

```bash
# Clonar o projeto
git clone <repository-url>
cd university-attendance-system

# Copiar arquivo de ambiente (opcional)
cp .env.example .env

# Instalar dependências
npm install
# ou
pnpm install
# ou
yarn install

# Iniciar servidor de desenvolvimento
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

### Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa o linter
```

### Acesso

- Abra http://localhost:5173 no navegador
- Use qualquer email e senha para fazer login
- Selecione o tipo de usuário desejado

### Credenciais de Demonstração

- **Email:** qualquer@email.com
- **Senha:** qualquer senha
- **Tipos:** Administrador, Professor, Aluno, Chefe de Departamento

## 👥 Perfis de Usuário

### Administrador

- Gerenciamento de departamentos
- Upload em lote de dados
- Acesso a todas as funcionalidades

### Chefe de Departamento

- Gerenciamento de cursos
- Fechamento de pautas
- Supervisão de professores

### Professor

- Dashboard de disciplinas
- Lançamento de faltas
- Revisão de justificativas

### Aluno

- Dashboard pessoal
- Visualização de frequência
- Submissão de justificativas

## 🎯 Funcionalidades Visuais

### Interações

- ✅ Hover effects em botões e cards
- ✅ Transições suaves entre estados
- ✅ Loading states e feedback visual
- ✅ Modais e overlays
- ✅ Formulários interativos

### Responsividade

- ✅ Layout adaptável para desktop
- ✅ Interface otimizada para tablet
- ✅ Design mobile-friendly
- ✅ Navegação touch-friendly

### Acessibilidade

- ✅ Contraste adequado de cores
- ✅ Hierarquia visual clara
- ✅ Navegação por teclado
- ✅ Labels e aria-labels

## 📝 Notas Importantes

1. **Apenas Visual:** Este projeto implementa apenas a interface visual, sem lógica de backend ou persistência de dados.

2. **Mock Data:** Todos os dados exibidos são simulados para demonstração das interfaces.

3. **Navegação:** A navegação entre telas funciona através do React Router.

4. **Responsividade:** Todas as telas são responsivas e funcionam em diferentes tamanhos de tela.

5. **Customização:** As cores e estilos podem ser facilmente customizados através do Tailwind CSS.

## 🎉 Resultado Final

✅ **TODAS AS 11 TELAS FORAM IMPLEMENTADAS COM SUCESSO!**

O projeto entrega um sistema visual completo e profissional para gerenciamento de presença universitário, com design moderno, interface intuitiva e experiência de usuário otimizada.

---

## 💜 Contribuidores

Feito com muito empenho pela equipe, composta por:

> • [Eduardo Hill](https://github.com/EduardoHill) • [Enzo Faceroli](https://github.com/enzofaceroli) • [Lukas de Sá](https://github.com/lukasffsa) • [Vitor Vale](https://github.com/vitortvale)
