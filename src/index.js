// main index.js

import { NativeModules, NativeEventEmitter } from 'react-native';

const { Orca50 } = NativeModules;

const events = {};

const eventEmitter = new NativeEventEmitter(Orca50);

Orca50.on = (event, handler) => {
	const eventListener = eventEmitter.addListener(event, handler);

	events[event] =  events[event] ? [...events[event], eventListener]: [eventListener];
};

Orca50.off = (event) => {
	if (Object.hasOwnProperty.call(events, event)) {
		const eventListener = events[event].shift();

		if(eventListener) eventListener.remove();
	}
};

Orca50.removeAll = (event) => {
	if (Object.hasOwnProperty.call(events, event)) {
		eventEmitter.removeAllListeners(event);

		events[event] = [];
	}
}

export default Orca50;
