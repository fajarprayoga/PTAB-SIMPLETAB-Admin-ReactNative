/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import OneSignal from 'react-native-onesignal';
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId("282dff1a-c5b2-4c3d-81dd-9e0c2b82114b");
OneSignal.setRequiresUserPrivacyConsent(false);
AppRegistry.registerComponent(appName, () => App);
