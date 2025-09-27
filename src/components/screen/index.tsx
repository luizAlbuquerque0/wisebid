import React from 'react';
import { View, StatusBar, KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '~/constants/colors';

interface ScreenProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarBackgroundColor?: string;
  safeAreaEdges?: ('top' | 'bottom' | 'left' | 'right')[];
  keyboardAvoidingEnabled?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  backgroundColor = COLORS.greenUltraLight,
  statusBarStyle = 'dark-content',
  statusBarBackgroundColor = COLORS.white,
  safeAreaEdges = ['top', 'bottom'],
  keyboardAvoidingEnabled = true,
  style,
  contentContainerStyle,
}) => {
  const screenStyle = [{ backgroundColor }, style];

  const content = (
    <View className="flex-1" style={contentContainerStyle}>
      {children}
    </View>
  );

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={Platform.OS === 'android'}
      />
      <SafeAreaView className="flex-1" style={screenStyle} edges={safeAreaEdges}>
        {keyboardAvoidingEnabled ? (
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            {content}
          </KeyboardAvoidingView>
        ) : (
          content
        )}
      </SafeAreaView>
    </>
  );
};
