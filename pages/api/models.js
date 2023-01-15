const models = async (req, res) => {
    const getAuthenticationHeader=(json=false)=> {

        var pbkdf2 = require('pbkdf2')
        let time =  parseInt(Date.now()/1000);
        var derivedKey = pbkdf2.pbkdf2Sync('fc44e234e9ea892b0dad04f9e77bb36c', time.toString(), 128, 32, 'sha256');
        derivedKey = derivedKey.toString('hex');
    
        if (json) {
            return  new Headers({
                "public_key": 'a0937e3c254399669ed27056fbef51c5',
                "one_time_code": derivedKey,
                "timestamp": time,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            })
        } else {
            return  new Headers({
                "public_key": 'a0937e3c254399669ed27056fbef51c5',
                "one_time_code": derivedKey,
                "timestamp": time,
            })
        }
    
    }
    const gender = req.query.gender
    const response = await fetch(`https://api.revery.ai/console/v1/get_model_list?gender=${gender}`, {
		method: 'GET',
        headers: getAuthenticationHeader(),
		}
)
    const data = await response.json();
    res.status(200).json(data);
  };
  
  export default models;