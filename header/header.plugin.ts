interface HeaderOptions {
  version: string
  match: string[]
  isRelease: boolean
  updateURL?: string
}

// Generates the userscript header
const generateHeader = (options: HeaderOptions) => {
  const { version, match, isRelease, updateURL } = options
  return `// ==UserScript==
// @name ${isRelease ? '' : '(DEV) '}🏳️‍⚧️ anti-deadname (PW)
// @description Replace your deadname with your chosen name on WUT websites (USOS PW, Leon, Studia3, Studia2)
// @version ${version}-${isRelease ? 'release' : 'dev'}
${generateMatches(match)}
// @grant unsafeWindow
// @grant GM.getValue
// @grant GM_getValue
// @grant GM.setValue
// @grant GM_setValue
// @author Kamila Wojciechowska (@za_raczke)
// @run-at document-idle
${updateURL ? `// @updateURL ${updateURL}` : ''}
// ==/UserScript==
`
}

const generateMatches = (match: string[]) => {
  return match.map((m) => `// @match ${m}`).join('\n')
}

export default generateHeader