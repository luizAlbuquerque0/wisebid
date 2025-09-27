import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FloatingLabelInput } from '~/components/FloatingLabelInput';
import { COLORS } from '~/constants/colors';
import { useAuth } from '~/hooks/useAuth';
import { Screen } from '~/components/screen';
import Toast from 'react-native-toast-message';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // Fazer login com backend real
      await signIn(data.email, data.password);
    } catch (error: any) {
      // Simplificar mensagem de erro para o usuário
      let errorMessage = 'Usuário ou senha inválidos';

      if (error?.code === 'NETWORK_ERROR' || !error?.response) {
        errorMessage = 'Erro de conexão. Verifique sua internet';
      }

      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: errorMessage,
        visibilityTime: 4000,
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen
      backgroundColor={COLORS.white}
      statusBarStyle="dark-content"
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
      <View className="w-full max-w-md items-center rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        {/* Logo/Avatar */}
        <View className="mb-6 mt-2 items-center justify-center rounded-full p-4">
          <Image
            source={require('~/assets/images/logo.png')}
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </View>

        {/* Título */}
        <Text className="mb-2 text-center text-2xl font-bold text-black">Acesse sua conta</Text>
        <Text className="mb-8 text-center text-gray-600">
          Insira seu e-mail e senha para acessar sua conta.
        </Text>

        {/* Formulário */}
        <View className="mb-4 w-full">
          {/* Campo Email */}
          <View className="mb-4 gap-2">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FloatingLabelInput
                  label="E-mail"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!isLoading}
                />
              )}
            />
            {errors.email && (
              <Text className="ml-1 text-sm  text-red-500">{errors.email.message}</Text>
            )}
          </View>

          {/* Campo Senha */}
          <View className="gap-2">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <FloatingLabelInput
                  label="Senha"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  isPassword
                  editable={!isLoading}
                />
              )}
            />
            {errors.password && (
              <Text className="ml-1 text-sm text-red-500">{errors.password.message}</Text>
            )}
          </View>
        </View>

        {/* Link Esqueceu Senha */}
        <View className="mb-8 w-full flex-row justify-end">
          <TouchableOpacity disabled={isLoading}>
            <Text className="text-sm text-gray-500">Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity
          className="mb-6 w-full rounded-lg py-4"
          style={{ backgroundColor: COLORS.primary }}
          onPress={handleSubmit(onSubmit)}
          activeOpacity={0.8}
          disabled={isLoading}>
          <Text className="text-center text-base font-semibold text-white">
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
