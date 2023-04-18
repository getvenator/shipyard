import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {Block, BlockId} from "./types";
import {Text} from "./blocks";
import {isTextBlock, TextBlock} from "./blocks/Text/types";
import {useImmer} from "use-immer";
import {Html} from "@react-email/html";
import {Head} from "@react-email/head";
import {Preview} from "@react-email/preview";

const App: React.FC = () => {
    const [blocks, setBlocks] = useImmer<Block[]>([
        {
            id: '1',
            type: 'Text',
            config: {
                text: 'Hello world'
            }
        } as TextBlock
    ])
    const [settingsBlock, setSettingsBlock] = useState<BlockId | null>('1')

    const renderDynamicBlockSettings = useCallback(() => {
        const block = blocks.find((block) => block.id === settingsBlock)

        if (!block) {
            // todo: return global settings
            return null
        }

        if (isTextBlock(block)) {
            return (
                <Text.Settings
                    onChangeValue={(key, value) => {
                        // todo: abstract this out
                        setBlocks((draft) => {
                            const newBlock = draft.find((draftBlock) => draftBlock.id === block.id) as TextBlock;
                            newBlock.config[key] = value;
                        });
                    }}
                    {...block.config}
                />
            )
        }
    }, [blocks, setBlocks, settingsBlock])

    const renderEmail = useCallback(() => {
        const renderedBlocks = blocks.map((block) => {
            if (isTextBlock(block)) {
                return <Text {...block.config} />
            }

            return null;
        })

        return (
            <Html lang="en" dir="ltr">
                <Head />
                <Preview>
                    {/*todo*/}
                    This is a preview of your email
                </Preview>
                {renderedBlocks}
            </Html>
        )
    }, [blocks])

    return (
        <StyledApp>
            {renderEmail()}

            <Sidebar>
                {renderDynamicBlockSettings()}
            </Sidebar>
        </StyledApp>
    )
}

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #f5f5f5;
  height: 100%;
  justify-content: space-between;
  padding: 12px;
  box-sizing: border-box;
`

const Sidebar = styled.div`
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 12px;
  display: flex;
  min-width: 400px;
`

export default App;
