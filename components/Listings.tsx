import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, FadeInRight, FadeOutLeft } from "react-native-reanimated"
import { BottomSheetFlatList, BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";

interface Props {
  listings: any[]
  category: string
}

const Listings = memo(({ category, listings: items }: Props) => {
  const [loading, setLoading] = useState(false)
  const listRef = useRef<BottomSheetFlatListMethods>(null)

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category])

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>

        <Animated.View style={styles.listing} entering={FadeInRight}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <TouchableOpacity style={{ position: 'absolute', right: 26, top: 26, backgroundColor: '#ffffffe0', borderRadius: 30, justifyContent: 'center', padding: 5 }}>
            <Ionicons name='heart-outline' size={26} color='#000' />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'mon-sb' }}>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name='star' size={16} />
              <Text style={{ fontFamily: 'mon-sb' }}>{item.review_scores_rating / 20}</Text>
            </View>
          </View>

          <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>

          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={{ fontFamily: 'mon-sb' }}>€ {item.price}</Text>
            <Text style={{ fontFamily: 'mon' }}>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  )

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
        ListHeaderComponent={
          <Text style={styles.info}>
            {items.length} Homes
          </Text>
        }
      />
    </View>
  )
})

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 8,
    marginVertical: 14
  },
  image: {
    backgroundColor: "#bbf",
    width: '100%',
    height: 300,
    borderRadius: 12
  },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16
  }
})

export default Listings