import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Page = () => {
  const router = useRouter()

  const onCLearAll = () => {

  }

  return (
    <BlurView intensity={70} style={styles.container}>
      <Text>Book</Text>

      <Animated.View style={defaultStyles.footer} entering={SlideInDown.duration(600)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={onCLearAll}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60
  }
})

export default Page