interface HeaderOptions {
  version: string
  match: string[]
  isRelease: boolean
  updateURL?: string
}

const generateHeader = (options: HeaderOptions) => {
  const { version, match, isRelease, updateURL } = options
  return `// ==UserScript==
// @name 🏳️‍⚧️ anti-deadname (PW)
// @description hihi
// @version ${version}-${isRelease ? 'release' : 'dev'}
${generateMatches(match)}
// @grant unsafeWindow
// @grant GM.getValue
// @grant GM_getValue
// @grant GM.setValue
// @grant GM_setValue
// @author Kamila Wojciechowska (@za_raczke)
${updateURL ? `// @updateURL ${updateURL}` : ''}
// ==/UserScript==
`
}

const generateMatches = (match: string[]) => {
  return match.map((m) => `// @match ${m}`).join('\n')
}

export default generateHeader