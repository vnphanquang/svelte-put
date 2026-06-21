import {
	SwipeableConfig,
	SwipeFollowThrough,
	SwipeSingleDirection,
	SwipeThreshold,
} from './types.public';

export type ResolvedConfig = {
	direction: SwipeSingleDirection[];
	customPropertyPrefix: SwipeableConfig['customPropertyPrefix'];
	threshold: SwipeThreshold;
	allowFlick: NonNullable<Exclude<SwipeableConfig['allowFlick'], boolean>>;
	followThrough: {
		enabled: boolean;
		easing: (t: number) => number;
		duration: number;
		container?: SwipeFollowThrough['container'];
	};
	enabled: boolean;
	disableTouchEvents: boolean;
};

export type PointerCoordinate = {
	x: number;
	y: number;
};
