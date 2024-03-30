import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { bookingStyles } from '@/constants/Styles'
// @ts-ignore
import DatePicker from "react-native-modern-datepicker"
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
import Colors from '@/constants/Colors'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface Props {
  openCard: number
  setOpenCard: React.Dispatch<React.SetStateAction<number>>
}

const When = ({ openCard, setOpenCard }: Props) => {
  const today = new Date().toISOString().substring(0, 10)

  return (
    <View style={bookingStyles.card}>
      {openCard != 1 ? (
        <AnimatedTouchableOpacity onPress={() => setOpenCard(1)}
          style={bookingStyles.cardPreview}
          entering={FadeInUp.duration(150)}
          exiting={FadeOutDown.duration(150)}
        >
          <Text style={bookingStyles.previewText}>When</Text>
          <Text style={bookingStyles.previewdData}>Any week</Text>
        </AnimatedTouchableOpacity>
      ) : (
        <Animated.View style={bookingStyles.cardBody} entering={FadeInDown.duration(150)} exiting={FadeOutUp.duration(150)}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={bookingStyles.cardHeader}>When is your trip?</Text>
            <DatePicker
              current={today}
              selected={today}
              mode={'calendar'}
              options={{
                defaultFont: 'mon',
                headerFont: 'mon-sb',
                borderColor: 'transparent',
                mainColor: Colors.primary
              }}
            />
          </View>
        </Animated.View>
      )}
    </View>
  )
}

export default When