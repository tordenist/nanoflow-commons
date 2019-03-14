// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

import { GeolocationError, GeolocationReturnType, GeoOptions } from "react-native";

/**
 * @param {Big} timeout - The maximum length of time (in milliseconds) the device is allowed to take in order to return a location.
 * @param {Big} maximumAge - The maximum age (in milliseconds) of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. By default the device will always return a cached position regardless of its age.
 * @param {boolean} highAccuracy - Use a higher accuracy method to determine the current location. Disabling this saves battery life.
 * @returns {MxObject}
 */
function GetCurrentLocation(
    timeout?: BigJs.Big,
    maximumAge?: BigJs.Big,
    highAccuracy?: boolean
): Promise<mendix.lib.MxObject> {
    // BEGIN USER CODE

    return new Promise((resolve, reject) => {
        const options = getOptions();
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        function onSuccess(position: GeolocationReturnType): void {
            mx.data.create({
                entity: "NanoflowCommons.Geolocation",
                callback: mxObject => {
                    const geolocation = mapPositionToMxObject(mxObject, position);
                    resolve(geolocation);
                },
                error: () => {
                    reject("Could not create 'NanoflowCommons.Geolocation' object to store location");
                }
            });
        }

        function onError(error: GeolocationError): void {
            return reject(error.message);
        }

        function getOptions(): GeoOptions {
            const timeoutNumber = timeout && Number(timeout.toString());
            const maximumAgeNumber = maximumAge && Number(maximumAge.toString());

            return {
                timeout: timeoutNumber,
                maximumAge: maximumAgeNumber,
                enableHighAccuracy: highAccuracy
            };
        }

        function mapPositionToMxObject(
            mxObject: mendix.lib.MxObject,
            position: GeolocationReturnType
        ): mendix.lib.MxObject {
            mxObject.set("Timestamp", new Date(position.timestamp));
            mxObject.set("Latitude", String(position.coords.latitude));
            mxObject.set("Longitude", String(position.coords.longitude));
            mxObject.set("Accuracy", String(position.coords.accuracy));
            if (position.coords.altitude != null) {
                mxObject.set("Altitude", String(position.coords.altitude));
            }
            if (position.coords.altitudeAccuracy != null && position.coords.altitudeAccuracy !== -1) {
                mxObject.set("AltitudeAccuracy", String(position.coords.altitudeAccuracy));
            }
            if (position.coords.heading != null && position.coords.heading !== -1) {
                mxObject.set("Heading", String(position.coords.heading));
            }
            if (position.coords.speed != null) {
                mxObject.set("AltitudeAccuracy", String(position.coords.speed));
            }
            return mxObject;
        }
    });

    // END USER CODE
}
