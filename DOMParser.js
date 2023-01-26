
const example = document.querySelector('.example')

const parser = new DOMParser();
const doc = parser.parseFromString(`
<html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        <h2 class="title">Hello WORLD!!</h2>
        <p class="description">Let's go learn JavaScript</p>
    </body>
</html>

`, "text/html")

const title = doc.querySelector('.title')
example.textContent = title.textContent

