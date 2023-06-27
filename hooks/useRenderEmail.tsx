import {Block} from "@/types";
import {Html} from "@react-email/html";
import {Head} from "@react-email/head";
import {Preview} from "@react-email/preview";
import React from "react";
import {isTextBlock} from "@/blocks/Text/types";
import {Text} from "@/blocks";
import {render} from "@react-email/render";

const useRenderEmail = (blocks: Block[]) => {
    const renderAsReact = () => {
        const renderedBlocks = blocks.map((block) => {
            if (isTextBlock(block)) {
                return <Text key={block.id} {...block.config} />
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

    return {
        renderAsReact,
        renderAsHtml,
    }
}

export default useRenderEmail
