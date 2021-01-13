const rootStyles = window.getComputedStyle(document.documentElement);
const coverWidth = rootStyles.getPropertyValue("--book-cover-width-large");

if (coverWidth && coverWidth !== "") {
    ready();
} else {
    document.querySelector("#main-css").addEventListener("load", ready);
}

function ready() {
    const coverWidthParsed = parseFloat(coverWidth);
    const coverAspectRatioParsed = parseFloat(
        rootStyles.getPropertyValue("--book-cover-aspect-ratio")
    );
    const coverHeightParsed = coverWidthParsed / coverAspectRatioParsed;

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode
    );

    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatioParsed,
        imageResizeTargetWidth: coverWidthParsed,
        imageResizeTargetHeight: coverHeightParsed,
    });

    FilePond.parse(document.body);
}
