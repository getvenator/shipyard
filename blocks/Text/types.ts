import {Block, BaseBlockConfig, OnChangeValue} from "../../types";

export interface TextBlock extends Block {
    type: 'Text'
    config: TextBlockConfig
}

export interface TextBlockConfig extends BaseBlockConfig {
    text: string
    fontWeight: number
    fontSize: number
    align: 'left' | 'center' | 'right'
    lineHeight: number
    letterSpacing: number
    textColour: string
    backgroundColour: string
}

export interface TextBlockSettings extends TextBlockConfig {
    onChangeValue: OnChangeValue<TextBlockConfig>
}

export const isTextBlock = (block: Block): block is TextBlock => block.type === 'Text'
