import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { bookingStyles } from '@/constants/Styles'
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface Group {
  name: string
  text: string
  count: number
}

interface Props {
  openCard: number
  setOpenCard: React.Dispatch<React.SetStateAction<number>>
  groups: Group[]
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>
}

const Who = ({ openCard, setOpenCard, groups, setGroups }: Props) => {

  return (
    <View style={bookingStyles.card}>
      {openCard != 2 ? (
        <AnimatedTouchableOpacity onPress={() => setOpenCard(2)}
          style={bookingStyles.cardPreview}
          entering={FadeInUp.duration(150)}
          exiting={FadeOutDown.duration(150)}
        >
          <Text style={bookingStyles.previewText}>Who</Text>
          <Text style={bookingStyles.previewdData}>Add guests</Text>
        </AnimatedTouchableOpacity>
      ) : (
        <Animated.View style={bookingStyles.cardBody} entering={FadeInDown.duration(150)} exiting={FadeOutUp.duration(150)}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={bookingStyles.cardHeader}>Who is coming?</Text>
            {groups.map((item, index) => (
              <View
                key={index}
                style={[bookingStyles.guestItem, index + 1 < groups.length ? bookingStyles.itemBorder : null]}
              >
                <View>
                  <Text style={{ fontFamily: 'mon-sb', fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ fontFamily: 'mon', fontSize: 16, color: Colors.grey }}>{item.text}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups]
                      newGroups[index].count--
                      if (newGroups[index].count < 0) newGroups[index].count = 0
                      setGroups(newGroups)
                    }}
                  >
                    <Ionicons
                      name='remove-circle-outline'
                      size={40}
                      color={groups[index].count > 0 ? Colors.dark : '#ccc'}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: 'mon',
                      fontSize: 16,
                      minWidth: 18,
                      textAlign: 'center',
                    }}>
                    {item.count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups]
                      newGroups[index].count++
                      setGroups(newGroups)
                    }}
                  >
                    <Ionicons
                      name='add-circle-outline'
                      size={40}
                      color={Colors.dark}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  )
}

export default Who