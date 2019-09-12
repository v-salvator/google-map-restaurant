import { useEffect, useRef } from "react";

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useMapInfoHasDiff = mapInfo => {
  const preMapInfo = usePrevious(mapInfo);
  if (mapInfo && preMapInfo) {
    let hasDiff = false;
    if (preMapInfo.center.lat !== mapInfo.center.lat) {
      hasDiff = true;
    }
    if (preMapInfo.center.lng !== mapInfo.center.lng) {
      hasDiff = true;
    }
    if (preMapInfo.zoom !== mapInfo.zoom) {
      hasDiff = true;
    }
    if (preMapInfo.size.width !== mapInfo.size.width) {
      hasDiff = true;
    }
    if (preMapInfo.size.height !== mapInfo.size.height) {
      hasDiff = true;
    }
    return hasDiff;
  }
};
