import { createStackNavigator } from '@react-navigation/stack'

import { useSessionStore } from '@lib/session'
import { CreateUserScreen, CreateUserScreenOptions } from '@screens/CreateUserScreen'
import { HomeScreen, HomeScreenOptions } from '@screens/HomeScreen'
import { LoginScreen, LoginScreenOptions } from '@screens/LoginScreen'
import { RegisterScreen, RegisterScreenOptions } from '@screens/RegisterScreen'
import { UpdateUserScreen, UpdateUserScreenOptions } from '@screens/UpdateUserScreen'

const Stack = createStackNavigator()

const RootStack = () => {
  const accessToken = useSessionStore((state) => state.accessToken)

  return (
    <Stack.Navigator>
      {accessToken ? (
        <Stack.Group>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={HomeScreenOptions} />
          <Stack.Screen
            name="CreateUserScreen"
            component={CreateUserScreen}
            options={CreateUserScreenOptions}
          />
          <Stack.Screen
            name="UpdateUserScreen"
            component={UpdateUserScreen}
            options={UpdateUserScreenOptions}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={LoginScreenOptions} />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={RegisterScreenOptions}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default RootStack
