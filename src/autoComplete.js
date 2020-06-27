import { generateList, closeAllLists } from "./controllers/listController";
import { navigate, focusState } from "./controllers/navigationController";
import { prepareData } from "./controllers/dataController";

export default class autoComplete {
  constructor(config) {
    // Deconstructing config values
    const {
      selector = inputField,
      data: { src, cached },
    } = config;

    // Assigning config values to properties
    this.inputField = selector;
    this.data = {
      src,
      cached,
    };
    // Invoking preInit automatically
    // when autoComplete.js instance gets initiated
    this.preInit();
  }

  // Initialize autoComplete.js processes
  init(event, inputField, data) {
    // 1- Close all open lists
    closeAllLists(false, inputField);
    // If input field empty STOP here
    if (!event.target.value) return false;
    // 2- Reset focus state
    focusState(-1);
    // 3- Generate & Render results list
    generateList(data, event, inputField);
    // 4- Initialize navigation
    navigate(inputField);
    // 5- Listen for all clicks in the document
    document.addEventListener("click", (event) => {
      // 6- Close all this menu if clicked
      // outside the menu and input field
      closeAllLists(event.target, inputField);
    });
  }

  // Pre-Initialization stage
  preInit() {
    // If data source
    // set to be cached
    if (this.data.cached) {
      // 1- Prepare the data
      prepareData(this.data.src, (data) => {
        // 2- Listen for all clicks in the input field
        this.inputField.addEventListener("input", (event, inputField = this.inputField) => {
          // 3- Initialize autoComplete.js processes
          this.init(event, inputField, data);
        });
      });
      // Else if data source
      // set to be streamlined
    } else {
      // 1- Listen for all clicks in the input field
      this.inputField.addEventListener("input", (event, inputField = this.inputField) => {
        // 2- Prepare the data
        prepareData(this.data.src, (data) => {
          // 3- Initialize autoComplete.js processes
          this.init(event, inputField, data);
        });
      });
    }
  }
}
