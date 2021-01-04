import { defaults, error } from "@pnotify/core";
// import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";

import "@pnotify/core/dist/Material.css";

defaults.styling = "material";
defaults.icons = "material";

function errorsNotifications(title, text) {
  error({
    title: title,
    text: text,
  });
}

export default errorsNotifications;
