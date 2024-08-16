import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import { render } from 'ejs';
import { features } from 'process';


const app = express();
const port = 3000;


let navBar = ['Home', 'Contact'];
let blogs = [];
updateBlogs();

let uiData = {
    navBar: navBar,
    blogs: blogs,
}

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index.ejs', uiData);
})

app.get('/Create_New_Blog', (req, res) => {
    res.render('newBlog.ejs');
})


app.post('/Update', (req, res) => {
    createNewFile(req.body.data.title, req.body.data.content);
})

app.post('/Delete', (req, res) => {
    var position = blogs.indexOf(req.body.data); 
    deleteFile(req.body.data);
    blogs.splice(position, 1);
    console.log(blogs);
})

app.post('/Old_Blog', (req, res) => {
    res.render('index.ejs', {
        navBar: navBar, 
        blogs: blogs, 
        newBlog: req.body.title
    });
})

app.post('/', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    createNewFile(title, content);
    blogs.push(title);

    setTimeout( () => {
        res.render('index.ejs', {
            navBar: navBar, 
            blogs: blogs, 
            newBlog: title
        });
    }, 500)
    
})

app.listen(port, () => {
    console.log('http://localhost:3000/');
})

function createNewFile (fileName, content) {
    fs.writeFile(`./views/partials/${fileName.replaceAll(' ', '_')}.ejs`,
        `<div class="content">
            <h1>${fileName}</h1>            
            <p class="description" contenteditable="false">${content}</p>
             <%- include('../edit.ejs') %>
        </div>`
    , (err) => {
        if(err) throw err;
    })
}

function deleteFile (fileName) {
    fs.unlink(`./views/partials/${fileName.replaceAll(' ', '_')}.ejs`, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(err);
        }
    })
} 

function updateBlogs () {
    fs.readdir('./views/partials', (err, files) => {
        for(var i = 0; i < files.length; i++) {
            var fileName = files[i].replaceAll('_', ' ').substring(0, files[i].length-4); 
            blogs.push(fileName);
        }
    })
}

