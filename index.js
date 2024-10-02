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

    const id = url.split('/') [2]

    if (url === '/grades' && method === 'GET') {
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(grades)) // tranformando meu objeto em json
    } else if (url === '/grades'  && method === 'POST') {
      const {studantName, subject, grade } = JSON.parse(body)
      const newGrade = {id: v4() ,studantName, subject, grade }
      grades.push(newGrade)
      response.writeHead(201, {'Content-Type': 'application/json'})
      response.end(JSON.stringify(newGrade)) // tranformando meu objeto em json

    } else if (url.startsWith('/grades/') && method === "PUT") {
      const {studantName, subject, grade } = JSON.parse(body)
      const gradeToUpdate = grades.find((g) => g.id === id)
      if (gradeToUpdate) {
        gradeToUpdate.studantName = studantName
        gradeToUpdate.subject = subject
        gradeToUpdate.grade = grade
        response.writeHead(200,  {'Content-Type': 'application/json'} )
         response.end(JSON.stringify(gradeToUpdate)) // tranformando meu objeto em json

      } else {
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: 'Route not found'}))
      }


    }

    else if (url.startsWith('/grades/') && method === "DELETE"){
      const index = grades.findIndex((g)=> g.id === id)

      if (index !== -1) {
        grades.splice(index, 1)
        response.writeHead(204)
        response.end()
      } else {
        response.writeHead(404, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({message: 'Route not found'}))
      }
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