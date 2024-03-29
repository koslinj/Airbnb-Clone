import { View, Text, StyleSheet } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import { Marker } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import MapView from 'react-native-map-clustering';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  listings: any
}

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter()
  const mapRef = useRef<MapView>(null)

  const onMarkerSelected = (item: any) => {
    router.push(`/listing/${item.properties.id}`)
  }

  const onLocationBtn = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      //setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    (mapRef as any).current?.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: 0.004,
      latitudeDelta: 0,
    });
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const INITIAL_REGION = {
    latitude: 45.438759,
    longitude: 12.327145,
    latitudeDelta: 0.9,
    longitudeDelta: 0.9
  }

  return (
    <View style={defaultStyles.container}>
      <MapView
        ref={mapRef}
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider='google'
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={INITIAL_REGION}
        clusterColor='#fff'
        clusterTextColor='#000'
        clusterFontFamily='mon-sb'
      >
        {listings.map((item: any) => (
          <Marker
            onPress={() => onMarkerSelected(item)}
            key={item.properties.id}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€{item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <View style={styles.viewAbsolute}>
        <TouchableOpacity style={styles.locateButton} onPress={onLocationBtn}>
          <Ionicons name='location' size={28} />
        </TouchableOpacity>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  viewAbsolute: {
    position: 'absolute',
    right: 20,
    bottom: 82,
  },
  locateButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#fff",
    elevation: 2,
    borderColor: Colors.grey,
    borderWidth: 1
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 3,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 12
  },
  markerText: {
    fontSize: 12,
    fontFamily: 'mon-sb'
  }
});

export default ListingsMap