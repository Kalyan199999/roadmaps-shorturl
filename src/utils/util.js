function generate(size)
{
    const alphnum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let url = "";
    
    const len = alphnum.length;

    for(let i=0;i<size;i++)
    {
        const idx = Math.floor( Math.random()*len );

        url = url.concat( alphnum.charAt(idx) );
    }

    return 'bitly.'+ url;
}

module.exports = {
    generate
}