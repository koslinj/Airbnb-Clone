import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut, FadeOutDown, FadeOutUp, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import Where from '@/components/bookingModal/Where'
import { bookingStyles } from '@/constants/Styles'
import When from '@/components/bookingModal/When'
import Who from '@/components/bookingModal/Who'

const guestsGropus = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pets',
    text: 'Pets allowed',
    count: 0,
  },
];

const Page = () => {
  const router = useRouter()
  const [openCard, setOpenCard] = useState(0)
  const [selectedPlace, setSelectedPlace] = useState(0)
  const [groups, setGroups] = useState(guestsGropus)

  const onClearAll = () => {
    setGroups(guestsGropus.map(item => ({ ...item, count: 0 })))
    setSelectedPlace(0)
    setOpenCard(0)
  }

  return (
    <BlurView intensity={70} style={bookingStyles.container}>
      <Where
        openCard={openCard}
        setOpenCard={setOpenCard}
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
      />

      <When openCard={openCard} setOpenCard={setOpenCard} />

      <Who
        openCard={openCard}
        setOpenCard={setOpenCard}
        groups={groups}
        setGroups={setGroups}
      />

      {/* Footer */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.duration(600)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={onClearAll}>
            <Text style={{ fontSize: 18, fontFamily: 'mon-sb', textDecorationLine: 'underline' }}>Clear all</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={[defaultStyles.btn, { paddingHorizontal: 10, gap: 6, flexDirection: 'row' }]}>
            <Ionicons name='search-outline' size={24} color={'#fff'} />
            <Text style={defaultStyles.btnText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}

export default Page