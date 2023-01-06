import {useStateContext} from '../context/StateContext'


const getAuthenticationHeader=(json=false)=> {
    const {sex, setModel, model} = useStateContext();
    var pbkdf2 = require('pbkdf2')
    let time =  parseInt(Date.now()/1000);
    var derivedKey = pbkdf2.pbkdf2Sync(process.env.SECRET_KEY_REVERY, time.toString(), 128, 32, 'sha256');

    derivedKey = derivedKey.toString('hex');
    if (json) {
        return  new Headers({
            "public_key": process.env.PUBLICK_KEY_REVERY,
            "one_time_code": derivedKey,
            "timestamp": time,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })
    } else {
        return  new Headers({
            "public_key": process.env.PUBLICK_KEY_REVERY,
            "one_time_code": derivedKey,
            "timestamp": time,
        })
    }
}

export const modelData= async()=>{
    const model_data = await fetch('https://api.revery.ai/console/v1/get_model_list?gender=female', {
		    method: 'GET',
        headers: this.getAuthenticationHeader(),
		}
)
    return model_data
}

    