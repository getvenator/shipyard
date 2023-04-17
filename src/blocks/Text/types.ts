import {Block, BaseSettings, BaseBlockConfig} from "../../types";

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
    onChangeValue: (key: keyof TextBlock, value: any) => void
}

export const isTextBlock = (block: Block): block is TextBlock => block.type === 'Text'
