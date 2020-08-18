import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/views/Main';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerHeadlessTask(
  'RNCallKeepBackgroundMessage',
  () => ({name, callUUID, handle}) => {
    return Promise.resolve();
  },
);
