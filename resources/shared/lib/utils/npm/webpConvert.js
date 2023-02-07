const imagemin = require('imagemin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const fs = require('fs')
const fsPromises = require('fs').promises
const chokidar = require('chokidar')
const { ncp } = require('ncp')

const src = './resources/shared/assets/images/'
const dest = './public/images/'
const sharp = require('sharp')

const removeBrackets = function (string) {
    const brackets = string.match(/\[(.*?)\]/)
    if (brackets) {
        return string.replace(brackets[0], '')
    }
    return string
}

// creating watcher
const needToWatch = process.argv.indexOf('--webp') !== -1
let watcherObj = null
if (needToWatch) {
    watcherObj = chokidar.watch(src, {
        cwd: '.'
    })
}


// function that will recursively check images directory
const walkSync = function (dir) {
    fsPromises.readdir(dir)
        .then(files => {
            files.forEach((file, index) => {
                const ext = (`${dir}/${file}`).substring((`${dir}/${file}`).lastIndexOf('.') + 1, (`${dir}/${file}`).length)
                if (fs.statSync(`${dir}/${file}`).isDirectory()) {
                    // if file is a directory - open this directory
                    walkSync(`${dir}/${file}`)
                } else if (ext === 'png' || ext === 'jpg') {
                    // else optimize this file and generate webp
                    const filename = (`${dir}/${file}`).replace(/^.*[\\\/]/, '')
                    const matches = filename.match(/\[(.*?)\]/)
                    let width = null
                    if (matches) {
                        width = parseInt(matches[1], 10)
                    }

                    let brackets = (`${dir}/${file}`).match(/\[(.*?)\]/)
                    if (brackets) {
                        brackets = brackets[0]
                    } else {
                        brackets = ''
                    }
                    sharp(`${dir}/${file}`)/* resize and generate webp */
                        .resize({ width })
                        .webp({ quality: 80 })
                        .toFile(`${dir}/${removeBrackets(file).substring(0, removeBrackets(file).lastIndexOf('.'))}.webp`)
                        .then(() => sharp(`${dir}/${file}`)/* resize and output to buffer */
                            .resize({ width })
                            .toBuffer())
                        .then(buffer => {
                            /* write buffer into a file */
                            fsPromises.access(`${dir}/${file}`, fs.constants.F_OK)
                                .then(() => {
                                    if (!brackets) {
                                        fs.writeFileSync(`${dir}/${file}`, buffer)
                                    } else {
                                        fsPromises.rename(`${dir}/${file}`, `${dir}/${removeBrackets(file)}`)
                                            .then(() => {
                                                fs.writeFileSync(`${dir}/${removeBrackets(file)}`, buffer)
                                            })
                                    }
                                })
                                .catch(() => console.error('not exists'))
                        })
                        .then(() => {
                            console.log(`starting optimize ${dir}/${removeBrackets(file)}`)
                        })
                        /* optimize rewrited image */
                        .then(() => imagemin([`${dir}/${removeBrackets(file)}`], {
                            destination: `${dir}/`,
                            plugins: [
                                imageminMozjpeg(),
                                imageminPngquant({
                                    quality: [0.6, 0.8]
                                })
                            ]
                        }))
                        .then(res => {
                            console.log(`image ${dir}/${removeBrackets(file)} optimized`)
                        })
                        .catch(err => {
                            console.log(`Cannot optimize ${dir}/${removeBrackets(file)} image because of an error: \n${err}`)
                        })
                }
            })
        })
}
// entry point
const buildImages = function () {
    // removing existing directory
    fsPromises.rmdir(dest, { recursive: true })
        .then(() => fsPromises.mkdir(dest))
        .then(() => {
            console.log('images folder created')
            ncp(src, dest, () => {
                walkSync(dest.substring(0, dest.length - 1))
            })
        })
}

if (process.argv.indexOf('optimize') !== -1) {
    buildImages()
}

module.exports = buildImages
