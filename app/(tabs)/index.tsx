import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from "@/assets/data/airbnb-listings.json"
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json"
import ListingsMap from '@/components/ListingsMap'

const Page = () => {
  const [category, setCategory] = useState("Tiny homes")
  const items = useMemo(() => {
    return (listingsData as any[]).slice(0,700).filter(item => item.medium_url !== null)
  }, [])
  const itemsGeo = useMemo(() => {
    const json = listingsDataGeo as any
    return (json.features as any[]).slice(0,700).filter(item => item.medium_url !== null)
  }, [])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
        }}
      />
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMap listings={itemsGeo} />
    </View>
  )
}

export default Page