const crypto = require('crypto');

const getHashes = (html: string, tagName: string) => {
    const hashes = new Set();
    const matches = html.split(`<${tagName}`);
    
    if (matches.length > 1) {
        matches.shift();
        
        for (const match of matches) {
            const [attrs, ...rest] = match.split('>');
       
            const content = rest.join('>').split(`</${tagName}>`)[0];
            if (content.length === 0 && tagName === 'script' && attrs.includes('src=')) {
                continue;
            }

            const hash = crypto.createHash('sha256');
            hash.update(content);
            hashes.add(`'sha256-${hash.digest('base64')}'`);
        }
    }

    return Array.from(hashes);
}

module.exports = (html: string) => {
    return {
        scripts: getHashes(html, 'script'),
        styles: getHashes(html, 'style'),
    };
};
