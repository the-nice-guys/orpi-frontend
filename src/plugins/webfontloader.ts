export async function loadFonts () {
    // @ts-ignore
    const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

    webFontLoader.load({
        google: {
            families: ['Roboto:100,300,400,500,700,900&display=swap'],
        },
    })
}
