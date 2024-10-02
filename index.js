import http from 'http'
import { v4 } from 'uuid'

const port = 3000
const grades = []

const server = http.createServer((request, response)=>{
  const {method, url} = request
  let body = ''

  request.on('data', chuck => {
    body += chuck.toString()
  })

  request.on('end', ()=> {
    if (url === '/grades' && method === 'GET') {
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(grades)) // tranformando meu objeto em json
    } else if (url === '/grades'  && method === 'POST') {
      const {studantName, subject, grade } = JSON.parse(body)
      const newGrade = {id: v4() ,studantName, subject, grade }
      grades.push(newGrade)
      response.writeHead(201, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(newGrade)) // tranformando meu objeto em json

    }
    else {
      response.writeHead(404, {'Content-Type': 'application/json'})
      response.end(JSON.stringify({message: 'Route not found'})) // tranformando meu objeto em json
    }
  })

})

server.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
})