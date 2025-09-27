export const COLORS = {
  // Cores principais do front-end
  primary: '#4F56E8', // Azul/roxo principal
  primaryLight: '#6B73FF', // Versão mais clara
  primaryDark: '#3A41D1', // Versão mais escura

  // Verde musgo (mantido para compatibilidade - será substituído gradualmente)
  greenMoss: '#4F56E8', // Agora usa a cor primária
  greenMossLight: '#6B73FF', // Versão mais clara da primária
  greenUltraLight: '#EEF2FF', // Versão muito clara da primária

  // Cores de status
  success: '#10B981', // Verde para sucesso
  successLight: '#D1FAE5',
  warning: '#F59E0B', // Amarelo para avisos
  warningLight: '#FEF3C7',
  error: '#EF4444', // Vermelho para erros
  errorLight: '#FEE2E2',
  info: '#3B82F6', // Azul para informações
  infoLight: '#DBEAFE',

  // Cores neutras
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Cores de background
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',

  // Cores de texto
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',

  transparent: 'transparent',
} as const;
