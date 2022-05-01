import React, {useContext} from 'react'
import appContext from "../../api/context";
import './index.css';
import {getAllPetsOnSelling, getAllRequests,randomGeneratePet} from "../../api/backendApi_local";
const TestAPI = ()=>{
    const context = useContext(appContext);
    return(
        <div>
            <button onClick={
                async ()=>{
                    let pets = await randomGeneratePet(context.state.backendActor)
                    console.log(pets)
                }
            } style={{"height":100,"width":100}} className="testApi-btn">
                点我测试
            </button>
        </div>
    )
}
export default TestAPI;