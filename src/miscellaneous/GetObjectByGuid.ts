// This file was generated by Mendix Modeler.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

/**
 * @param {string} objectGuid
 * @param {string} objectSample
 * @returns {MxObject}
 */
function GetObjectByGuid(objectGuid: string, objectSample: mendix.lib.MxObject): Promise<mendix.lib.MxObject> {
    // BEGIN USER CODE
    if (!objectGuid) {
        throw new TypeError("Input parameter 'objectGuid' is required.");
    }

    if (!objectSample) {
        throw new TypeError("Input parameter 'objectSample' is required.");
    }

    return new Promise((resolve, reject) => {
        mx.data.get({
            guid: objectGuid,
            callback: object => {
                if (object) {
                    resolve(object);
                } else {
                    reject();
                }
            }
        });
    });
    // END USER CODE
}
