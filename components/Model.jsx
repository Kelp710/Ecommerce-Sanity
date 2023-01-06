import { useState, Component }from "react";
import {useStateContext} from '../context/StateContext'
import { Button, Container } from "@mui/material";
import Modal from "react-modal";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

function Model() {
  const {sex, setSex,model, setModel} = useStateContext();
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
  
    console.log(model)
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setEditModalIsOpen(true);
        }}
      >
        モーダル開く
      </Button>
      <Modal isOpen={editModalIsOpen} style={customStyles} ariaHideApp={false}>
        <h2>Choose Sex</h2>
        <div>
        <button type="button" className="" onClick={()=>setSex('Male')}>
          Male
        </button>
        <button type="button" className="" onClick={()=>setSex('Female')}>
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
          <h2>haha</h2>
          <Splide
        aria-label="私のお気に入りの画像集"
        options={{
          autoplay: true, // 自動再生を有効
          interval: 3000, // 自動再生の間隔を3秒に設定
        }}
      >
        <SplideSlide>
          <img src= 'https://media.revery.ai/generated_model_image/1697455153;symbol_186303-symbol_180023;1645298183894173.png'/>
            </SplideSlide>

            <SplideSlide>
            <img src= 'https://media.revery.ai/generated_model_image/1697455153;symbol_186303-symbol_180023;1645298183894173.png'/>
            </SplideSlide>
            <SplideSlide>
            <img src= 'https://media.revery.ai/generated_model_image/1697455153;symbol_186303-symbol_180023;1645298183894173.png'/>
            </SplideSlide>
            <SplideSlide>
              ogege
            </SplideSlide>
            </Splide>
          </div>  
      :null}
      
       </div>
      </Modal>
    </Container>
  );
}

export default Model;