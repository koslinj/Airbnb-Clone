import { View, Text, StyleSheet } from 'react-native'
import React, { memo, useEffect } from 'react'
import { Marker } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import MapView from 'react-native-map-clustering';

interface Props {
  listings: any
}

const INITIAL_REGION = {
  latitude: 45.438759,
  longitude: 12.327145,
  latitudeDelta: 0.9,
  longitudeDelta: 0.9
}

const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter()

  const onMarkerSelected = (item: any) => {
    router.push(`/listing/${item.properties.id}`)
  }

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        //setErrorMsg('Permission to access location was denied');
        return;
      }

      //let location = await Location.getCurrentPositionAsync({});
      //setLocation(location);
    })();
  }, []);

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        provider='google'
        showsUserLocation
        showsMyLocationButton
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
    </View>
  )
})

const styles = StyleSheet.create({
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