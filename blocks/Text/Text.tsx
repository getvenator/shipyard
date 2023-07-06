import React, {useId, useState} from "react";
import {BlockComponents} from "../../types";
import {TextBlockConfig, TextBlockSettings} from "./types";
import {Text as ReactEmailText} from "@react-email/text";
import {RangeSlider} from "flowbite-react";
import styled from "styled-components";
import clsx from "clsx";

const Text: React.FC<TextBlockConfig> & BlockComponents<TextBlockSettings> = ({text}) => {
    return (
        <ReactEmailText>
            {text}
        </ReactEmailText>
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
    const topPaddingId = useId()
    const leftPaddingId = useId()
    const rightPaddingId = useId()
    const bottomPaddingId = useId()
    const [selectedTab, setSelectedTab] = useState(0)

    return (
        <>
            <div>
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">Select a tab</label>
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                        {/*todo*/}
                        <option>Font</option>
                        <option>Section</option>
                    </select>
                </div>
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 justify-center" aria-label="Tabs">
                            <a href="#"
                               onClick={() => setSelectedTab(0)}
                               className={
                                   clsx('whitespace-nowrap py-4 px-1 text-sm font-medium', {
                                       'border-blue-500 text-blue-600 border-b-2': selectedTab === 0,
                                       'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 border-b-2': selectedTab !== 0
                                   })
                               }
                            >
                                Font
                            </a>
                            <a href="#"
                               onClick={() => setSelectedTab(1)}
                               className={
                                   clsx('whitespace-nowrap py-4 px-1 text-sm font-medium', {
                                       'border-blue-500 text-blue-600 border-b-2': selectedTab === 1,
                                       'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 border-b-2': selectedTab !== 1
                                   })
                               }
                            >
                                Section
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            <SettingsColumn>
                { selectedTab === 0 ? (
                    <>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Text
                            </label>
                            <div className="mt-2">
                                <input
                                    id={textId}
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    onChange={(event) => onChangeValue('text', event.target.value)}
                                    defaultValue={text}
                                />
                            </div>
                        </div>
                    </>
                ) : null}

                { selectedTab === 1 ? (
                    <>
                        <div>
                            <div className="mb-1 block">
                                <label
                                    htmlFor={topPaddingId}
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Top Padding
                                </label>
                            </div>
                            <RangeSlider
                                id={topPaddingId}
                                min={0}
                                step={4}
                                max={128}
                            />
                        </div>

                        <div>
                            <div className="mb-1 block">
                                <label
                                    htmlFor={rightPaddingId}
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Right Padding
                                </label>
                            </div>
                            <RangeSlider
                                id={rightPaddingId}
                                min={0}
                                step={4}
                                max={128}
                            />
                        </div>

                        <div>
                            <div className="mb-1 block">
                                <label
                                    htmlFor={bottomPaddingId}
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Bottom Padding
                                </label>
                            </div>
                            <RangeSlider
                                id={bottomPaddingId}
                                min={0}
                                step={4}
                                max={128}
                            />
                        </div>

                        <div>
                            <div className="mb-1 block">
                                <label
                                    htmlFor={leftPaddingId}
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Left Padding
                                </label>
                            </div>
                            <RangeSlider
                                id={leftPaddingId}
                                min={0}
                                step={4}
                                max={128}
                            />
                        </div>
                    </>
                ) : null}
            </SettingsColumn>
        </>
    )
}

const SettingsColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`

Text.Settings = Settings
export default Text
