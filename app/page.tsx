'use client'

import React, {useCallback, useState} from "react";
import styled from "styled-components";
import {Block, BlockId} from "@/types";
import {Text} from "../blocks";
import {isTextBlock, TextBlock} from "@/blocks/Text/types";
import {useImmer} from "use-immer";
import useRenderEmail from "@/hooks/useRenderEmail";
import Button from "@/components/Button";

export default function Home() {
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
    const {renderAsHtml, renderPreview} = useRenderEmail(blocks)
    const onClickSend = async () => {
        fetch('/api/send-test-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                html: renderAsHtml(),
                to: 'gatesofandaron10@gmail.com'
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));

        console.log('success')
    }


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

    return (
        <>
            <Navbar>
                <h2>Shipyard</h2>
                <Actions>
                    <Button onClick={onClickSend}><ion-icon name="desktop"></ion-icon></Button>
                    <Button onClick={onClickSend}><ion-icon name="phone-portrait"></ion-icon></Button>
                    <Button onClick={onClickSend}><ion-icon name="add"></ion-icon> Add block</Button>
                    <Button onClick={onClickSend}><ion-icon name="send"></ion-icon> Send test email</Button>
                </Actions>
            </Navbar>
            <StyledApp>
                {renderPreview()}

                <div>
                    <Sidebar>
                        {renderDynamicBlockSettings()}
                    </Sidebar>
                </div>
            </StyledApp>
        </>
    )
}

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  height: 60px;
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  padding: 16px;
  box-sizing: border-box;
`

const Sidebar = styled.div`
  background: white;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 12px;
  display: flex;
  min-width: 400px;
  padding: 12px 24px 24px 24px;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`
