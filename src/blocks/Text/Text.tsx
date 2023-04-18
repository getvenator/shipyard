import React, {useId} from "react";
import {BlockComponents} from "../../types";
import {TextBlockConfig, TextBlockSettings} from "./types";

const Text: React.FC<TextBlockConfig> & BlockComponents<TextBlockSettings> = ({ text }) => {
    return (
        <div>
            { text }
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
            <input
                onChange={(event) => onChangeValue('text', event.target.value)}
                id={textId}
                type='text'
                defaultValue={text}
            />
        </div>
    )
}

Text.Settings = Settings
export default Text
