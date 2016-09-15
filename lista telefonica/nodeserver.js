//Lets require/import the HTTP module
var http = require('http');
var dispatcher = require('httpdispatcher');
var fs = require('fs');
var index = fs.readFileSync('index.html');

//Lets define a port we want to listen to
const PORT=8080;
var contatos = [
  {nome: 'Leonel Azevedo', telefone: "9222-3547", criacao: new Date()},
                      {nome: 'Darlan del Marco', telefone: "9712-3547", criacao: new Date()},
                      {nome: 'Megan Desconhecida', telefone: "9112-1547", criacao: new Date()},
                      {nome: 'Carlos Ricardo Müller', telefone: "9713-3547", criacao: new Date()},
                      {nome: 'Luan Teste', telefone: "9713-4547", criacao: new Date()}
];

var operadoras = [
	{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
	{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
	{nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
	{nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
	{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2}
];

function handleRequest(request, response){
    try {

        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}


dispatcher.setStatic('resources');



dispatcher.onGet("/contatos", function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(contatos));
    console.log(contatos);
});

dispatcher.onGet("/index", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

dispatcher.onGet("/operadoras", function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(operadoras));

});


dispatcher.onPost("/adicionar-contato", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    contatos.push(JSON.parse(req.body));
    res.end('contato adicionado');
});


dispatcher.onPost("/remover-contato", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('contato removido');
});


//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
