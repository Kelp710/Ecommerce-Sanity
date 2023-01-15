import { useState }from "react";
import {useStateContext} from '../context/StateContext'
import { Container } from "@mui/material";
import Modal from "react-modal";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import {TiDeleteOutline} from 'react-icons/ti'

function Model() {
  const {model, setModel, setYourModel, checkedPic, setCheckedPic} = useStateContext();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const modelData= async(gender)=>{
    const model_data = await fetch(`/api/models?gender=${gender}`)
    console.log(model_data)
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
      <button
          type="button"
          className="model-button modal_button"
          onClick={() => {
          setEditModalIsOpen(true);
        }}>
          Set a Model
      </button>
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
        <div className="model-modal">
        <div>
        <h2 className="chose-title">Choose Sex</h2>
        <div className="gender-buttons">
        <a type="button" className="btn btn-malformation male-button" onClick={()=>showmodel('male')}>
          Male
        </a>
        <a type="button" className="btn btn-malformation female-button" onClick={()=>showmodel('female')}>
          Female
        </a>
        </div>
       <div>
        {model ?
        <div>
          <div>
          <h2 className="chose-title">Choose a Model</h2>
          </div>
          <Splide
        aria-label="私のお気に入りの画像集"
        options={{
          autoplay: true, 
          interval: 3000,
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
        </Splide>
          </div>  
      :null}
      
       </div>
       </div>
       </div>
      </Modal>
    </Container>
  );
}

export default Model;