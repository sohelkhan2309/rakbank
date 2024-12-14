import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, Alert, Platform, View, Image } from 'react-native';
import { blockScreenShot, unblockScreenShot } from './ScreenshotManager'; // Native Module for screenshot blocking

import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const App = () => {
  const [buttonState, setButtonState] = useState<'Activate' | 'Activated'>('Activate');

  const [os, setOs] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [location, setLocation] = useState<{ latitude: number | null, longitude: number | null } | null>(null);
  const [publicIp, setPublicIp] = useState('');

  useEffect(() => {
    // Get OS
    setOs(DeviceInfo.getSystemName());

    const fetchDeviceNameMacAddress = async () => {
      // Get device name
      setDeviceName(await DeviceInfo.getDeviceName());

      // Get MAC address (on iOS and older Android versions)
      setMacAddress(await DeviceInfo.getMacAddress());
    }

    fetchDeviceNameMacAddress();

    const requestPermissions = async () => {
      // For location permission
      if (Platform.OS === 'ios') {
        // iOS specific permission for location
        const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (status === RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          console.log('Location permission status:', result);
        }
      } else {
        // Android specific permission for location
        const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (status === RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          console.log('Location permission status:', result);
        }

        const readPhoneStatus = await check(PERMISSIONS.ANDROID.READ_PHONE_STATE);
        if (readPhoneStatus === RESULTS.GRANTED) {
          console.log('Phone state permission granted');
        } else {
          const readPhoneResult = await request(PERMISSIONS.ANDROID.READ_PHONE_STATE);
          console.log('Phone state permission status:', readPhoneResult);
        }

        getLocation()
      }
    };

    requestPermissions();

    // Get Public IP
    const fetchPublicIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setPublicIp(response.data.ip);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPublicIP();

    // Get Location
    const getLocation =async ()=>{
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, []);

  const handleButtonClick = () => {
    try {
      if (buttonState === 'Activate') {
        setButtonState('Activated');
        blockScreenShot();
        Alert.alert('Screenshot Disabled');
      } else {
        setButtonState('Activate');
        unblockScreenShot();
        Alert.alert('Screenshot Enabled');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Image style={{ width: 80, height: 80, borderRadius: 10, marginBottom: 20 }} source={require('./assets/images/logo.webp')} />
      <TouchableOpacity
        onPress={handleButtonClick}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: '#007bff',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>{buttonState}</Text>
      </TouchableOpacity>
      <View style={{marginTop:10}}>
        <Text>OS: {os}</Text>
        <Text>Device Name: {deviceName}</Text>
        <Text>MAC Address: {macAddress}</Text>
        <Text>Location: {location ? `${location.latitude}, ${location.longitude}` : 'Loading...'}</Text>
        <Text>Public IP: {publicIp}</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
