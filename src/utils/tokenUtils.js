export async function getAuthTokenFromAndroid() {
    const xml = await driver.execute('mobile: shell', {
        command: 'run-as',
        args: [
            'com.birlaopusid.contractorportal.uat',
            'cat',
            'shared_prefs/auth.xml'
        ]
    });

    console.log("🔍 AUTH PREF XML:\n", xml);
    return xml;
}

export function extractToken(xml) {
    const match = xml.match(/<string name="authorization">(.*?)<\/string>/);

    if (!match) {
        throw new Error("❌ Authorization token not found in shared_prefs");
    }

    return match[1];
}
