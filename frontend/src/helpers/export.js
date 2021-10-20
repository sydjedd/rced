async function exportXLS (tableName = '', tableContent = '') {
  const date = new Date()
  tableName = (tableName.slice(0, 2) + '-' + tableName.slice(2)).toUpperCase()
  const timestamp = date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2) + '' + ('0' + date.getHours()).slice(-2) + '' + ('0' + date.getMinutes()).slice(-2) + '' + ('0' + date.getSeconds()).slice(-2)
  const nomfichier = tableName + '_' + timestamp + '.xls'
  const table =
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>' + tableName + '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body>' +
    tableContent
      .replace(/[\r\n]/g, '') // suppression des \r (fin de ligne) et \n (nouvelle ligne)
      .replace(/> +/g, '>') // suppression des blancs apres une balise html
      .replace(/ +</g, '<') // suppression des blancs avant une balise html
      .replace(/class="[^"]*primary[^"]*"/g, 'style="background-color:rgb(25,118,210);color:rgb(255,255,255)"') + // ajouter le css
    '</body></html>'
  const lien = document.createElement('a')
  lien.href = 'data:application/vnd.ms-excel;base64,' + window.btoa(unescape(encodeURIComponent(table)))
  lien.download = nomfichier
  document.body.appendChild(lien)
  lien.click()
  lien.remove()
}

export default {
  exportXLS
}
