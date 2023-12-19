import html from '../utils/para_html'

const matchTableCellByColumnName = (table_selector: string, column_name: string) => {
    // Find a tr where the first td contains the column name
    // Return the second td
    const table = html.selector(table_selector)
    const rows = table.selectorAll('tr')
    for (const row of rows) {
        const cells = row.selectorAll('td')
        if (cells.length < 2) {
            continue
        }
        if (cells[0].textContent === column_name) {
            return cells[1]
        }
    }
}

export default matchTableCellByColumnName