export const DEFAULT_SPEED = 54;
export const MIN_SPEED = 0;
export const MAX_SPEED = 90;

export const IS_DESKTOP = window.innerWidth >= 768;

// better sizes are always odd so the plaid pattern looks better
export const BOARD_WIDTH = IS_DESKTOP ? 99 : 19;
export const BOARD_HEIGHT = IS_DESKTOP ? 49 : 29;
export const CELL_SIZE = IS_DESKTOP ? 10 : 14;

export enum CELL_COLORS {
  Live = "black",
  Dead = "white",
  DeadZebra = "rgb(220, 230, 255)",
  Hovering = "lime",
}
