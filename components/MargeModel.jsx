import { useState, Component, useEffect }from "react";
import {useStateContext} from '../context/StateContext'
import { Button, Container } from "@mui/material";
import Modal from "react-modal";
import '@splidejs/splide/css'; 
import {TiDeleteOutline} from 'react-icons/ti'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "50%",
  },
};

function Model(product) {
  const {yourModel, mergedPic, setMergedPic} = useStateContext();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const slug = product.product.slug.current
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

  const merge=async()=>{
    if(!yourModel){
      toast("Set your model!")
      return
    }
    const garments_data_pre = await fetch('https://api.revery.ai/console/v1/get_filtered_garments', {
        method: 'GET',
            headers: getAuthenticationHeader(),
        }
    )
    const garments_data = await garments_data_pre.json()

    for (const i=0; i < await garments_data.garments.length; i++){
        
        if (garments_data.garments[i].id === slug){
          const current_garment=garments_data.garments[i]
          var setname = current_garment.tryon.category, 
        elements = {};
        elements[setname] = current_garment.id;
        if(setname==='tops'){
          elements['bottoms'] = 'a0937e3c254399669ed27056fbef51c5_k31LCfyN7TpM'
        }else if (setname==='bottoms'){
          elements['tops'] = 'a0937e3c254399669ed27056fbef51c5_ulSkCyfLnYa6'
        }else if(setname==='outerwear'){
          elements['bottoms'] = 'a0937e3c254399669ed27056fbef51c5_k31LCfyN7TpM',
          elements['tops'] = 'a0937e3c254399669ed27056fbef51c5_ulSkCyfLnYa6'
        }
        }
    }

    const data = JSON.stringify({
        
        "garments": {
          ...elements
        },
        "model_id": yourModel,
    });

    const merged_data = await fetch('https://api.revery.ai/console/v1/request_tryon', {
            method: 'POST',
            headers: getAuthenticationHeader(true),
            body: data
          }
    )
    const merged_pic = await merged_data.json()
    console.log(data)
    setMergedPic(await merged_pic.model_metadata.model_file)
    setEditModalIsOpen(true)
  }



  return (
    <Container maxWidth="sm">
      <button 
      type='button' 
      className='tryon-button'
        onClick={() => {
          merge();
        }}>Try On</button>
      <ToastContainer />
      <Modal isOpen={editModalIsOpen} style={customStyles} ariaHideApp={false}>
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
      <img className="merged_pic" src={`https://media.revery.ai/generated_model_image/${mergedPic}.png`}/>
      </div>
      </Modal>
    </Container>
  );
}

export default Model;

