const fs = require('fs')
const crypto = require('crypto')
const { optimize } = require('svgo')
const webfont = require('webfont').default

const fontPath = './public/fonts/icons/'
const srcPath = './resources/shared/assets/icons/template/'
const iconsFolder = './resources/shared/assets/icons'
const filesPath = `${iconsFolder}/**/*.svg`

const generateChecksum = function (str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}

function optimizeIcons() {
    fs.readdir(iconsFolder, (error, files) => {
        files.forEach(fileName => {
            if (~fileName.indexOf('.svg')) {
                const filePath = `${iconsFolder}/${fileName}`
                const file = fs.readFileSync(`${iconsFolder}/${fileName}`)
                const { data } = optimize(file, {
                    path: filePath,
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    // customize default plugin options
                                    removeAttrs: {
                                        attrs: ['version', 'id', 'x', 'y'],
                                    },
                                    inlineStyles: {
                                        onlyMatchedOnce: false,
                                    },
                                },
                            },
                        },
                    ],
                    multipass: true,
                    // js2svg: {
                    //     indent: 4, // string with spaces or number of spaces. 4 by default
                    //     pretty: true, // boolean, false by default
                    // },
                })
                fs.writeFile(filePath, data, error => {})
            }
        })
    })
}

const makeIconfont = function () {
    let existingSelection = null
    if (fs.existsSync(`${srcPath}selection.json`)) {
        existingSelection = JSON.parse(fs.readFileSync(`${srcPath}selection.json`, 'utf8'))
    }

    const selection = {
        icons: [],
    }

    let counter = 0

    webfont({
        files: filesPath,
        template: './resources/shared/lib/utils/npm/template.html.njk',
        templateFontPath: fontPath,
        fontName: 'iconfont',
        formats: ['woff', 'woff2'],
        prependUnicode: true,
        glyphTransformFn: obj => {
            const icon = {}
            icon.unicode = obj.unicode
            const file = fs.readFileSync(obj.path)

            icon.checksum = generateChecksum(file)

            if (
                existingSelection &&
                existingSelection.icons.length > counter &&
                icon.checksum === existingSelection.icons[counter].checksum
            ) {
                console.log(`Иконка ${obj.name} уже добавлена`)
            } else if (existingSelection) {
                const sameIcon = existingSelection.icons.find(el => el.checksum === icon.checksum)
                if (typeof sameIcon !== 'undefined') {
                    const filename = obj.path.replace(/^.*[\\\/]/, '').split('-')
                    const path = `${obj.path.substring(0, obj.path.lastIndexOf('/'))}/`
                    fs.renameSync(
                        `${path}${filename[0]}-${filename[1]}`,
                        `${path}u${sameIcon.unicode[0].charCodeAt(0).toString(16).toUpperCase()}-${filename[1]}`
                    )
                }
            }

            selection.icons.push(icon)
            counter += 1

            return obj
        },
        fontHeight: 600,
        normalize: true,
    })
        .then(result => {
            fs.writeFileSync(`${srcPath}demo.html`, result.template)
            fs.writeFileSync(`${srcPath}selection.json`, JSON.stringify(selection))
            fs.writeFileSync(`${fontPath}iconfont.woff`, result.woff)
            fs.writeFileSync(`${fontPath}iconfont.woff2`, result.woff2)
            return result
        })
        .catch(error => {
            console.log(error)
            throw error
        })
}

optimizeIcons()
makeIconfont()
