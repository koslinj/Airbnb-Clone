import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'
import { bookingStyles } from '@/constants/Styles'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface Props {
  openCard: number
  setOpenCard: React.Dispatch<React.SetStateAction<number>>
  selectedPlace: number
  setSelectedPlace: React.Dispatch<React.SetStateAction<number>>
}

const Where = ({ openCard, setOpenCard, selectedPlace, setSelectedPlace }: Props) => {

  return (
    <View style={bookingStyles.card} >
      {openCard != 0 ? (
        <AnimatedTouchableOpacity onPress={() => setOpenCard(0)}
          style={bookingStyles.cardPreview}
          entering={FadeInUp.duration(150)}
          exiting={FadeOutDown.duration(150)}
        >
          <Text style={bookingStyles.previewText}>Where</Text>
          <Text style={bookingStyles.previewdData}>I'm flexible</Text>
        </AnimatedTouchableOpacity>
      ) : (
        <Animated.View style={bookingStyles.cardBody} entering={FadeInDown.duration(150)} exiting={FadeOutUp.duration(150)}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={bookingStyles.cardHeader}>Where to?</Text>
            <View style={bookingStyles.searchSection}>
              <Ionicons style={bookingStyles.searchIcon} name='ios-search' size={20} />
              <TextInput
                style={bookingStyles.inputField}
                placeholder='Search destination'
                placeholderTextColor={Colors.grey}
              />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 25, paddingHorizontal: 20 }}
          >
            {places.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedPlace(index)}>
                <Image source={item.img} style={selectedPlace === index ? bookingStyles.placeSelected : bookingStyles.place} />
                <Text
                  style={[
                    { paddingTop: 6, textAlign: 'center' },
                    selectedPlace === index ? { fontFamily: 'mon-sb' } : { fontFamily: 'mon' }
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )
      }
    </View >
  )
}

export default Where