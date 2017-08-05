export const LAYOUT_OPEN_MENU = 'LAYOUT_OPEN_MENU';
export const LAYOUT_CLOSE_MENU = 'LAYOUT_CLOSED_MENU';
export const LAYOUT_TOGGLE_MENU = 'LAYOUT_TOGGLE_MENU';

export const LAYOUT_TOGGLE_SIDE = 'LAYOUT_TOGGLE_SIDE';
export const LAYOUT_OPEN_SIDE = 'LAYOUT_OPEN_SIDE';
export const LAYOUT_CLOSE_SIDE = 'LAYOUT_CLOSE_SIDE';
export const LAYOUT_SET_CONTENT = 'LAYOUT_SET_CONTENT';

// MainMenu Actions
export function layoutToggleMenu() {
  return { type: LAYOUT_TOGGLE_MENU };
}

export function layoutOpenMenu() {
  return { type: LAYOUT_OPEN_MENU };
}

export function layoutCloseMenu() {
  return { type: LAYOUT_CLOSE_MENU };
}