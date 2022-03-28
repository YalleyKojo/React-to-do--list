const apirequest = async (api_url= '', OPTIONS = null, error= null) => {

    try {
        const response = await fetch(api_url, OPTIONS)
        if (!response.ok) throw Error("Please reload your app")
        
    }
    catch(err) {
        error = err.message;
    }
    finally {
        return error;
    }
    
}


export default apirequest;