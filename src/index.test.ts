const getHashes = require('./index');

describe('getHashes()', () => {
    test('should generate hashes', () => {
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="style.css" rel="stylesheet" />
            <style>
                body {
                    color: black;
                    background-color: white;
                    position: relative;
                    padding: 0;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script>
                console.log('Hello world!');
            </script>
            <script src="script.js"></script>
        </body>
        </html>`;

        expect(getHashes(html)).toEqual({
            scripts: [
                "'sha256-WfbDJrehkbLrWWNbtBwm0OHMOHGbfKTgzLbJ2PR5zi0='",
            ],
            styles: [
                "'sha256-y5PsLnb9bNH3020OrNE6U5b5V3JF18lOO0gELs3jmiY='"
            ],
        });
    });

    test('should works with empty page', () => {
        const html = '';

        expect(getHashes(html)).toEqual({
            scripts: [],
            styles: [],
        });
    });

    test('should ignore external scripts', () => {
        const html = `
    <script src="index.js"></script>
    <script type="text/javascript" src="index.js"></script>
    `;

        expect(getHashes(html)).toEqual({
            scripts: [],
            styles: [],
        });
    });

    test('should works with empty scripts', () => {
        const html = `
    <script></script>
    <script type="text/javascript"></script>
    <style></style>
    <style type="text/css"></style>
    `;

        expect(getHashes(html)).toEqual({
            scripts: [
                "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
            ],
            styles: [
                "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='"
            ],
        });
    });
})
