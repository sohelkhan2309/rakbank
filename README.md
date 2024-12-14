# rakbank
Optimum Solution, Rak Bank machine test:

Clone the GIT Repo & run npm install

then install below NPM:

1. OS, Device Name and MAC Address
npm install react-native-device-info

2. IMEI(Android)- IMEI access is not allowed on iOS
npm install react-native-imei

3. Location
npm install react-native-geolocation-service

4. Public IP Address
npm install axios

5. Permission
npm install react-native-permissions


Add Permissions for Android and iOS:
Android:
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />

iOS:
<key>NSLocationWhenInUseUsageDescription</key>
<string>Your app needs access to your location</string>

Note: 
1. Created seperate module for Android and iOS for blocking screenshot
2. Native module name : ScreenshotBlocker
3. I have displayed other requested details on the same screen below the Activate/Activated button coz I'm unable to find the mock APi for the same
4. If API available just need to call that API with fetch or Axios to push data to server and that API will return repons Success or Fail.
