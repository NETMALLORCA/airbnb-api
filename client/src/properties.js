(async()=>{
const fs= require ('fs/promises')
const file = await fs.readFile('../data/inside-airbnb-filter.json', 'utf8')
const parsedFile = JSON.parse(file);
const properties = parsedFile.map(property =>{

  property.price = property.price ? property.price.replace('$', '').replace(',', '') : ''

  return Object.entries(property).reduce((acc, [key, value]) =>{
      acc[key] = value.trim() === '' ? null : value
      return acc
  }, {})
})

const response = await fetch('http://127.0.0.1:8080/api/admin/properties', {
  headers: {
      "Content-Type": "application/json"
  },
  method: 'POST',
  body: JSON.stringify(properties)
})

const result = await response.json()
console.log(result)

})()