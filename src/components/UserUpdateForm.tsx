import { useForm, FormProvider, Controller } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'

import { useUpdateUser } from '@lib/user'

export const UserUpdateForm = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      job: '',
    },
  })

  const { handleSubmit } = form

  const mutation = useUpdateUser()

  return (
    <FormProvider {...form}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label} variant="labelMedium">
            Nama
          </Text>
          <Controller
            name="name"
            render={({ field }) => (
              <TextInput
                mode="outlined"
                onChangeText={field.onChange}
                value={field.value}
                style={styles.textInput}
                outlineStyle={styles.textInputOutline}
                disabled={mutation.isLoading}
              />
            )}
          />
          <Text style={styles.label} variant="labelMedium">
            Pekerjaan
          </Text>
          <Controller
            name="job"
            render={({ field }) => (
              <TextInput
                mode="outlined"
                onChangeText={field.onChange}
                value={field.value}
                style={styles.textInput}
                outlineStyle={styles.textInputOutline}
                disabled={mutation.isLoading}
              />
            )}
          />
          <Button
            mode="contained"
            onPress={handleSubmit((data) =>
              mutation.mutateAsync({
                id: '1',
                ...data,
              })
            )}
            style={styles.submit}
            disabled={mutation.isLoading}
            loading={mutation.isLoading}
          >
            Simpan
          </Button>
        </View>
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    display: 'flex',
  },
  form: {
    marginTop: 24,
    width: 300,
  },
  label: {
    marginLeft: 4,
  },
  submit: {
    marginTop: 8,
  },
  textInput: {
    marginBottom: 16,
  },
  textInputOutline: {
    borderRadius: 16,
  },
})
