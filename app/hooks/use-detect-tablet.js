import { useState, useEffect } from "react";

import * as Device from "expo-device";

function useDetectTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    Device.getDeviceTypeAsync().then((deviceType) => {
      if (!isTablet && deviceType === 2) {
        setIsTablet(true);
      }
    });
  }, []);

  return isTablet;
}

export { useDetectTablet };
