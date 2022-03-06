import history from "history/history";

const NavigationService = {
  navigateToPath(path, state) {
    history.push(path, state);
  },
  replacePath(path, state) {
    history.replace(path, state);
  },
  back() {
    history.goBack();
  },
};

export default NavigationService;
