import React from "react";

export type BlockType = 'Text'

export type BlockId = string

export interface BaseBlockConfig {
    paddingLeft: number
    paddingRight: number
    paddingTop: number
    paddingBottom: number
}

export interface Block {
    id: BlockId
    type: BlockType
    config: BaseBlockConfig
}

export interface BlockComponents<T> {
    Settings: React.FC<T>
}

export interface BaseSettings extends BaseBlockConfig {
    onChangeValue: (key: string, value: any) => void
}
