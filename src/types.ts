import React from "react";

export type BlockType = 'Text'

export type BlockId = string

export type PropertyType<T, K extends keyof T> = T[K];

export type OnChangeValue<T> = <K extends keyof T>(
    key: K,
    value: PropertyType<T, K>
) => void;

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
