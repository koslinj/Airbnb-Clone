import { View, Text, StyleSheet } from 'react-native'
import React, { useMemo, useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import Listings from './Listings'
import Colors from '@/constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  listings: any[]
  category: string
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['10%', '100%'], [])

  const showMap = () => {
    bottomSheetRef.current?.collapse()
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <View style={{ flex: 1 }}>
        <Listings listings={listings} category={category} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={showMap} style={styles.btn}>
            <Text style={{ color: '#fff', fontFamily: 'mon-sb' }}>Map</Text>
            <Ionicons name='map' size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 22,
    width: '100%',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 32,
    elevation: 10
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 12,
    borderRadius: 16,
  }
})

export default ListingsBottomSheet