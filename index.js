const Person = require('./Person');
const db = [];

const http = require('http');
/**
 * Si la requete HTTP est en POST,
 * dans ce cas, ne rien retourner. Attention, il faut quand meme répondre!
 *
 * Si la requette HTTP est en GET,
 * dans ce cas, retourner la liste des utilisateurs créés
 */

const server = http.createServer((request, response) => {
    const method = request.method;


    if (method == 'POST') {
        const bucket = [];
        response.statusCode = 404;
        request.on('data', (chunk) => {
            bucket.push(chunk);
        });

        request.on('end', ()=> {
            const data = bucket.toString();
            let obj = null;
            try {
                obj = JSON.parse(data);
                if (!obj.name || !obj.age)
                    throw new Error();
            }
            catch (e) {
                return response.end('tocard');
            }

            let p = new Person(obj.name, obj.age);
            db.push(p);
            return response.end();
        });

    }
    else if (method === 'GET') {
        response.setHeader('content-type', 'application/json');
        response.end(JSON.stringify(db));
    }
});

console.log('Listening on port ', 8080);
server.listen(8080);