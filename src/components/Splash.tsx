import React, { PropsWithChildren } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import Animated, { FadeOut } from 'react-native-reanimated'

import { images } from '@lib/assets'
import { useBootstrap } from '@lib/bootstrap'
import { colors } from '@themes/colors'

const Splash = ({ children }: PropsWithChildren<unknown>) => {
  const milisecond = 300
  const { isLoading, start } = useBootstrap()

  return (
    <React.Fragment>
      <View onLayout={start} style={styles.children}>
        {isLoading ? null : children}
      </View>
      {isLoading ? (
        <Animated.View
          style={styles.container}
          pointerEvents="auto"
          exiting={FadeOut.duration(milisecond).delay(milisecond).withInitialValues({ opacity: 1 })}
        >
          <ImageBackground
            source={images.common.background}
            resizeMode="cover"
            style={styles.imageBackground}
          />
          <Image resizeMode="contain" source={images.common.logo} style={styles.logo} />
        </Animated.View>
      ) : null}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  children: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: colors.white_100,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1,
  },
  imageBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  logo: {
    borderRadius: 50,
    height: 100,
    position: 'absolute',
    top: 100,
    width: 240,
  },
})

export { Splash }
