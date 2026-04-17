const pool = require('../config/config')
const { generate } = require('../utils/util')

const getUrl = async ( req,res )=>
{
    try
    {
        const query = "select original_url,short_url,accessCount from shorten_url";

        const [ result ] = await pool.execute(query)

        return res.status(200).json({
            ok:true,
            data:result
        })
    }
    catch(err)
    {
        return res.status(500).json({
            ok:false,
            message:err.message
        })
    }
}

const getOriginalUrl = async (req,res)=>
{
    try
    {
        const { url } = req.query;

        if( !url )
        {
            return res.status(400).json({
                ok:false,
                message:"short url is required!"
            })
        }


        const query = "select short_url,original_url,accessCount from shorten_url where short_url=?";

        const [ result ] = await pool.execute( query , [ url ] );

        const count = result[0].accessCount + 1;

        const [ upodate ] = await pool.execute( "update shorten_url set accessCount=? where short_url=?" , [ count , url ] )

        if( result.length === 0 )
        {
            return res.status(404).json({
                ok:true,
                message:"Not found!"
            })
        }

        return res.status(200).json({
            ok:true,
            data:result
        })
    }
    catch(err)
    {
        return res.status(500).json({
            ok:false,
            message:err.message
        })
    }
}

const postUrl = async (req,res)=>
{
    try
    {
        const { url } = req.body;

        if( !url )
        {
            return res.status(400).json({
                ok:false,
                message:"Url is rquired!"
            })
        }

        const [ isFound ] = await pool.execute( "select original_url from shorten_url where original_url=?" , [ url.trim() ] );

        if( isFound.length > 0 )
        {
            return res.status(400).json({
                ok:false,
                message:"Url is already found!"
            })
        }

        const shortUrl = generate(5);
        
        const query = "insert into shorten_url(original_url,short_url) values (?,?)";

        const [ result ] = await pool.execute( query , [url.trim(),shortUrl.trim()]);

        if( result.affectedRows === 0 )
        {
            return res.status(400).json({
                ok:false,
                message:"Not inserted the url!"
            })
        }

        return res.status(201).json({
            ok:true,
            message:"url is created!"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            ok:false,
            message:err.message
        })
    }
}

const update = async (req,res)=>
{
    try 
    {
        const { url , original } = req.body;
        
        if( !url || !original )
        {
            return res.status(400).json({
                ok:false,
                message:"url's are required!"
            })
        }
        
        const query = "update shorten_url set original_url=? , updatedAt=? where short_url=?";

        const date = new Date();

        const [ result ] = await pool.execute( query , [ original.trim() , date , url.trim() ] );

        if( result.changedRows === 0 )
        {
            return res.status(400).json({
                ok:false,
                message:"Not updated!"
            })
        }

        return res.status(200).json({
            ok:true,
            message:"Data is updated"
        })
    } 
    catch (error) {
        
    }
}

const remove = async (req,res)=>
{
    try
    {
        const { url } = req.body;
        
        if( !url )
        {
            return res.status(400).json({
                ok:false,
                message:"url is required!"
            })
        }

        const query = "delete from shorten_url where short_url=?";

        const [ result ] = await pool.execute( query , [ url.trim() ] );

        if( result.affectedRows === 0 )
        {
            return res.status(400).json({
                ok:false,
                message:"Not found!"
            })
        }

        return res.status(204).json({
            ok:false,
            message:"Deleted the reocrd"
        })
        
    }
    catch(err)
    {
        return res.status(500).json({
            ok:false,
            message:err.message
        })
    }
}


async function getStats( req,res)
{
    try
    {
        const { url } = req.query;

        if( !url )
        {
            return res.status(400).json({
                ok:false,
                message:"url is required!"
            })
        }

        const query = "select id,original_url,short_url,accessCount,updatedAt from shorten_url where short_url=?";
        
        const [ result ] = await pool.execute( query ,[ url ] );

        if( result.length === 0 )
        {
            return res.status(404).json({
                ok:false,
                message:"url not found!"
            })
        }

        return res.status(200).json({
            ok:true,
            data:result
        })
    }
    catch(err)
    {
        return res.status(500).json({
            ok:false,
            message:err.message
        })
    }
}

module.exports = {
    getUrl,
    postUrl,
    getOriginalUrl,
    update,
    remove,
    getStats
}