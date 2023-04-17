import React, {useId} from "react";
import {BlockComponents} from "../../types";
import {TextBlockConfig, TextBlockSettings} from "./types";

const Text: React.FC<TextBlockConfig> & BlockComponents<TextBlockSettings> = () => {
    return (
        <div>
            Component
        </div>
    )
}

const Settings: React.FC<TextBlockSettings> = (
    {
        onChangeValue,
        text,
        textColour,
        backgroundColour,
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        align
    }) => {
    const textId = useId()

    return (
        <div>
            <h2>Text block settings</h2>

            <label>Text</label>
            <input id={textId} type='text' />
        </div>
    )
}

Text.Settings = Settings
export default Text
