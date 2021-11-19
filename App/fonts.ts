import AsyncStorage from "@react-native-async-storage/async-storage"

const fonts = {
    openSans_regular:'OpenSans-Regular',
    openSans_bold:'OpenSans-Bold',
    system:'System'
}

const getAppFontEnable = async ():Promise<boolean> => {
    const isAppFontEnable: string|null = await AsyncStorage.getItem('appFontEnable')
    console.log("CSS = ",JSON.parse(isAppFontEnable!))
    return JSON.parse(isAppFontEnable!)
    
}

const setAppFontEnable = async (value: string) => {
    await AsyncStorage.setItem('appFontEnable', value)  
    console.log("Save = ", value);  
}

export {fonts, getAppFontEnable, setAppFontEnable}
