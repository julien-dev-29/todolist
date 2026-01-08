import { getState, setState } from "../../app/store";

export function toggleDrawer() {
  setState({ drawerOpen: !getState().drawerOpen });
}

export function closeDrawer() {
  setState({ drawerOpen: false });
}
