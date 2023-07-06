import {Block} from "@/types";
import {Html} from "@react-email/html";
import {Head} from "@react-email/head";
import {Preview} from "@react-email/preview";
import React from "react";
import {isTextBlock} from "@/blocks/Text/types";
import {Text} from "@/blocks";
import {render} from "@react-email/render";
import styled from "styled-components";

const useRenderEmail = (blocks: Block[]) => {
    const renderAsReact = () => {
        const renderedBlocks = blocks.map((block) => {
            if (isTextBlock(block)) {
                return (
                    <Text key={block.id} {...block.config} />
                )
            }

            return null;
        })

        return (
            <Html lang="en" dir="ltr">
                <Head/>
                <Preview>
                    {/*todo*/}
                    This is a preview of your email
                </Preview>
                {renderedBlocks}
            </Html>
        )
    }
    const renderAsHtml = () => {
        const template = renderAsReact()

        return render(template, {
            pretty: true,
        })
    }

    const renderPreview = () => {
        const renderedBlocks = blocks.map((block) => {
            if (isTextBlock(block)) {
                return (
                    <BlockWrapper key={block.id}>
                        <Text {...block.config} />
                    </BlockWrapper>
                )
            }

            return null;
        })

        return (
            <BlocksWrapper>
                {renderedBlocks}
            </BlocksWrapper>
        )
    }

    return {
        renderAsReact,
        renderAsHtml,
        renderPreview,
    }
}

const BlocksWrapper = styled.div`
  width: 100%;
`

const BlockWrapper = styled.div`
  width: 100%;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #000;
  }
`

export default useRenderEmail
