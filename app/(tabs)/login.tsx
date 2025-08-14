import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Validação de campos obrigatórios
    if (!username.trim()) {
      Alert.alert("Erro", "Por favor, digite seu usuário.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, digite sua senha.");
      return;
    }

    // Validação se a senha é numérica
    if (isNaN(Number(password))) {
      Alert.alert("Erro", "A senha deve conter apenas números.");
      return;
    }

    // Validação da combinação user/123
    if (username === 'user' && password === '123') {
      navigation.replace('Tabs');
    } else {
      Alert.alert("Erro", "Usuário ou senha inválidos.");
    }
  };

  const handleForgotPassword = () => {
    Alert.alert("Esqueci a Senha", "Funcionalidade ainda não implementada.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0E14" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/icons/brqlogo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {/* Campo Usuário */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Image 
                  source={require('@/assets/icons/person.png')} 
                  style={[styles.inputIcon, { width: 20, height: 20, tintColor: '#666' }]} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Usuário"
                  placeholderTextColor="#666"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {username.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => setUsername('')}
                  >
                    <Image 
                      source={require('@/assets/icons/close.png')} 
                      style={{ width: 20, height: 20, tintColor: '#666' }} 
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Campo Senha */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Image 
                  source={require('@/assets/icons/lock.png')} 
                  style={[styles.inputIcon, { width: 20, height: 20, tintColor: '#666' }]} 
                />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor="#666"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={setPassword}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={{ color: '#666', fontSize: 12 }}>
                    {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão Entrar */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                (!username || !password) && styles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={!username || !password}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Esqueci a Senha</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16171B',
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoImage: {
    width: 224,
    height: 224,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1B21',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2B31',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  clearButton: {
    padding: 4,
  },
  eyeButton: {
    padding: 4,
  },
  loginButton: {
    backgroundColor: '#EC8B00',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#EC8B00',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#666',
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 24,
    padding: 12,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    gap: 8,
  },
  navIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
  },
  navIndicatorActive: {
    backgroundColor: '#EC8B00',
    width: 24,
  },
});
