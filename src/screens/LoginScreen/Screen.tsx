import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { View, Pressable, StyleSheet } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'

import { images } from '@lib/assets'
import { useLogin } from '@lib/login'
import { colors } from '@themes/colors'

export const Screen = () => {
  const navigation = useNavigation<NavigationProp<any, any>>()

  const { navigate } = navigation

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const { handleSubmit } = form

  const [isPasswordVisible, setIsPasswordVisible] = useState(true)

  const mutation = useLogin()

  const handlePressIcon = () => {
    form.setValue('username', 'eve.holt@reqres.in')
    form.setValue('email', 'eve.holt@reqres.in')
    form.setValue('password', 'password')
  }

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <LinearGradient colors={[colors.primary, colors.white_100]} style={styles.background} />
        <Pressable onPress={handlePressIcon}>
          <Image contentFit="contain" source={images.common.logo} style={styles.logo} />
        </Pressable>
        <View style={styles.form}>
          <Controller
            name="username"
            render={({ field }) => (
              <TextInput
                mode="outlined"
                onChangeText={field.onChange}
                value={field.value}
                style={styles.textInput}
                outlineStyle={styles.textInputOutline}
                left={<TextInput.Icon icon="account" />}
                disabled={mutation.isLoading}
                placeholder="Nama Anda"
                placeholderTextColor={colors.black_30}
              />
            )}
          />
          <Controller
            name="email"
            render={({ field }) => (
              <TextInput
                mode="outlined"
                onChangeText={field.onChange}
                value={field.value}
                style={styles.textInput}
                outlineStyle={styles.textInputOutline}
                left={<TextInput.Icon icon="email" />}
                disabled={mutation.isLoading}
                placeholder="Email Anda"
                placeholderTextColor={colors.black_30}
              />
            )}
          />
          <Controller
            name="password"
            render={({ field }) => (
              <TextInput
                mode="outlined"
                onChangeText={field.onChange}
                value={field.value}
                style={styles.textInput}
                outlineStyle={styles.textInputOutline}
                secureTextEntry={isPasswordVisible}
                right={
                  <TextInput.Icon
                    icon={isPasswordVisible ? 'eye' : 'eye-off'}
                    onPress={() => setIsPasswordVisible((previous) => !previous)}
                  />
                }
                left={<TextInput.Icon icon="key" />}
                disabled={mutation.isLoading}
              />
            )}
          />
          <Button
            mode="contained"
            onPress={handleSubmit((data) => mutation.mutate(data))}
            style={styles.submit}
            disabled={mutation.isLoading}
            loading={mutation.isLoading}
          >
            Masuk
          </Button>
          <View style={styles.footer}>
            <Text variant="labelLarge">Belum terdaftar ? </Text>
            <Pressable onPress={() => navigate('RegisterScreen')} disabled={mutation.isLoading}>
              <Text variant="labelLarge" style={styles.link}>
                Daftar Sekarang
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: colors.tertiary,
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  form: {
    width: 300,
  },
  link: {
    color: colors.primary,
  },
  logo: {
    height: 80,
    marginBottom: 24,
    width: 160,
  },
  submit: {
    marginTop: 8,
  },
  textInput: {
    marginBottom: 8,
  },
  textInputOutline: {
    borderRadius: 16,
  },
})
