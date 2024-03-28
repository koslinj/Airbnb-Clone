import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Link } from 'expo-router'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import * as Haptics from 'expo-haptics'

const categories = [
  {
    name: 'Tiny homes',
    icon: 'home',
  },
  {
    name: 'Cabins',
    icon: 'house-siding',
  },
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Play',
    icon: 'videogame-asset',
  },
  {
    name: 'City',
    icon: 'apartment',
  },
  {
    name: 'Beachfront',
    icon: 'beach-access',
  },
  {
    name: 'Countryside',
    icon: 'nature-people',
  },
];

const ExploreHeader = () => {
  const scrollRef = useRef<ScrollView>(null)
  const itemsRef = useRef<Array<TouchableOpacity | null>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index]
    setActiveIndex(index)

    if (scrollRef.current) {
      selected?.measureLayout(scrollRef.current.getScrollableNode(), (x) => {
        scrollRef.current?.scrollTo({ x: x-16, animated: true });
      })
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  return (
    <View style={styles.container}>
      <View style={styles.actionRow}>
        <Link href={'/(modals)/booking'} asChild>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name='search' size={24} />
            <View>
              <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
              <Text style={{ fontFamily: 'mon', color: Colors.grey }}>Anywhere · Any Week</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name='options-outline' size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            ref={(el) => itemsRef.current[index] = el}
            style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
            onPress={() => selectCategory(index)}
          >
            <MaterialIcons
              name={item.icon as any}
              size={24}
              color={activeIndex === index ? '#000' : Colors.grey}
            />
            <Text
              style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 6,
    gap: 12
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    padding: 12,
    borderRadius: 30,
    backgroundColor: '#fff',

    elevation: 12,
    shadowColor: '#00000099',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    minWidth: 70,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 6,
    paddingHorizontal: 14
  },
  categoriesBtnActive: {
    minWidth: 70,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 10,
    paddingTop: 6,
    paddingHorizontal: 14
  },
})

export default ExploreHeader