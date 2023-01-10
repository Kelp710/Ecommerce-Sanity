import { useState, Component }from "react";
import {useStateContext} from '../context/StateContext'
import { Button, Container } from "@mui/material";
import Modal from "react-modal";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import {TiDeleteOutline} from 'react-icons/ti'

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    minWidth: "20%",
  },
};

function Model() {
  const {sex, setSex,model, setModel, yourModel, setYourModel, checkedPic, setCheckedPic} = useStateContext();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

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

  const modelData= async(gender)=>{
    const model_data = await fetch(`https://api.revery.ai/console/v1/get_model_list?gender=${gender}`, {
		    method: 'GET',
        headers: getAuthenticationHeader(),
		}
)
    return model_data
}

  const showmodel=async(gender)=>{
    const models = await (await modelData(gender)).json()
    setModel(models)
  }

  const choseModel = (i)=>{
    setYourModel(model.models[i])
    setCheckedPic(i)
  }


  return (
    <Container maxWidth="sm">
      <Button
        className="modal_button"
        variant="contained"
        color="primary"
        onClick={() => {
          setEditModalIsOpen(true);
        }}
      >
        モーダル開く
      </Button>
      <Modal isOpen={editModalIsOpen} ariaHideApp={false} portalClassName="modal-frame">
      <button
                type='button'
                className='remove-item'
                onClick={() => {
                  setEditModalIsOpen(false);
                }}
                >
                  <TiDeleteOutline/>
                </button>
        <div>
        <h2>Choose Sex</h2>
        <div>
        <button type="button" className="" onClick={()=>setSex('male')}>
          Male
        </button>
        <button type="button" className="" onClick={()=>setSex('female')}>
          Female
        </button>
        <button type="button" className="" onClick={()=>showmodel(sex)}>Submit</button>
        </div>
       <div>
        {sex ?
        <div>
          <h2>Choose a model</h2>

          </div>
          :null}
       </div>
       <div>
        {model ?
        <div>
          <Splide
        aria-label="私のお気に入りの画像集"
        options={{
          autoplay: true, // 自動再生を有効
          interval: 3000, // 自動再生の間隔を3秒に設定
        }}
      >
        
        {model.model_files.map((model_file,i)=>
        <SplideSlide>
          <img 
          style={{border: checkedPic === i ? '3px ridge #B2F3E7' : 'white'}}  
          className="model_pic" src={`https://media.revery.ai/generated_model_image/${model_file}.png`} 
          onClick={()=>choseModel(i)} 
          key={i}/>
        </SplideSlide>
        )}
        {console.log(sex)}
        </Splide>
          </div>  
      :null}
      
       </div>
       </div>
      </Modal>
    </Container>
  );
}

export default Model;