import React, { useRef, useState } from 'react';
import { TextInput, TextInputProps, View, TouchableOpacity, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface IFloatingLabelInput extends TextInputProps {
  label: string;
  isPassword?: boolean;
}

export function FloatingLabelInput({
  label,
  value,
  isPassword = false,
  ...props
}: IFloatingLabelInput) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const timingConfig = { duration: 200 };
  const refInput = useRef<TextInput>(null);

  const inputLabelStyle = useAnimatedStyle(() => {
    let labelColor;
    let backgroundColor;
    const hasContent = isFocused || value;

    const labelPosition = hasContent ? -6 : 18;
    const labelSize = hasContent ? 12 : 16;

    if (!isFocused && !value) {
      // Cor cinza quando não focado e sem conteúdo (equivalente a neutral.n50)
      labelColor = withTiming('#9CA3AF', timingConfig);
    } else {
      // Cor escura quando focado ou com conteúdo (equivalente a neutral.n0)
      labelColor = withTiming('#374151', timingConfig);
    }

    backgroundColor = hasContent
      ? // Cor de fundo clara quando tem conteúdo (equivalente a primary.light)
        withTiming('#F0F9F0', timingConfig) // greenUltraLight
      : withTiming('transparent', timingConfig);

    return {
      top: withTiming(labelPosition, timingConfig),
      fontSize: withTiming(labelSize, timingConfig),
      color: labelColor,
      backgroundColor,
    };
  });

  const handleLabelPress = () => {
    refInput.current?.focus();
  };

  return (
    <View className="w-full">
      <TextInput
        ref={refInput}
        value={value}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={isPassword && !showPassword}
        className={`mt-1 h-14 w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-800  ${
          isPassword ? 'pr-12' : ''
        }`}
      />
      <TouchableOpacity
        onPress={handleLabelPress}
        className="absolute left-4 z-10"
        activeOpacity={1}>
        <Animated.Text
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 1,
              paddingHorizontal: 4,
              borderRadius: 8,
            },
            inputLabelStyle,
          ]}>
          {label}
        </Animated.Text>
      </TouchableOpacity>

      {isPassword && (
        <Pressable
          onPress={() => setShowPassword((v) => !v)}
          className="absolute right-4 top-3.5 z-20 p-2">
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#6B7280"
          />
        </Pressable>
      )}
    </View>
  );
}
