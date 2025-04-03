import { SwipeableConfig, SwipeFollowThrough, SwipeSingleDirection, SwipeThreshold } from './types.public'

export type ResolvedConfig = {
	direction: SwipeSingleDirection[];
	customPropertyPrefix: SwipeableConfig['customPropertyPrefix'];
	threshold: SwipeThreshold;
	allowFlick: NonNullable<Exclude<SwipeableConfig['allowFlick'], boolean>>;
	followThrough: Required<SwipeFollowThrough> & { enabled: boolean };
	enabled: boolean;
	disableTouchEvents: boolean;
}

export type PointerCoordinate = {
	x: number;
	y: number;
};

