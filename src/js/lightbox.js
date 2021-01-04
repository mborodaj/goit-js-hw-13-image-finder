import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

function onImgClick(event) {
  if (event.target.tagName === "IMG") {
    const fullSizeImg = event.target.dataset.fullsizeimage;
    console.log(event.target.dataset.fullsizeimage);
    const instance = basicLightbox.create(`
                <img src="${fullSizeImg}" />
              `);
    instance.show();
  }
}

export default onImgClick;
