export function provideFunc() {
    return {
        provide: {
            $device: {
                size: {
                    maxMobile: false,
                    maxMobileLate: false,
                    maxTablet: false,
                    tablet: false,
                    tabletLate: false,
                    desktop: true,
                },
                type: {
                    desktop: true,
                    mobile: false,
                },
            },
        },
    }
}

export function textControl(): argumentTypes {
    return {
        control: {
            type: 'text',
        },
        table: {
            type: {
                summary: 'string',
            },
        },
    }
}

export function arrayControl(): argumentTypes {
    return {
        control: {
            type: 'array',
        },
        defaultValue: [],
    }
}

export function selectControl(args: (string | boolean | null | number)[]): argumentTypes {
    return {
        control: {
            type: 'select',
            options: args,
        },
        defaultValue: args[0],
        table: {
            type: {
                summary: args.join(' | '),
            },
        },
    }
}

export function booleanControl(): argumentTypes {
    return {
        control: {
            type: 'boolean',
        },
        defaultValue: false,
    }
}

export function numberControl() {
    return {
        control: {
            type: 'number',
        },
        defaultValue: 1,
    }
}

export function defineControls<
    ShortType = string | boolean,
    LongType = { type?: 'array' | 'select'; value: string | boolean | (string | null)[] }
>(params: Record<string, LongType | ShortType>): Record<string, argumentTypes> {
    const result: Record<string, argumentTypes> = {}

    Object.entries(params).forEach(([name, option]) => {
        if (typeof option !== 'object') {
            if (typeof option === 'string') {
                result[name] = textControl()
            } else if (typeof option === 'boolean') {
                result[name] = booleanControl()
            }
        } else if (Array.isArray(option)) {
            result[name] = selectControl(option)

            // @ts-ignore
        } else if (option?.value) {
            // @ts-ignore
            if (typeof option.value === 'string' && option.value === '') {
                result[name] = textControl()
                // @ts-ignore
            } else if (option.type === 'array') {
                result[name] = arrayControl()
                // @ts-ignore
            } else if (option.type === 'select' && Array.isArray(option.value)) {
                // @ts-ignore
                result[name] = selectControl(option.value)
                // @ts-ignore
            } else if (typeof option.value === 'boolean') {
                result[name] = booleanControl()
            }
        }
    })

    return result
}

export const bind = <Props>(template: any): { args: Props } => template.bind({})
