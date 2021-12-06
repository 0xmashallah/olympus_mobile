/**
 * @format
 */

import '@ethersproject/shims';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {MainPage} from './src/MainPage';
import {DebugPage} from './src/pages/DebugPage';

AppRegistry.registerComponent(appName, () => MainPage);
