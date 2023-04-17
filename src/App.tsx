import React, {useState} from "react";
import styled from "styled-components";
import {Block, BlockId} from "./types";
import {Text} from "./blocks";
import {isTextBlock, TextBlock} from "./blocks/Text/types";

const renderDynamicBlock = (block: Block) => {
    if (isTextBlock(block)) {
        return <Text {...block.config} />
    }

    return null;
}

const renderDynamicBlockSettings = (block: Block) => {
    if (isTextBlock(block)) {
        return <Text.Settings onChangeValue={() => {}} {...block.config} />
    }

    return null;
}

const App: React.FC = () => {
    const [blocks, setBlocks] = useState<Block[]>([
        {
            id: '1',
            type: 'Text',
            config: {
                text: 'Hello world'
            }
        } as TextBlock
    ])
    const [settingsBlock, setSettingsBlock] = useState<BlockId | null>('1')

    return (
        <StyledApp>
            {blocks.map((block) => (
                <div key={block.id}>
                    {renderDynamicBlock(block)}
                </div>
            ))}

            <Sidebar>
                Sidebar
                {/*Render config*/}
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
